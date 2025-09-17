from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from datetime import date
from db import db

class Usuario(db.Model):
    __tablename__ = "usuarios"
    
    id_usuario = db.Column(db.Integer, primary_key=True)
    id_rol = db.Column(db.Integer, db.ForeignKey("roles.id_rol"), nullable=False)
    id_estado = db.Column(db.Integer, db.ForeignKey("estados.id_estado"), nullable=False)
    primer_nombre = db.Column(db.String(30))
    segundo_nombre = db.Column(db.String(30))
    apellido_paterno = db.Column(db.String(30))
    apellido_materno = db.Column(db.String(30))
    fecha_nacimiento = db.Column(db.Date)
    nombre_usuario = db.Column(db.String(30))
    contrasena_hash = db.Column(db.String(255))
    telefono = db.Column(db.String(15))
    email = db.Column(db.String(30))
    fecha_registro = db.Column(db.Date, default=date.today)
    
    # Relaciones
    rol = db.relationship('Rol', back_populates='usuarios')
    estado = db.relationship('Estado', back_populates='usuarios')
    
    def to_dict(self, exclude_password=False):
        data = {
            "id_usuario": self.id_usuario,
            "id_rol": self.id_rol,
            "id_estado": self.id_estado,
            "primer_nombre": self.primer_nombre,
            "segundo_nombre": self.segundo_nombre,
            "apellido_paterno": self.apellido_paterno,
            "apellido_materno": self.apellido_materno,
            "fecha_nacimiento": self.fecha_nacimiento.isoformat() if self.fecha_nacimiento else None,
            "nombre_usuario": self.nombre_usuario,
            "telefono": self.telefono,
            "email": self.email,
            "fecha_registro": self.fecha_registro.isoformat() if self.fecha_registro else None,
            "nombre_rol": self.rol.nombre_rol if self.rol else None,
            "nombre_estado": self.estado.nombre_estado if self.estado else None
        }
        if not exclude_password:
            data["contrasena_hash"] = self.contrasena_hash
        return data
        
    def verificar_password(self, contrasena_hash):
        return self.contrasena_hash == contrasena_hash