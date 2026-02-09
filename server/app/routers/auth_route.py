from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.auth_model import User
from app.schemas import (
    LoginRequest, LoginResponse, RegistrationResponse, RegistrationRequest,
    AuthenticateRequest, OtpResponse, EmailLoginRequest, ForgotPasswordRequest,
    ForgotPasswordResponse, ResetPasswordRequest, ResetPasswordResponse,
    RefreshTokenRequest, TokenResponse
)
from app.services.auth_service import AuthenticateService
from app.dependencies.user_auth import get_current_user, UserAuth
from typing import Union

router = APIRouter(
    prefix="/auth",
    tags=["User Authentication"],
    dependencies=[],
    responses={404: {"message": "Not found"}},
)

@router.post("/authenticate")
def authenticate_user(auth: AuthenticateRequest, db: Session = Depends(get_db)):
   
    if auth.otp:
        auth_service = AuthenticateService(db)
        result = auth_service.verify_otp(auth.mobile, auth.otp)
        
        if not result:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired OTP."
            )
        
        access_token, refresh_token, is_verified = result
        
        # Get user info for response
        user = db.query(User).filter(User.mobile == auth.mobile).first()
        
        return LoginResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            token_type="bearer",
            first_time=not is_verified,
            user_id=user.id,
            email=user.email,
            mobile=user.mobile
        )
    
    # Step 1: Generate and send OTP
    auth_service = AuthenticateService(db)
    otp = auth_service.authenticate(auth.mobile)
    if not otp:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate OTP."
        )
    print(f"Generated OTP for {auth.mobile}: {otp}")  # For testing, log the OTP. In production, send via SMS.
    return OtpResponse(otp_status="otp_sent", message=f"OTP sent to {auth.mobile}")







@router.post("/login", response_model=LoginResponse)
def login(login_request: EmailLoginRequest, db: Session = Depends(get_db)):
    try:
        auth_service = AuthenticateService(db)
        result = auth_service.login_with_email(login_request.email, login_request.password)
        
        if not result:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password."
            )
        
        access_token, refresh_token = result
        
        # Get user info for response
        user = db.query(User).filter(User.email == login_request.email).first()
        
        return LoginResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            token_type="bearer",
            user_id=user.id,
            email=user.email,
            mobile=user.mobile
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred during login."
        )


@router.post("/forgot-password", response_model=ForgotPasswordResponse)
def forgot_password(request: ForgotPasswordRequest, db: Session = Depends(get_db)):
    """
    Request password reset. Sends reset token to email.
    
    Security improvements:
    - Reset token is cryptographically secure (generated with secrets module)
    - Reset token expires in 1 hour
    - In production, send via email (not in response)
    """
    try:
        auth_service = AuthenticateService(db)
        reset_token = auth_service.forgot_password(request.email)
        
        if not reset_token:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Email not found."
            )
        
        # In production, send email with reset link containing reset_token
        return ForgotPasswordResponse(
            message="Password reset link sent to email",
            detail="Check your email for password reset instructions"  # In production, don't return token in response
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred during password reset request."
        )


@router.post("/reset-password", response_model=ResetPasswordResponse)
def reset_password(request: ResetPasswordRequest, db: Session = Depends(get_db)):
    """
    Reset password using reset token.
    
    Security improvements:
    - Validates reset token and expiration
    - Password is hashed with bcrypt before storage
    - Reset token is marked as used (one-time use)
    """
    try:
        auth_service = AuthenticateService(db)
        # Hash password before storing
        hashed_password = auth_service.hash_password(request.new_password)
        success = auth_service.reset_password(request.reset_token, hashed_password)
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid or expired reset token."
            )
        
        return ResetPasswordResponse(
            message="Password reset successful",
            detail="Your password has been updated successfully. Please login with your new password."
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred during password reset."
        )


@router.post("/refresh-token", response_model=TokenResponse)
def refresh_access_token(request: RefreshTokenRequest, db: Session = Depends(get_db)):
    """
    Generate new access token using refresh token.
    
    Security improvements:
    - Validates refresh token signature and expiration
    - Issues new short-lived access token
    - Refresh token remains valid for multiple use cases
    """
    try:
        auth_service = AuthenticateService(db)
        new_access_token = auth_service.refresh_access_token(request.refresh_token)
        
        if not new_access_token:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired refresh token."
            )
        
        return TokenResponse(
            access_token=new_access_token,
            token_type="bearer",
            expires_in=1800  # 30 minutes in seconds
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred during token refresh."
        )


@router.post("/verify-token")
def verify_token(current_user: UserAuth = Depends(get_current_user)):
    """
    Verify that the provided JWT token is valid.
    
    Returns user information if token is valid.
    Pass the JWT token in Authorization header: "Bearer <token>"
    """
    return {
        "valid": True,
        "user_id": current_user.user_id,
        "email": current_user.email,
        "mobile": current_user.mobile
    }



# @router.post("/register/", response_model=RegistrationResponse)
# def register(registration_request: RegistrationRequest, db: Session = Depends(get_db)):
#     user=db.query(Users).filter_by(
#             username=registration_request.username,
#             mobile=registration_request.mobile
#         ).first()
#     if user:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Username or password already exists."
#         )
#     try:
#         user=Users(
#             mobile=registration_request.mobile,
#             username=registration_request.username,
#             password=registration_request.password
#         )
#         db.add(user)
#         db.commit()
#         db.refresh(user)
#     except Exception as e:
#         db.rollback()
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail="An error occurred during registration."
#         )

#     return RegistrationResponse(
#         mobile=user.mobile,
#         username=user.username,
#         created_at=user.created_at.isoformat()
#     )
