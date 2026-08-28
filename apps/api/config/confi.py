from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    db_name: str = "ATS_DB"
    db_port: int = 5432
    port: int = 8000
    host: str = "[IP_ADDRESS]"
    username: str = "Ats"
    password: str = "ATS_DB_PASSWORD"


settings = Settings()