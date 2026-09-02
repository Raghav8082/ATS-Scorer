# app/auth.py
from uuid import UUID
from typing import Optional
import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from config.confi import settings

ALGORITHM = "HS256"
security_schema = HTTPBearer()


class TokenData(BaseModel):
    id: Optional[UUID] = None
    email: Optional[str] = None


def verify_token(token: str) -> TokenData:
    try:
        payload = jwt.decode(token, settings.jwt_secret, algorithms=[ALGORITHM])
        id_ = payload.get("sub")
        email = payload.get("email")
        if email is None or id_ is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token credentials invalid",
            )
        return TokenData(id=id_, email=email)
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized access",
        )


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security_schema),
) -> TokenData:
    """This is the dependency you plug into any route."""
    return verify_token(credentials.credentials)
