from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    db_name: str = "ATS_DB"
    db_port: int = 5433
    port: int = 8000
    host: str = "127.0.0.1"
    db_user: str = "Ats"
    password: str = "ATS_DB_PASSWORD"
    jwt_secret :str  = "kgvau kaefbhilvreila}{hbvliyehy487y5976375407y96tgfy#@$%#&%*^)()bfkvhjsb"
    MINIO_ENDPOINT:str="http://127.0.0.1:9000"
    MINIO_ACCESS_KEY:str="Ats"
    MINIO_SECRET_KEY:str="ATS_DB_PASSWORD"
    MINIO_RAW_BUCKET:str="ats_resume"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()