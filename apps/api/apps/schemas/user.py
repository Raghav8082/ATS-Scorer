
from datetime import datetime
from uuid import UUID, uuid4
from pydantic import BaseModel, EmailStr, Field, ConfigDict


class UserBase(BaseModel):
    """Fields shared across all user schemas."""
    username: str = Field(min_length=3, max_length=50)
    email: EmailStr


class UserCreate(UserBase):
    """What the client sends to register a new user."""
    password: str = Field(min_length=8)


class UserUpdate(BaseModel):
    """What the client sends to update a user — all fields optional."""
    username: str | None = Field(default=None, min_length=3, max_length=50)
    email: EmailStr | None = None
    password: str | None = Field(default=None, min_length=8)


class UserOut(UserBase):
    """What the API returns — never includes password."""
    id: UUID
    created_at: datetime
    updated_at: datetime | None = None

    model_config = ConfigDict(from_attributes=True)


class UserLogin(BaseModel):
    """Client payload for logging in — can use username or email."""
    username_or_email: str
    password: str = Field(min_length=8)


class TokenResponse(BaseModel):
    """JWT Token response schema."""
    access_token: str
    token_type: str = "bearer"
    user: UserOut


class UserInDB(UserOut):
    """Internal-only representation, e.g. for auth checks — includes the hash."""
    hashed_password: str