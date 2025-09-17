from flask_sqlalchemy import SQLAlchemy
from db import db

class Rol(db.Model):
    __tablename__ = "roles"

    id_rol = db.Column(db.Integer, primary_key=True)
    nombre_rol = db.Column(db.String(30))

    usuarios = db.relationship("Usuario", back_populates="rol")

    def to_dict(self):
        return {
            "id_rol": self.id_rol,
            "nombre_rol": self.nombre_rol
        }
    

    