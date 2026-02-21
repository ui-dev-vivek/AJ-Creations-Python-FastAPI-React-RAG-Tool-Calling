"""User authentication and authorization dependencies."""

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.utils.jwt_handler import JWTHandler
from typing import Optional, Dict, Any

# HTTP Bearer token scheme
security = HTTPBearer()


class UserAuth:
    """User authentication context."""
    
    def __init__(self, user_id: int, email: str, mobile: str):
        self.user_id = user_id
        self.email = email
        self.mobile = mobile


async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> Dict[str, Any]:
    """
    Verify JWT token from Authorization header.
    
    Args:
        credentials: HTTP Bearer token credentials
        
    Returns:
        Token payload if valid
        
    Raises:
        HTTPException: If token is invalid or expired
    """
    token = credentials.credentials
    
    payload = JWTHandler.verify_token(token)
    
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return payload


async def get_current_user(
    payload: Dict[str, Any] = Depends(verify_token)
) -> UserAuth:
    """
    Get current authenticated user from token payload.
    
    Args:
        payload: Verified JWT token payload
        
    Returns:
        UserAuth object with user details
        
    Raises:
        HTTPException: If required user information is missing from token
    """
    user_id = payload.get("user_id")
    email = payload.get("email")
    mobile = payload.get("mobile")
    
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token: missing user_id",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return UserAuth(user_id=user_id, email=email, mobile=mobile)
