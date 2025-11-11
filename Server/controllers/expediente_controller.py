# controllers/expediente_controller.py
from db import db
from models.expediente import Expediente

class ExpedienteController:
    
    @staticmethod
    def _convertir_si_no_a_bool(valor):
        """Convierte 'SI'/'NO' a True/False"""
        if isinstance(valor, str):
            return valor.upper() == 'SI'
        return bool(valor)
    
    @staticmethod
    def _preparar_datos_para_db(data):
        """Convierte los datos del frontend al formato de la base de datos"""
        return {
            # INFORMACIÓN MÉDICA
            'cmp1': data.get('medico_familiar'),
            'cmp2': int(data.get('glucosa')) if data.get('glucosa') else None,
            'cmp3': data.get('presion_arterial'),
            'cmp4': data.get('hora_ultimo_alimento'),
            'cmp5': data.get('recomendado_por'),
            
            # MOTIVO DE CONSULTA
            'cmp7': data.get('motivo_consulta'),
            'cmp8': data.get('duracion_padecimiento'),
            
            # ANTECEDENTES HEREDO-FAMILIARES
            'cmp9': data.get('antecedentes_padres'),
            'cmp10': data.get('antecedentes_abuelos'),
            'cmp11': data.get('antecedentes_tios'),
            'cmp12': data.get('antecedentes_hermanos'),
            
            # ENFERMEDADES
            'cmp13': ExpedienteController._convertir_si_no_a_bool(data.get('diabetes', 'NO')),
            'cmp14': ExpedienteController._convertir_si_no_a_bool(data.get('hipertension', 'NO')),
            'cmp15': ExpedienteController._convertir_si_no_a_bool(data.get('hepatitis', 'NO')),
            'cmp16': ExpedienteController._convertir_si_no_a_bool(data.get('infartos', 'NO')),
            'cmp17': ExpedienteController._convertir_si_no_a_bool(data.get('migrania', 'NO')),
            'cmp18': ExpedienteController._convertir_si_no_a_bool(data.get('tuberculos', 'NO')),
            'cmp19': ExpedienteController._convertir_si_no_a_bool(data.get('anemia', 'NO')),
            'cmp20': ExpedienteController._convertir_si_no_a_bool(data.get('asma_bronquial', 'NO')),
            'cmp21': ExpedienteController._convertir_si_no_a_bool(data.get('epilepsia', 'NO')),
            'cmp22': ExpedienteController._convertir_si_no_a_bool(data.get('enf_rinon', 'NO')),
            'cmp23': ExpedienteController._convertir_si_no_a_bool(data.get('enf_tiroides', 'NO')),
            'cmp24': ExpedienteController._convertir_si_no_a_bool(data.get('enf_respiratorias', 'NO')),
            'cmp25': ExpedienteController._convertir_si_no_a_bool(data.get('vih_sida', 'NO')),
            'cmp26': ExpedienteController._convertir_si_no_a_bool(data.get('cancer', 'NO')),
            'cmp27': ExpedienteController._convertir_si_no_a_bool(data.get('mareos', 'NO')),
            'cmp28': ExpedienteController._convertir_si_no_a_bool(data.get('artritis_reumatica', 'NO')),
            'cmp29': ExpedienteController._convertir_si_no_a_bool(data.get('fiebre_reumatica', 'NO')),
            'cmp30': ExpedienteController._convertir_si_no_a_bool(data.get('lupus', 'NO')),
            
            # OTRAS ENFERMEDADES Y MEDICAMENTOS
            'cmp31': data.get('enfermedades_infancia_detalle'),
            'cmp32': ExpedienteController._convertir_si_no_a_bool(data.get('covid19', 'NO')),
            'cmp33': data.get('covid19_tratamiento'),
            'cmp34': ExpedienteController._convertir_si_no_a_bool(data.get('consume_medicamento', 'NO')),
            'cmp35': data.get('otras_enfermedades'),
            'cmp36': data.get('medicamento_detalle'),
            'cmp37': ExpedienteController._convertir_si_no_a_bool(data.get('dolores_cabeza', 'NO')),
            'cmp38': data.get('alergico_sustancia_detalle'),
            'cmp39': ExpedienteController._convertir_si_no_a_bool(data.get('intervencion_quirurgica', 'NO')),
            'cmp40': data.get('intervencion_quirurgica_detalle'),
            'cmp41': ExpedienteController._convertir_si_no_a_bool(data.get('sangra_excesivamente', 'NO')),
            'cmp42': ExpedienteController._convertir_si_no_a_bool(data.get('embarazada', 'NO')),
            'cmp43': ExpedienteController._convertir_si_no_a_bool(data.get('enfermedad_grave_reciente', 'NO')),
            'cmp44': data.get('enfermedad_grave_detalle'),
            'cmp45': ExpedienteController._convertir_si_no_a_bool(data.get('consume_alcohol', 'NO')),
            'cmp46': ExpedienteController._convertir_si_no_a_bool(data.get('fuma', 'NO')),
            
            # HISTORIA BUCAL Y DENTAL
            'cmp47': data.get('fecha_ultima_visita_dental'),
            'cmp48': data.get('motivo_visita_dental'),
            'cmp49': int(data.get('cepillado_diario')) if data.get('cepillado_diario') else None,
            'cmp50': ExpedienteController._convertir_si_no_a_bool(data.get('usa_aditamento_dental', 'NO')),
            'cmp51': data.get('aditamento_dental_detalle'),
            'cmp52': ExpedienteController._convertir_si_no_a_bool(data.get('reaccion_anestesia', 'NO')),
            'cmp53': ExpedienteController._convertir_si_no_a_bool(data.get('molestia_boca', 'NO')),
            'cmp54': ExpedienteController._convertir_si_no_a_bool(data.get('mal_sabor_boca', 'NO')),
            'cmp55': ExpedienteController._convertir_si_no_a_bool(data.get('sangrado_encias', 'NO')),
            'cmp56': ExpedienteController._convertir_si_no_a_bool(data.get('dientes_moviles', 'NO')),
            'cmp57': ExpedienteController._convertir_si_no_a_bool(data.get('ruido_boca', 'NO')),
            'cmp58': data.get('habitos_orofaciales'),
            'cmp59': ExpedienteController._convertir_si_no_a_bool(data.get('respira_boca', 'NO')),
            # CORREGIDO: era 'consentimiento', debe ser 'consentimiento_informado'
            'cmp60': ExpedienteController._convertir_si_no_a_bool(data.get('consentimiento_informado', 'NO')),
        }
    
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
            if 'id_paciente' not in data:
                return {'success': False, 'mensaje': 'El campo id_paciente es requerido'}

            # Verificar si ya existe un expediente para ese paciente
            expediente_existente = Expediente.query.filter_by(id_paciente=data['id_paciente']).first()
            if expediente_existente:
                return {'success': False, 'mensaje': 'Ya existe un expediente para este paciente'}

            # Preparar datos para la base de datos
            datos_db = ExpedienteController._preparar_datos_para_db(data)
            datos_db['id_paciente'] = data['id_paciente']

            # Crear nuevo expediente
            nuevo_expediente = Expediente(**datos_db)

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

            # Preparar datos para actualización
            datos_db = ExpedienteController._preparar_datos_para_db(data)

            # Actualizar campos
            for campo, valor in datos_db.items():
                if hasattr(expediente, campo):
                    setattr(expediente, campo, valor)

            db.session.commit()

            return {
                'success': True,
                'data': expediente.to_dict(),
                'mensaje': 'Expediente actualizado exitosamente'
            }

        except Exception as e:
            db.session.rollback()
            return {'success': False, 'mensaje': f'Error al actualizar expediente: {str(e)}'}

    @staticmethod
    def eliminar_expediente(id_paciente):
        try:
            if not id_paciente:
                return {'success': False, 'mensaje': 'Se requiere el id_paciente'}

            expediente = Expediente.query.filter_by(id_paciente=id_paciente).first()
            if not expediente:
                return {'success': False, 'mensaje': 'Expediente no encontrado'}

            db.session.delete(expediente)
            db.session.commit()

            return {
                'success': True,
                'mensaje': 'Expediente eliminado exitosamente'
            }

        except Exception as e:
            db.session.rollback()
            return {
                'success': False,
                'mensaje': f'Error al eliminar expediente: {str(e)}'
            }