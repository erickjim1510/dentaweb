from flask_sqlalchemy import SQLAlchemy
from db import db

class Sexo(db.Model):
    __tablename__ = "sexos"

    id_sexo = db.Column(db.Integer, primary_key=True)
    nombre_sexo = db.Column(db.String(30))

    pacientes = db.relationship("Paciente", backref="sexo", lazy=True)

    def to_dict(self):
        return {
            "id_sexo": self.id_sexo,
            "nombre_sexo": self.nombre_sexo
        }