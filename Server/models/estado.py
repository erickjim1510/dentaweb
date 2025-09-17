from flask_sqlalchemy import SQLAlchemy
from db import db

class Estado(db.Model):
    __tablename__ = "estados"

    id_estado = db.Column(db.Integer, primary_key=True)
    nombre_estado = db.Column(db.String(30))

    usuarios = db.relationship("Usuario", back_populates="estado")

    def to_dict(self):
        return {
            "id_estado": self.id_estado,
            "nombre_estado": self.nombre_estado
        }




