# from email.policy import default
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List

class RegistrationRequest(BaseModel):
    mobile: str = Field(..., min_length=10, max_length=15)
    password: str = Field(..., min_length=8, max_length=255)


class RegistrationResponse(BaseModel):
    mobile: str
    username: str
    created_at : Optional[str] = None
    class Config:
        from_attributes = True


class LoginRequest(BaseModel):
    username: str = Field(..., min_length=3, max_length=255)
    password: str = Field(..., min_length=8, max_length=255)

class AuthenticateRequest(BaseModel):
    mobile: str = Field(..., max_length=15, min_length=10)
    otp: Optional[str] = Field(default=None, max_length=6, min_length=6)

class OtpResponse(BaseModel):
    otp_status: str ='otp_sent'
    message: Optional[str] = "OTP sent to registered mobile"

class LoginResponse(BaseModel):
    access_token: str = Field(..., description="JWT access token (expires in 30 minutes)")
    refresh_token: Optional[str] = Field(None, description="JWT refresh token (expires in 7 days)")
    first_time: Optional[bool] = False
    token_type: str = "bearer"
    user_id: Optional[int] = None
    email: Optional[str] = None
    mobile: Optional[str] = None
    
    class Config:
        from_attributes = True

class EmailLoginRequest(BaseModel):
    email: str = Field(..., min_length=5, max_length=255)
    password: str = Field(..., min_length=8, max_length=255) 

class ForgotPasswordRequest(BaseModel):
    email: str = Field(..., min_length=5, max_length=255)

class ForgotPasswordResponse(BaseModel):
    message: str
    detail: str

class ResetPasswordRequest(BaseModel):
    reset_token: str = Field(...)
    new_password: str = Field(..., min_length=8, max_length=255)

class ResetPasswordResponse(BaseModel):
    message: str
    detail: str

class RefreshTokenRequest(BaseModel):
    refresh_token: str = Field(..., description="JWT refresh token")

class TokenResponse(BaseModel):
    access_token: str = Field(..., description="New JWT access token")
    token_type: str = "bearer"
    expires_in: int = Field(default=1800, description="Token expiration time in seconds (30 minutes)")
