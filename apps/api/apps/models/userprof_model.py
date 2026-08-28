from sqlalchemy import Column, ForeignKey, Text, String
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from uuid import uuid4
from config.database import Base

class UserProfile(Base):
    __tablename__ = "user_profiles"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), unique=True, nullable=False)
    resume_text = Column(Text, nullable=True)          # extracted from uploaded PDF
    preferences_json = Column(JSONB, nullable=True)     # role, salary, location, seniority, blacklist
    pinecone_namespace = Column(String, nullable=True)  # this user's isolated vector space

    user = relationship("User", back_populates="profile")