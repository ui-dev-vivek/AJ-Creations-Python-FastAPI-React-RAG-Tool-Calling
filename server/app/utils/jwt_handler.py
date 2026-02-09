"""JWT Token handling utilities for secure authentication."""

import jwt
from datetime import datetime, timedelta, timezone
from typing import Optional, Dict, Any
from app.core.config import settings


class JWTHandler:
    """Handle JWT token creation, verification, and refresh logic."""
    
    @staticmethod
    def create_access_token(data: Dict[str, Any], expires_delta: Optional[timedelta] = None) -> str:
        """
        Create JWT access token with expiration.
        
        Args:
            data: Dictionary containing claims to encode (user_id, mobile, email, etc.)
            expires_delta: Custom expiration time. Defaults to settings.access_token_expire_min
            
        Returns:
            Encoded JWT token as string
        """
        to_encode = data.copy()
        
        if expires_delta:
            expire = datetime.now(timezone.utc) + expires_delta
        else:
            expire = datetime.now(timezone.utc) + timedelta(
                minutes=settings.access_token_expire_min
            )
        
        to_encode.update({"exp": expire, "iat": datetime.now(timezone.utc)})
        
        encoded_jwt = jwt.encode(
            to_encode,
            settings.secret_key,
            algorithm=settings.algorithm
        )
        return encoded_jwt
    
    @staticmethod
    def create_refresh_token(data: Dict[str, Any]) -> str:
        """
        Create JWT refresh token with longer expiration (7 days).
        
        Args:
            data: Dictionary containing claims to encode
            
        Returns:
            Encoded refresh JWT token as string
        """
        to_encode = data.copy()
        expire = datetime.now(timezone.utc) + timedelta(days=7)
        
        to_encode.update({
            "exp": expire,
            "iat": datetime.now(timezone.utc),
            "type": "refresh"
        })
        
        encoded_jwt = jwt.encode(
            to_encode,
            settings.secret_key,
            algorithm=settings.algorithm
        )
        return encoded_jwt
    
    @staticmethod
    def verify_token(token: str) -> Optional[Dict[str, Any]]:
        """
        Verify JWT token and return payload if valid.
        
        Args:
            token: JWT token string to verify
            
        Returns:
            Decoded token payload if valid, None otherwise
        """
        try:
            payload = jwt.decode(
                token,
                settings.secret_key,
                algorithms=[settings.algorithm]
            )
            return payload
        except jwt.ExpiredSignatureError:
            return None  # Token expired
        except jwt.InvalidTokenError:
            return None  # Invalid token
    
    @staticmethod
    def decode_token_unsafe(token: str) -> Optional[Dict[str, Any]]:
        """
        Decode token without verification (for debugging only).
        Use verify_token() in production.
        
        Args:
            token: JWT token string
            
        Returns:
            Decoded payload if valid format, None otherwise
        """
        try:
            payload = jwt.decode(
                token,
                settings.secret_key,
                algorithms=[settings.algorithm],
                options={"verify_signature": False}
            )
            return payload
        except jwt.DecodeError:
            return None
    
    @staticmethod
    def get_user_id_from_token(token: str) -> Optional[int]:
        """
        Extract user_id from token payload.
        
        Args:
            token: JWT token string
            
        Returns:
            User ID if token is valid, None otherwise
        """
        payload = JWTHandler.verify_token(token)
        if payload:
            return payload.get("user_id")
        return None
