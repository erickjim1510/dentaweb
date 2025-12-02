from db import db
from models.cita import Cita
from datetime import datetime, timedelta, time

class CitaController:

    @staticmethod
    def obtener_por_id(id_cita):
        try:
            cita = Cita.query.filter_by(id_cita=id_cita).first()
            if not cita:
                return {'success': False, 'mensaje': 'Cita no encontrada'}

            return {
                'success': True,
                'data': cita.to_dict(),
                'mensaje': 'Cita encontrada'
            }

        except Exception as e:
            return {
                'success': False,
                'mensaje': f'Error al obtener cita: {str(e)}'
            }
        
    @staticmethod
    def obtener_rango_json(data):
        try:
            fecha_inicio = data.get('fecha_inicio')
            fecha_fin = data.get('fecha_fin')

            if not fecha_inicio or not fecha_fin:
                return {
                    'success': False,
                    'mensaje': 'Se requieren fecha_inicio y fecha_fin'
                }

            citas = Cita.query.filter(
                Cita.fecha >= fecha_inicio,
                Cita.fecha <= fecha_fin
            ).all()

            return {
                'success': True,
                'data': [c.to_dict() for c in citas],
                'mensaje': 'Citas obtenidas correctamente'
            }

        except Exception as e:
            return {
                'success': False,
                'mensaje': f'Error al obtener citas por rango: {str(e)}'
            }

    @staticmethod
    def _convertir_hora_a_datetime(fecha_str, hora_obj):
        """
        Convierte una hora (string o time object) a datetime para comparaciones.
        """
        try:
            # Si la fecha es string, convertirla a date
            if isinstance(fecha_str, str):
                fecha_date = datetime.strptime(fecha_str, "%Y-%m-%d").date()
            else:
                fecha_date = fecha_str
            
            # Si la hora es un string
            if isinstance(hora_obj, str):
                # Intentar parsear con segundos primero
                try:
                    hora_time = datetime.strptime(hora_obj, "%H:%M:%S").time()
                except ValueError:
                    # Si falla, intentar sin segundos
                    hora_time = datetime.strptime(hora_obj, "%H:%M").time()
            elif isinstance(hora_obj, time):
                hora_time = hora_obj
            else:
                hora_time = hora_obj
            
            # Combinar fecha y hora
            return datetime.combine(fecha_date, hora_time)
        except Exception as e:
            raise ValueError(f"Error al convertir hora: {str(e)}")

    @staticmethod
    def crear_cita(data):
        try:
            # Validar campos requeridos
            campos = ['id_paciente', 'id_usuario', 'fecha', 'hora', 'estado']
            for c in campos:
                if c not in data:
                    return {'success': False, 'mensaje': f'Falta el campo {c}'}

            fecha_cita = data['fecha']
            hora_cita = data['hora']
            id_usuario = data['id_usuario']
            id_paciente = data['id_paciente']

            # Validar que el paciente no tenga otra cita el mismo día
            cita_paciente_mismo_dia = Cita.query.filter(
                Cita.id_paciente == id_paciente,
                Cita.fecha == fecha_cita
            ).first()

            if cita_paciente_mismo_dia:
                return {
                    'success': False,
                    'mensaje': 'El paciente ya tiene una cita programada para este día. Solo se permite una cita por día.'
                }

            # Convertir hora a datetime usando el método helper
            hora_datetime = CitaController._convertir_hora_a_datetime(fecha_cita, hora_cita)
            
            # Crear ventana de 30 minutos antes y después
            hora_inicio_ventana = hora_datetime - timedelta(minutes=30)
            hora_fin_ventana = hora_datetime + timedelta(minutes=30)

            # Obtener todas las citas del doctor en esa fecha
            citas_usuario = Cita.query.filter(
                Cita.id_usuario == id_usuario,
                Cita.fecha == fecha_cita
            ).all()

            # Validar conflictos de horario
            for cita in citas_usuario:
                hora_existente_dt = CitaController._convertir_hora_a_datetime(fecha_cita, cita.hora)
                
                if hora_inicio_ventana < hora_existente_dt < hora_fin_ventana:
                    return {
                        'success': False,
                        'mensaje': 'El doctor ya tiene una cita en este horario. Debe haber al menos 30 minutos de diferencia entre citas.'
                    }

            # Crear la nueva cita
            nueva = Cita(
                id_paciente=data['id_paciente'],
                id_usuario=data['id_usuario'],
                fecha=data['fecha'],
                hora=data['hora'],
                motivo=data.get('motivo', ''),
                estado=data['estado']
            )

            db.session.add(nueva)
            db.session.commit()

            return {
                'success': True,
                'data': nueva.to_dict(),
                'mensaje': 'Cita creada exitosamente'
            }

        except Exception as e:
            db.session.rollback()
            return {
                'success': False,
                'mensaje': f'Error al crear la cita: {str(e)}'
            }

    @staticmethod
    def actualizar_cita(data):
        try:
            # Validar que venga el ID de la cita
            id_cita = data.get('id_cita')
            if not id_cita:
                return {'success': False, 'mensaje': 'Se requiere id_cita'}

            # Buscar la cita
            cita = Cita.query.filter_by(id_cita=id_cita).first()
            if not cita:
                return {'success': False, 'mensaje': 'Cita no encontrada'}

            # Obtener valores actuales o nuevos
            nuevo_paciente = data.get('id_paciente', cita.id_paciente)
            nuevo_usuario = data.get('id_usuario', cita.id_usuario)
            nueva_fecha = data.get('fecha', cita.fecha)
            nueva_hora = data.get('hora', cita.hora)
            nuevo_motivo = data.get('motivo', cita.motivo)
            nuevo_estado = data.get('estado', cita.estado)

            # Validar que el paciente no tenga otra cita el mismo día (excluyendo la cita actual)
            cita_paciente_mismo_dia = Cita.query.filter(
                Cita.id_paciente == nuevo_paciente,
                Cita.fecha == nueva_fecha,
                Cita.id_cita != id_cita
            ).first()

            if cita_paciente_mismo_dia:
                return {
                    'success': False,
                    'mensaje': 'El paciente ya tiene una cita programada para este día. Solo se permite una cita por día.'
                }

            # Convertir hora a datetime usando el método helper
            hora_datetime = CitaController._convertir_hora_a_datetime(nueva_fecha, nueva_hora)
            
            # Crear ventana de 30 minutos
            hora_inicio_ventana = hora_datetime - timedelta(minutes=30)
            hora_fin_ventana = hora_datetime + timedelta(minutes=30)

            # Obtener todas las citas del doctor en esa fecha (excluyendo la cita actual)
            citas_usuario = Cita.query.filter(
                Cita.id_usuario == nuevo_usuario,
                Cita.fecha == nueva_fecha,
                Cita.id_cita != id_cita
            ).all()

            # Validar conflictos de horario
            for cita_existente in citas_usuario:
                hora_existente_dt = CitaController._convertir_hora_a_datetime(nueva_fecha, cita_existente.hora)
                
                if hora_inicio_ventana < hora_existente_dt < hora_fin_ventana:
                    return {
                        'success': False,
                        'mensaje': 'El doctor ya tiene una cita en este horario. Debe haber al menos 30 minutos de diferencia entre citas.'
                    }

            # Actualizar los campos de la cita
            cita.id_paciente = nuevo_paciente
            cita.id_usuario = nuevo_usuario
            cita.fecha = nueva_fecha
            cita.hora = nueva_hora
            cita.motivo = nuevo_motivo
            cita.estado = nuevo_estado

            db.session.commit()

            return {
                'success': True,
                'data': cita.to_dict(),
                'mensaje': 'Cita actualizada exitosamente'
            }

        except Exception as e:
            db.session.rollback()
            return {
                'success': False,
                'mensaje': f'Error al actualizar la cita: {str(e)}'
            }

    @staticmethod
    def eliminar_cita(id_cita):
        try:
            cita = Cita.query.filter_by(id_cita=id_cita).first()
            if not cita:
                return {'success': False, 'mensaje': 'Cita no encontrada'}

            db.session.delete(cita)
            db.session.commit()

            return {
                'success': True,
                'mensaje': 'Cita eliminada exitosamente'
            }

        except Exception as e:
            db.session.rollback()
            return {
                'success': False,
                'mensaje': f'Error al eliminar la cita: {str(e)}'
            }