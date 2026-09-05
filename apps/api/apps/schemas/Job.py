from datetime import datetime
from uuid import UUID, uuid4
from pydantic import BaseModel, EmailStr, Field, ConfigDict


class JobBase(BaseModel):
    url: str | None = None
    job_title: str | None = None
    description: str = Field(min_length=3, max_length=2000)
    company: str | None = None
    status: str | None = None
    platform: str | None = "custom"
    application_url: str | None = None
    notes: str | None = None
    cover_letter_path: str | None = None
    resume_path: str | None = None

class JobOut(JobBase):
    created_at: datetime
    updated_at: datetime | None = None
    model_config = ConfigDict(from_attributes=True)


class JobUpdate(BaseModel):
    job_title: str | None = None
    company: str | None = None
    status: str | None = None
    application_url: str | None = None
    notes: str | None = None
    cover_letter_path: str | None = None
    resume_path: str | None = None