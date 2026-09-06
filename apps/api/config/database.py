import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from .confi import settings

# Support direct DATABASE_URL (e.g. Neon PostgreSQL, Render Postgres)
raw_db_url = settings.DATABASE_URL or os.getenv("DATABASE_URL")
if raw_db_url:
    url = raw_db_url
    if url.startswith("postgresql://"):
        url = url.replace("postgresql://", "postgresql+asyncpg://", 1)
    if "sslmode=require" in url:
        url = url.replace("sslmode=require", "ssl=require")
    if "&channel_binding=require" in url:
        url = url.replace("&channel_binding=require", "")
    elif "?channel_binding=require" in url:
        url = url.replace("?channel_binding=require", "")
    Database_Url = url
else:
    Database_Url = f"postgresql+asyncpg://{settings.db_user}:{settings.password}@{settings.host}:{settings.db_port}/{settings.db_name}"



engine = create_async_engine(Database_Url, echo=True)

AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

Base = declarative_base()

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session

        

