from db import db
from models.cita import Cita

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
    def crear_cita(data):
        try:
            campos = ['id_paciente','id_usuario','fecha','hora','motivo','estado']
            for c in campos:
                if c not in data:
                    return {'success': False, 'mensaje': f'Falta el campo {c}'}

            # Validación: evitar doble cita del mismo usuario en misma fecha y hora
            conflicto = Cita.query.filter(
                Cita.id_usuario == data['id_usuario'],
                Cita.fecha == data['fecha'],
                Cita.hora == data['hora']
            ).first()

            if conflicto:
                return {
                    'success': False,
                    'mensaje': 'El usuario ya tiene una cita registrada en esa fecha y hora'
                }

            nueva = Cita(
                id_paciente=data['id_paciente'],
                id_usuario=data['id_usuario'],
                fecha=data['fecha'],
                hora=data['hora'],
                motivo=data.get('motivo'),
                estado=data.get('estado')
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
            return {'success': False, 'mensaje': f'Error: {str(e)}'}


    @staticmethod
    def actualizar_cita(data):
        try:
            id_cita = data.get('id_cita')
            if not id_cita:
                return {'success': False, 'mensaje': 'Se requiere id_cita'}

            cita = Cita.query.filter_by(id_cita=id_cita).first()
            if not cita:
                return {'success': False, 'mensaje': 'Cita no encontrada'}

            # Campos actualizables
            campos = ['id_paciente', 'id_usuario', 'fecha', 'hora', 'motivo', 'estado']
            cambios = {}

            for c in campos:
                if c in data:
                    cambios[c] = data[c]

            if not cambios:
                return {'success': False, 'mensaje': 'No se proporcionaron campos para actualizar'}

            # Validación de conflicto si cambian usuario, fecha o hora
            nuevo_usuario = cambios.get('id_usuario', cita.id_usuario)
            nueva_fecha = cambios.get('fecha', cita.fecha)
            nueva_hora = cambios.get('hora', cita.hora)

            conflicto = Cita.query.filter(
                Cita.id_usuario == nuevo_usuario,
                Cita.fecha == nueva_fecha,
                Cita.hora == nueva_hora,
                Cita.id_cita != id_cita  # Excluir la cita actual
            ).first()

            if conflicto:
                return {
                    'success': False,
                    'mensaje': 'El usuario ya tiene otra cita en esa fecha y hora'
                }

            # Aplicar cambios
            for k, v in cambios.items():
                setattr(cita, k, v)

            db.session.commit()

            return {
                'success': True,
                'data': cita.to_dict(),
                'mensaje': 'Cita actualizada exitosamente'
            }

        except Exception as e:
            db.session.rollback()
            return {'success': False, 'mensaje': f'Error al actualizar cita: {str(e)}'}


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
                'mensaje': f'Error al eliminar cita: {str(e)}'
            }
