from argparse import OPTIONAL
from datetime import datetime
from uuid import UUID, uuid4
from pydantic import BaseModel, EmailStr, Field, ConfigDict

class ApplicationBase(BaseModel):

    job_title: str = Field(min_length=3, max_length=50)
    company: str = Field(min_length=3, max_length=50)
    status: str = Field(min_length=3, max_length=50)
    application_url: str | None = None
    notes: str | None = None
    cover_letter_path: str | None = None
    resume_path: str | None = None

class ApplicationCreate(ApplicationBase):
    pass

class ApplicationOut(ApplicationBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

class ApplicationInDB(ApplicationBase):
    pass

class ApplicationUpdate(BaseModel):
    job_title: str | None = None (OPTIONAL)
    company: str | None = None (OPTIONAL)
    status: str | None = None   (OPTIONAL)
    application_url: str | None = None (OPTIONAL)
    notes: str | None = None (OPTIONAL)
    cover_letter_path: str | None = None (OPTIONAL)
    resume_path: str | None = None 
    