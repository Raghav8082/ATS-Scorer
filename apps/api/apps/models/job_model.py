from sqlalchemy import Column, String, Float, DateTime, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from uuid import uuid4
from config.database import Base

class Job(Base):
    __tablename__ = "jobs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    title = Column(String, nullable=False)
    company = Column(String, nullable=False)
    location = Column(String, nullable=True)
    salary_min = Column(Float, nullable=True)
    salary_max = Column(Float, nullable=True)
    description = Column(Text, nullable=False)
    url = Column(String, unique=True, nullable=True)
    platform = Column(String, nullable=True)   # "linkedin" / "indeed" / "glassdoor"
    embedding_id = Column(String, nullable=True)  # Pinecone vector ID, once embedded
    scraped_at = Column(DateTime(timezone=True), server_default=func.now())

    applications = relationship("Application", back_populates="job")