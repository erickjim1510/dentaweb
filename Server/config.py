import os
from dotenv import load_dotenv

load_dotenv()  # Carga las variables del archivo .env

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SECRET_KEY = os.getenv("SECRET_KEY")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
