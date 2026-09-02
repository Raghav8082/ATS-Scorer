from datetime import datetime
from uuid import UUID, uuid4
from pydantic import BaseModel, EmailStr, Field, ConfigDict


class userProfile(BaseModel):
    id: UUID
    user_id: UUID
    full_name: str
    resume_path: str 
    created_at: datetime
    updated_at: datetime


class UserProfileUpdate(BaseModel):
    full_name: str
    resume_path: str 
    created_at: datetime
    updated_at: datetime    