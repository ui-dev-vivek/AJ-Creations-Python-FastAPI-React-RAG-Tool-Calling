from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.auth_model import User
from app.schemas import (
    LoginRequest, LoginResponse, RegistrationResponse, RegistrationRequest,
    AuthenticateRequest, OtpResponse, EmailLoginRequest, ForgotPasswordRequest,
    ForgotPasswordResponse, ResetPasswordRequest, ResetPasswordResponse
)
from app.services.auth_service import AuthenticateService
router = APIRouter(
    prefix="/auth",
    tags=["User Authentication"],
    dependencies=[],
    responses={404: {"message": "Not found"}},
)

@router.post("/authenticate")
def authenticate_user(auth:AuthenticateRequest,db:Session=Depends(get_db)):
    """Generate OTP for mobile. Register if user doesn't exist."""
    # If otp_code is provided, verify it instead
    if auth.otp_code:
        auth_service=AuthenticateService(db)
        access_token = auth_service.verify_otp(auth.mobile, auth.otp_code)
        
        if not access_token:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired OTP."
            )
        
        return LoginResponse(access_token=access_token, token_type="bearer")
    
    # Otherwise, generate OTP
    auth_service=AuthenticateService(db)
    otp=auth_service.authenticate(auth.mobile)
    if not otp:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate OTP."
        )
    return OtpResponse(otp=otp)





@router.post("/login/", response_model=LoginResponse)
def login(login_request: EmailLoginRequest, db: Session = Depends(get_db)):
    """Login with email and password."""
    try:
        auth_service = AuthenticateService(db)
        access_token = auth_service.login_with_email(login_request.email, login_request.password)
        
        if not access_token:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password."
            )
        
        return LoginResponse(access_token=access_token, token_type="bearer")
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred during login."
        )


@router.post("/forgot-password", response_model=ForgotPasswordResponse)
def forgot_password(request: ForgotPasswordRequest, db: Session = Depends(get_db)):
    """Request password reset. Sends reset token to email."""
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
            message="Password reset link sent",
            detail=f"Reset token: {reset_token}"  # In production, don't return token in response
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
    """Reset password using reset token."""
    try:
        auth_service = AuthenticateService(db)
        success = auth_service.reset_password(request.reset_token, request.new_password)
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid or expired reset token."
            )
        
        return ResetPasswordResponse(
            message="Password reset successful",
            detail="Your password has been updated successfully."
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred during password reset."
        )


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
