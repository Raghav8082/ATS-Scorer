from datetime import datetime
from uuid import UUID, uuid4
from pydantic import BaseModel, EmailStr, Field, ConfigDict


class userProfile(BaseModel):
    user_id: UUID
    full_name: str
    resume_path: str 
    created_at: datetime
    updated_at: datetime | None = None


class UserProfileUpdate(BaseModel):
    full_name: str | None = None
    resume_path: str | None = None
    created_at: datetime | None = None
    updated_at: datetime | None = None    