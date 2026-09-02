from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    db_name: str = "ATS_DB"
    db_port: int = 5432
    port: int = 8000
    host: str = "[IP_ADDRESS]"
    username: str = "Ats"
    password: str = "ATS_DB_PASSWORD"
    jwt_secret :str  = "kgvau kaefbhilvreila}{hbvliyehy487y5976375407y96tgfy#@$%#&%*^)()bfkvhjsb"
    MINIO_ENDPOINT:str="http://127.0.0.1:9000"
    MINIO_ACCESS_KEY:str="Ats"
    MINIO_SECRET_KEY:str="ATS_DB_PASSWORD"
    MINIO_RAW_BUCKET:str="ats_resume"

settings = Settings()