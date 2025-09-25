from models.paciente import Paciente, db
from models.sexo import Sexo
from datetime import date
from sqlalchemy import or_

class PacienteController:

    @staticmethod
    def obtener_todos():
        try:
            pacientes = Paciente.query.join(Sexo).all()
            return {
                'success': True,
                'data': [paciente.to_dict() for paciente in pacientes],
                'mensaje': 'Pacientes obtenidos exitosamente'
            }
        except Exception as e:
            return {
                'success': False,
                'mensaje': f'Error al obtener pacientes: {str(e)}'
            }

    @staticmethod
    def buscar_pacientes(termino):
        """Busca pacientes por primer_nombre, apellido_paterno, apellido_materno o email"""
        try:
            if not termino or len(termino.strip()) == 0:
                return {
                    'success': True,
                    'data': [],
                    'mensaje': 'Sin resultados'
                }
            
            # Convertir a mayúsculas para la búsqueda (asumiendo que se guardan en mayúsculas)
            termino_upper = f"%{termino.upper()}%"
            
            pacientes = Paciente.query.join(Sexo).filter(
                or_(
                    Paciente.primer_nombre.like(termino_upper),
                    Paciente.apellido_paterno.like(termino_upper),
                    Paciente.apellido_materno.like(termino_upper),
                    Paciente.email.like(f"%{termino.lower()}%")  # Email en minúsculas
                )
            ).all()
            
            return {
                'success': True,
                'data': [paciente.to_dict() for paciente in pacientes],
                'mensaje': f'Se encontraron {len(pacientes)} pacientes'
            }
            
        except Exception as e:
            return {
                'success': False,
                'mensaje': f'Error al buscar pacientes: {str(e)}'
            }

    @staticmethod
    def obtener_por_id(id_paciente):
        try:
            paciente = Paciente.query.join(Sexo).filter(Paciente.id_paciente == id_paciente).first()
            if not paciente:
                return {
                    'success': False,
                    'mensaje': 'Paciente no encontrado'
                }
            return {
                'success': True,
                'data': paciente.to_dict(),
                'mensaje': 'Paciente encontrado'
            }
        except Exception as e:
            return {
                'success': False,
                'mensaje': f'Error al obtener paciente: {str(e)}'
            }

    @staticmethod
    def crear_paciente(data):
        try:
            campos_requeridos = [
                "id_sexo", "primer_nombre", "apellido_paterno", "apellido_materno",
                "fecha_nacimiento", "lugar_nacimiento", "direccion", 
                "ocupacion", "telefono", "email"
            ]
            
            for campo in campos_requeridos:
                if not data.get(campo):
                    return {'success': False, 'mensaje': f'El campo {campo} es requerido'}

            # Verificar duplicados
            paciente_existente = Paciente.query.filter_by(telefono=data['telefono']).first()
            if paciente_existente:
                return {'success': False, 'mensaje': 'El teléfono ya está registrado'}
            
            paciente_existente = Paciente.query.filter_by(email=data['email']).first()
            if paciente_existente:
                return {'success': False, 'mensaje': 'El email ya está registrado'}

            nuevo_paciente = Paciente(
                id_sexo=data["id_sexo"],
                primer_nombre=data["primer_nombre"],
                segundo_nombre=data.get("segundo_nombre"),
                apellido_paterno=data["apellido_paterno"],
                apellido_materno=data["apellido_materno"],
                fecha_nacimiento=data["fecha_nacimiento"],
                lugar_nacimiento=data["lugar_nacimiento"],
                direccion=data["direccion"],
                ocupacion=data["ocupacion"],
                telefono=data["telefono"],
                email=data["email"],
                fecha_registro=date.today()
            )

            db.session.add(nuevo_paciente)
            db.session.commit()

            paciente_creado = Paciente.query.join(Sexo).filter(
                Paciente.id_paciente == nuevo_paciente.id_paciente
            ).first()

            return {
                'success': True,
                'data': paciente_creado.to_dict(),
                'mensaje': 'Paciente creado exitosamente'
            }

        except Exception as e:
            db.session.rollback()
            return {'success': False, 'mensaje': f'Error al crear paciente: {str(e)}'}

    @staticmethod
    def actualizar_paciente(data):
        try:
            id_paciente = data.get('id_paciente')
            if not id_paciente:
                return {'success': False, 'mensaje': 'Se requiere el id_paciente'}

            paciente = Paciente.query.get(id_paciente)
            if not paciente:
                return {'success': False, 'mensaje': 'Paciente no encontrado'}
            
            # Verificar duplicados (excluyendo el paciente actual)
            if 'telefono' in data:
                paciente_existente = Paciente.query.filter(
                    Paciente.telefono == data['telefono'],
                    Paciente.id_paciente != id_paciente
                ).first()
                if paciente_existente:
                    return {'success': False, 'mensaje': 'El teléfono ya está en uso'}
            
            if 'email' in data:
                paciente_existente = Paciente.query.filter(
                    Paciente.email == data['email'],
                    Paciente.id_paciente != id_paciente
                ).first()
                if paciente_existente:
                    return {'success': False, 'mensaje': 'El email ya está en uso'}

            # Campos editables
            campos_editables = [
                "id_sexo", "primer_nombre", "segundo_nombre", "apellido_paterno", 
                "apellido_materno", "fecha_nacimiento", "lugar_nacimiento", 
                "direccion", "ocupacion", "telefono", "email"
            ]
            
            for campo in campos_editables:
                if campo in data:
                    setattr(paciente, campo, data[campo])

            db.session.commit()

            paciente_actualizado = Paciente.query.join(Sexo).filter(
                Paciente.id_paciente == id_paciente
            ).first()

            return {
                'success': True,
                'data': paciente_actualizado.to_dict(),
                'mensaje': 'Paciente actualizado exitosamente'
            }

        except Exception as e:
            db.session.rollback()
            return {'success': False, 'mensaje': f'Error al actualizar paciente: {str(e)}'}

    @staticmethod
    def eliminar_paciente(data):
        try:
            id_paciente = data.get('id_paciente')
            if not id_paciente:
                return {'success': False, 'mensaje': 'Se requiere el id_paciente'}

            paciente = Paciente.query.get(id_paciente)
            if not paciente:
                return {'success': False, 'mensaje': 'Paciente no encontrado'}

            db.session.delete(paciente)
            db.session.commit()

            return {'success': True, 'mensaje': 'Paciente eliminado exitosamente'}

        except Exception as e:
            db.session.rollback()
            return {'success': False, 'mensaje': f'Error al eliminar paciente: {str(e)}'}