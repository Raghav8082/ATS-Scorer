from argparse import OPTIONAL
from datetime import datetime
from uuid import UUID, uuid4
from pydantic import BaseModel, EmailStr, Field, ConfigDict


class UserProfile(BaseModel):
    id: UUID
    user_id: UUID
    full_name: str
    phone_number: str
    country: str
    city: str
    state: str
    zip_code: str
    address: str
    resume_path: str 
    created_at: datetime
    updated_at: datetime