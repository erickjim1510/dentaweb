from db import db
from datetime import datetime
from sqlalchemy.dialects.mysql import INTEGER

class Cita(db.Model):
    __tablename__ = 'citas'

    id_cita = db.Column(INTEGER(unsigned=True), primary_key=True, autoincrement=True)

    id_paciente = db.Column(
        INTEGER(unsigned=True),
        db.ForeignKey('pacientes.id_paciente'),
        nullable=False
    )

    id_usuario = db.Column(
        INTEGER(unsigned=True),
        db.ForeignKey('usuarios.id_usuario'),
        nullable=False
    )

    fecha = db.Column(db.Date, nullable=False)
    hora = db.Column(db.Time, nullable=False)
    motivo = db.Column(db.String(255))
    estado = db.Column(db.String(50))
    fecha_creacion = db.Column(db.DateTime, default=datetime.utcnow)

    # Relaciones
    paciente = db.relationship('Paciente', back_populates='citas')
    usuario = db.relationship('Usuario', back_populates='citas')

    def to_dict(self):
        return {
            'id_cita': self.id_cita,
            'id_paciente': self.id_paciente,
            'id_usuario': self.id_usuario,
            'fecha': self.fecha.isoformat() if self.fecha else None,
            'hora': self.hora.isoformat() if self.hora else None,
            'motivo': self.motivo,
            'estado': self.estado,
            'fecha_creacion': self.fecha_creacion.isoformat() if self.fecha_creacion else None
        }
