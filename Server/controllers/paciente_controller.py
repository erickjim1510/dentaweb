from models.paciente import Paciente, db
from flask import jsonify

class PacienteController:
    
    @staticmethod
    def obtener_todos():
        try:
            pacientes = Paciente.query.all()
            return {
                "success": True,
                "data": [paciente.to_dict() for paciente in pacientes],
                "mensaje": "Pacientes obtenidos con exito"
            }
        except Exception as e:
            return {
                "success": False,
                "mensaje": f"Error al obtener todos: {str(e)}"
            }
        
    @staticmethod
    def crear_paciente(data):
        try:
            campos_requeridos = [
                "id_sexo",
                "primer_nombre",
                "segundo_nombre",
                "apellido_paterno",
                "apellido_materno",
                "fecha_nacimiento",
                "lugar_nacimiento",
                "direccion",
                "ocupacion",
                "telefono",
                "email",
                "fecha_registro"]
            for campo in campos_requeridos:
                if not data.get(campo):
                    return {
                        "success": False,
                        "mensaje": f"Se requiere el campo: {campo}"
                    }
            paciente_existente = Paciente.query.filter_by(email=data["email"]).first()
            if paciente_existente:
                return {
                    "success": False,
                    "mensaje": "El email ya esta registrado"
                }
            paciente_nuevo = Paciente(
                id_sexo=data["id_sexo"],
                primer_nombre=data["primer_nombre"],
                segundo_nombre=data["segundo_nombre"],
                apellido_paterno=data["apellido_paterno"],
                apellido_materno=data["apellido_materno"],
                fecha_nacimiento=data["fecha_nacimiento"],
                lugar_nacimiento=data["lugar_nacimiento"],
                direccion=data["direccion"],
                ocupacion=data["ocupacion"],
                telefono=data["telefono"],
                email=data["email"],
                fecha_registro=data["fecha_registro"]
            )
            db.session.add(paciente_nuevo)
            db.session.commit()
            return {
                "success": True,
                "data": paciente_nuevo.to_dict(),
                "mensaje": "Paciente creado con exito"
            }
        except Exception as e:
            return {
                "success": False,
                "mensaje": f"Error al crear paciente: {str(e)}"
            }