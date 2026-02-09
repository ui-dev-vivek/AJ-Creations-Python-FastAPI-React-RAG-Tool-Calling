import random
import secrets
from sqlalchemy.orm import Session
from app.models.auth_model import User, UserOTP, PasswordReset
import datetime
from typing import Optional
from passlib.context import CryptContext
from app.utils.jwt_handler import JWTHandler

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class AuthenticateService:
  OTP_EXPIRY_TIME=10
  
  def __init__(self,db:Session):
    self.db=db
  
  @staticmethod
  def hash_password(password: str) -> str:
    """Hash password using bcrypt."""
    return pwd_context.hash(password)
  
  @staticmethod
  def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify plain password against hashed password."""
    return pwd_context.verify(plain_password, hashed_password)
  def authenticate(self,mobile:str):
    """Generate OTP for authentication. Register user if not exists."""
    try:
      user = (
              self.db.query(User)
              .filter(User.mobile == mobile, User.is_active == True)
              .first()
          )
      if not user:
        otp = self.register_user(mobile)
        return otp
      else:
        otp = self.generate_otp(user)
        return otp
    except Exception as e:
      return None
      
  def generate_otp(self,user)->int:
    otp= random.randint(100000, 999999)
    user_otp = UserOTP(user_id=user.id, otp_code=otp,expires_at=datetime.datetime.now() + datetime.timedelta(minutes=self.OTP_EXPIRY_TIME))
    self.db.add(user_otp)
    self.db.commit()
    return otp
  
  def register_user(self,mobile:str):
    new_user=User(
      email="email@"+mobile+"com",
      username="user_"+mobile,
      password_hash=self.hash_password("default_password_change_me"),
      mobile=mobile,
      is_active=True,
      is_verified=False 
    )
    self.db.add(new_user)
    self.db.commit()
    self.db.refresh(new_user)
    otp=self.generate_otp(new_user)
    return otp
  def verify_otp(self,mobile:str,otp_code:str)->Optional[tuple]:
    """Verify OTP and generate JWT access and refresh tokens for login."""
    try:
      user = (
              self.db.query(User)
              .filter(User.mobile == mobile, User.is_active == True)
              .first()
          )
      if not user:
        return None
      
      user_otp = (
              self.db.query(UserOTP)
              .filter(
                  UserOTP.user_id == user.id,
                  UserOTP.otp_code == str(otp_code),
                  UserOTP.used_at == None
              )
              .order_by(UserOTP.created_at.desc())
              .first()
          )
      
      if not user_otp:
        return None
      
      if user_otp.expires_at < datetime.datetime.now():
        return None
      
      user.is_verified = True
      user_otp.used_at = datetime.datetime.now()
      self.db.commit()
      
      # Generate JWT tokens
      token_data = {
          "user_id": user.id,
          "mobile": user.mobile,
          "email": user.email
      }
      access_token = JWTHandler.create_access_token(token_data)
      refresh_token = JWTHandler.create_refresh_token(token_data)
      
      return (access_token, refresh_token, user.is_verified)
    except Exception as e:
      return None

  def login_with_email(self, email: str, password: str) -> Optional[tuple]:
    """Login with email and password. Return JWT access and refresh tokens."""
    try:
      user = (
              self.db.query(User)
              .filter(User.email == email, User.is_active == True)
              .first()
          )
      if not user:
        return None
      
      # Verify password using bcrypt
      if not self.verify_password(password, user.password_hash):
        return None
      
      # Generate JWT tokens
      token_data = {
          "user_id": user.id,
          "email": user.email,
          "mobile": user.mobile
      }
      access_token = JWTHandler.create_access_token(token_data)
      refresh_token = JWTHandler.create_refresh_token(token_data)
      
      return (access_token, refresh_token)
    except Exception as e:
      return None

  def forgot_password(self, email: str) -> Optional[str]:
    """Generate password reset token and store it."""
    try:
      user = (
              self.db.query(User)
              .filter(User.email == email, User.is_active == True)
              .first()
          )
      if not user:
        return None
      
      reset_token = secrets.token_urlsafe(32)
      password_reset = PasswordReset(
        user_id=user.id,
        reset_token=reset_token,
        expires_at=datetime.datetime.now() + datetime.timedelta(hours=1)
      )
      self.db.add(password_reset)
      self.db.commit()
      
      return reset_token
    except Exception as e:
      return None

  def reset_password(self, reset_token: str, new_password: str) -> bool:
    """Reset password using reset token."""
    try:
      password_reset = (
              self.db.query(PasswordReset)
              .filter(
                  PasswordReset.reset_token == reset_token,
                  PasswordReset.used_at == None
              )
              .first()
          )
      
      if not password_reset:
        return False
      
      if password_reset.expires_at < datetime.datetime.now():
        return False
      
      user = self.db.query(User).filter(User.id == password_reset.user_id).first()
      if not user:
        return False
      
      user.password_hash = new_password
      password_reset.used_at = datetime.datetime.now()
      self.db.commit()
      
      return True
    except Exception as e:
      return False
  
  def refresh_access_token(self, refresh_token: str) -> Optional[str]:
    """Generate new access token from valid refresh token."""
    try:
      payload = JWTHandler.verify_token(refresh_token)
      
      if not payload or payload.get("type") != "refresh":
        return None
      
      user_id = payload.get("user_id")
      user = self.db.query(User).filter(User.id == user_id, User.is_active == True).first()
      
      if not user:
        return None
      
      # Generate new access token
      token_data = {
          "user_id": user.id,
          "email": user.email,
          "mobile": user.mobile
      }
      new_access_token = JWTHandler.create_access_token(token_data)
      return new_access_token
    except Exception as e:
      return None
    






    
    

    
    
    
    


    
  
        
  
  