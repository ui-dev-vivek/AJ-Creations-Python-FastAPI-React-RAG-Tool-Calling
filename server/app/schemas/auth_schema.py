from email.policy import default
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
    status: str
class LoginResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    first_login: bool
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
