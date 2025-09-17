from db import db

class Sexo(db.Model):
    __tablename__ = "sexos"

    id_sexo = db.Column(db.Integer, primary_key=True)
    nombre_sexo = db.Column(db.String(30))

    # Relación con Paciente
    pacientes = db.relationship("Paciente", back_populates="sexo")

    def to_dict(self):
        return {
            "id_sexo": self.id_sexo,
            "nombre_sexo": self.nombre_sexo
        }
