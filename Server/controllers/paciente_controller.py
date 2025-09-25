from models.paciente import Paciente, db

class PacienteController:

    @staticmethod
    def obtener_todos():
        try:
            pacientes = Paciente.query.all()
            return {
                "success": True,
                "data": [paciente.to_dict() for paciente in pacientes],
                "mensaje": "Pacientes obtenidos con éxito"
            }
        except Exception as e:
            return {
                "success": False,
                "mensaje": f"Error al obtener pacientes: {str(e)}"
            }

    @staticmethod
    def obtener_por_id(id_paciente):
        try:
            paciente = Paciente.query.get(id_paciente)
            if not paciente:
                return {
                    "success": False,
                    "mensaje": "Paciente no encontrado"
                }
            return {
                "success": True,
                "data": paciente.to_dict(),
                "mensaje": "Paciente obtenido con éxito"
            }
        except Exception as e:
            return {
                "success": False,
                "mensaje": f"Error al obtener paciente: {str(e)}"
            }

    @staticmethod
    def crear_paciente(data):
        try:
            campos_requeridos = [
                "id_sexo", "primer_nombre", "apellido_paterno",
                "fecha_nacimiento", "direccion", "telefono"
            ]
            for campo in campos_requeridos:
                if not data.get(campo):
                    return {
                        "success": False,
                        "mensaje": f"Se requiere el campo: {campo}"
                    }

            paciente_existente = Paciente.query.filter_by(telefono=data['telefono']).first()
            if paciente_existente:
                return {'success': False, 'mensaje': 'El teléfono ya está en uso'}
            
            paciente_existente = Paciente.query.filter_by(email=data['email']).first()
            if paciente_existente:
                return {'success': False, 'mensaje': 'El email ya está en uso'}

            nuevo_paciente = Paciente(
                id_sexo=data["id_sexo"],
                primer_nombre=data.get("primer_nombre"),
                segundo_nombre=data.get("segundo_nombre"),
                apellido_paterno=data.get("apellido_paterno"),
                apellido_materno=data.get("apellido_materno"),
                fecha_nacimiento=data.get("fecha_nacimiento"),
                lugar_nacimiento=data.get("lugar_nacimiento"),
                direccion=data.get("direccion"),
                ocupacion=data.get("ocupacion"),
                telefono=data.get("telefono"),
                email=data.get("email")
            )

            db.session.add(nuevo_paciente)
            db.session.commit()
            return {
                "success": True,
                "data": nuevo_paciente.to_dict(),
                "mensaje": "Paciente creado con éxito"
            }
        except Exception as e:
            db.session.rollback()
            return {
                "success": False,
                "mensaje": f"Error al crear paciente: {str(e)}"
            }

    @staticmethod
    def actualizar_paciente(data):
        try:
            if not data or not data.get("id_paciente"):
                return {
                    "success": False,
                    "mensaje": "ID de paciente no enviado"
                }

            paciente = Paciente.query.get(data["id_paciente"])
            if not paciente:
                return {
                    "success": False,
                    "mensaje": "Paciente no encontrado"
                }
            
            if 'telefono' in data:
                paciente_existente = Paciente.query.filter(Paciente.telefono==data['telefono'],
                                                           Paciente.id_paciente != data["id_paciente"]).first()
                if paciente_existente:
                    return {'success': False, 'mensaje': 'Ya existe un paciente con este teléfono'}
            
            if 'email' in data:
                paciente_existente = Paciente.query.filter(Paciente.email==data['email'],
                                                           Paciente.id_paciente != data["id_paciente"]).first()
                if paciente_existente:
                    return {'success': False, 'mensaje': 'Ya existe un paciente con este email'}

            # Actualizar solo los campos enviados
            for campo in [
                "id_sexo", "primer_nombre", "segundo_nombre",
                "apellido_paterno", "apellido_materno",
                "fecha_nacimiento", "lugar_nacimiento",
                "direccion", "ocupacion", "telefono",
                "email"
            ]:
                if campo in data:
                    setattr(paciente, campo, data[campo])

            db.session.commit()
            return {
                "success": True,
                "data": paciente.to_dict(),
                "mensaje": "Paciente actualizado con éxito"
            }
        except Exception as e:
            db.session.rollback()
            return {
                "success": False,
                "mensaje": f"Error al actualizar paciente: {str(e)}"
            }

    @staticmethod
    def eliminar_paciente(data):
        try:
            if not data or not data.get("id_paciente"):
                return {
                    "success": False,
                    "mensaje": "ID de paciente no enviado"
                }

            paciente = Paciente.query.get(data["id_paciente"])
            if not paciente:
                return {
                    "success": False,
                    "mensaje": "Paciente no encontrado"
                }

            db.session.delete(paciente)
            db.session.commit()
            return {
                "success": True,
                "mensaje": "Paciente eliminado con éxito"
            }
        except Exception as e:
            db.session.rollback()
            return {
                "success": False,
                "mensaje": f"Error al eliminar paciente: {str(e)}"
            }
