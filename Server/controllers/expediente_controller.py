from db import db
from models.expediente import Expediente

class ExpedienteController:
    
    @staticmethod
    def obtener_por_id(id_paciente):
        try:
            expediente = Expediente.query.filter(Expediente.id_paciente == id_paciente).first()
            if not expediente:
                return {
                    'success': False,
                    'mensaje': 'Expediente no encontrado'
                }
            return {
                'success': True,
                'data': expediente.to_dict(),
                'mensaje': 'Expediente encontrado'
            }
        except Exception as e:
            return {
                'success': False,
                'mensaje': f'Error al obtener expediente: {str(e)}'
            }
        
    @staticmethod
    def crear_expediente(data):
        try:
            campos_requeridos = [
                'id_paciente','cmp1','cmp2','cmp3','cmp4','cmp5','cmp6','cmp7','cmp8','cmp9','cmp10',
                'cmp11','cmp12','cmp13','cmp14','cmp15','cmp16','cmp17','cmp18','cmp19','cmp20',
                'cmp21','cmp22','cmp23','cmp24','cmp25','cmp26','cmp27','cmp28','cmp29','cmp30',
                'cmp31','cmp32','cmp33','cmp34','cmp35','cmp36','cmp37','cmp38','cmp39','cmp40',
                'cmp41','cmp42','cmp43','cmp44','cmp45','cmp46','cmp47','cmp48','cmp49','cmp50',
                'cmp51','cmp52','cmp53','cmp54','cmp55','cmp56','cmp57','cmp58','cmp59'
            ]

            for campo in campos_requeridos:
                if campo not in data or data[campo] is None:
                    return {'success': False, 'mensaje': f'El campo {campo} es requerido'}

            # Verificar si ya existe un expediente para ese paciente
            expediente_existente = Expediente.query.filter_by(id_paciente=data['id_paciente']).first()
            if expediente_existente:
                return {'success': False, 'mensaje': 'Ya existe un expediente para este paciente'}

            # Crear nuevo expediente
            nuevo_expediente = Expediente(**{campo: data[campo] for campo in campos_requeridos})

            db.session.add(nuevo_expediente)
            db.session.commit()

            return {
                'success': True,
                'data': nuevo_expediente.to_dict(),
                'mensaje': 'Expediente creado exitosamente'
            }

        except Exception as e:
            db.session.rollback()
            return {'success': False, 'mensaje': f'Error al crear expediente: {str(e)}'}

    @staticmethod
    def actualizar_expediente(data):
        try:
            id_paciente = data.get('id_paciente')
            if not id_paciente:
                return {'success': False, 'mensaje': 'Se requiere el id_paciente'}

            expediente = Expediente.query.filter_by(id_paciente=id_paciente).first()
            if not expediente:
                return {'success': False, 'mensaje': 'Expediente no encontrado'}

            # Campos actualizables
            campos_actualizables = [
                'cmp1','cmp2','cmp3','cmp4','cmp5','cmp6','cmp7','cmp8','cmp9','cmp10',
                'cmp11','cmp12','cmp13','cmp14','cmp15','cmp16','cmp17','cmp18','cmp19','cmp20',
                'cmp21','cmp22','cmp23','cmp24','cmp25','cmp26','cmp27','cmp28','cmp29','cmp30',
                'cmp31','cmp32','cmp33','cmp34','cmp35','cmp36','cmp37','cmp38','cmp39','cmp40',
                'cmp41','cmp42','cmp43','cmp44','cmp45','cmp46','cmp47','cmp48','cmp49','cmp50',
                'cmp51','cmp52','cmp53','cmp54','cmp55','cmp56','cmp57','cmp58','cmp59'
            ]

            cambios_realizados = False
            for campo in campos_actualizables:
                if campo in data:
                    setattr(expediente, campo, data[campo])
                    cambios_realizados = True

            if not cambios_realizados:
                return {'success': False, 'mensaje': 'No se proporcionaron campos para actualizar'}

            db.session.commit()

            return {
                'success': True,
                'data': expediente.to_dict(),
                'mensaje': 'Expediente actualizado exitosamente'
            }

        except Exception as e:
            db.session.rollback()
            return {'success': False, 'mensaje': f'Error al actualizar expediente: {str(e)}'}
