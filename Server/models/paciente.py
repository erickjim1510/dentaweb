from flask_sqlalchemy import SQLAlchemy
from datetime import date
from db import db

class Paciente(db.Model):
    __tablename__ = "pacientes"

    id_paciente = db.Column(db.Integer, primary_key=True)
    id_sexo = db.Column(db.Integer, db.ForeignKey("sexos.id_sexo"), nullable=False)
    primer_nombre = db.Column(db.String(30))
    segundo_nombre = db.Column(db.String(30))
    apellido_paterno = db.Column(db.String(30))
    apellido_materno = db.Column(db.String(30))
    fecha_nacimiento = db.Column(db.Date)
    lugar_nacimiento = db.Column(db.String(50))
    direccion = db.Column(db.String(50))
    ocupacion = db.Column(db.String(30))
    telefono = db.Column(db.String(15))
    email = db.Column(db.String(30))
    fecha_registro = db.Column(db.Date, default=date.today)

    #Ver si hay que castear las fechas
    def to_dict(self):
        return {
            "id_paciente": self.id_paciente,
            "id_sexo": self.id_sexo,
            "primer_nombre": self.primer_nombre,
            "segundo_nombre": self.segundo_nombre,
            "apellido_paterno": self.apellido_paterno,
            "apellido_materno": self.apellido_materno,
            "fecha_nacimiento": self.fecha_nacimiento,
            "lugar_nacimiento": self.lugar_nacimiento,
            "direccion": self.direccion,
            "ocupacion": self.ocupacion,
            "telefono": self.telefono,
            "email": self.email,
            "fecha_registro": self.fecha_registro
        }
    
    