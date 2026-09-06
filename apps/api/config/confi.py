from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    DATABASE_URL: str | None = None
    GEMINI_API_KEY: str | None = None
    PINECONE_API: str | None = None
    jwt_secret: str = "kgvau kaefbhilvreila}{hbvliyehy487y5976375407y96tgfy#@$%#&%*^)()bfkvhjsb"
    algorithm: str = "HS256"
    port: int = 8000
    host: str = "0.0.0.0"
    allowed_origins: str = "http://localhost:3000,http://127.0.0.1:3000"

    db_name: str = "ATS_DB"
    db_port: int = 5433
    db_user: str = "Ats"
    password: str = "ATS_DB_PASSWORD"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()

