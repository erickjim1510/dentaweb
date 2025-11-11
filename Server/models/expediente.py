# models/expediente.py
from db import db

class Expediente(db.Model):
    __tablename__ = 'expedientes'

    id_expediente = db.Column(db.Integer, primary_key=True)
    id_paciente = db.Column(db.Integer, db.ForeignKey("pacientes.id_paciente"), nullable=False)
    
    # INFORMACIÓN MÉDICA
    cmp1 = db.Column(db.String(50))   # medico_familiar
    cmp2 = db.Column(db.Integer)      # glucosa
    cmp3 = db.Column(db.String(30))   # presion_arterial
    cmp4 = db.Column(db.Time)         # hora_ultimo_alimento
    cmp5 = db.Column(db.String(50))   # recomendado_por (CORREGIDO: era date, ahora string)
    
    # MOTIVO DE CONSULTA
    cmp6 = db.Column(db.String(50))   # (reservado)
    cmp7 = db.Column(db.String(100))  # motivo_consulta
    cmp8 = db.Column(db.String(50))   # duracion_padecimiento (CORREGIDO: era int, ahora string)
    
    # ANTECEDENTES HEREDO-FAMILIARES
    cmp9 = db.Column(db.String(50))   # antecedentes_padres
    cmp10 = db.Column(db.String(50))  # antecedentes_abuelos
    cmp11 = db.Column(db.String(50))  # antecedentes_tios
    cmp12 = db.Column(db.String(50))  # antecedentes_hermanos
    
    # ENFERMEDADES (Boolean)
    cmp13 = db.Column(db.Boolean)     # diabetes
    cmp14 = db.Column(db.Boolean)     # hipertension
    cmp15 = db.Column(db.Boolean)     # hepatitis
    cmp16 = db.Column(db.Boolean)     # infartos
    cmp17 = db.Column(db.Boolean)     # migrania
    cmp18 = db.Column(db.Boolean)     # tuberculos
    cmp19 = db.Column(db.Boolean)     # anemia
    cmp20 = db.Column(db.Boolean)     # asma_bronquial
    cmp21 = db.Column(db.Boolean)     # epilepsia
    cmp22 = db.Column(db.Boolean)     # enf_rinon
    cmp23 = db.Column(db.Boolean)     # enf_tiroides
    cmp24 = db.Column(db.Boolean)     # enf_respiratorias
    cmp25 = db.Column(db.Boolean)     # vih_sida
    cmp26 = db.Column(db.Boolean)     # cancer
    cmp27 = db.Column(db.Boolean)     # mareos
    cmp28 = db.Column(db.Boolean)     # artritis_reumatica
    cmp29 = db.Column(db.Boolean)     # fiebre_reumatica
    cmp30 = db.Column(db.Boolean)     # lupus
    
    # OTRAS ENFERMEDADES Y MEDICAMENTOS
    cmp31 = db.Column(db.String(50))  # enfermedades_infancia_detalle
    cmp32 = db.Column(db.Boolean)     # covid19
    cmp33 = db.Column(db.String(50))  # covid19_tratamiento
    cmp34 = db.Column(db.Boolean)     # consume_medicamento (CORREGIDO: era tinyint según ALTER)
    cmp35 = db.Column(db.String(50))  # otras_enfermedades
    cmp36 = db.Column(db.String(50))  # medicamento_detalle
    cmp37 = db.Column(db.Boolean)     # dolores_cabeza
    cmp38 = db.Column(db.String(50))  # alergico_sustancia_detalle
    cmp39 = db.Column(db.Boolean)     # intervencion_quirurgica
    cmp40 = db.Column(db.String(50))  # intervencion_quirurgica_detalle
    cmp41 = db.Column(db.Boolean)     # sangra_excesivamente (CORREGIDO: era date, ahora boolean)
    cmp42 = db.Column(db.Boolean)     # embarazada
    cmp43 = db.Column(db.Boolean)     # enfermedad_grave_reciente
    cmp44 = db.Column(db.String(50))  # enfermedad_grave_detalle
    cmp45 = db.Column(db.Boolean)     # consume_alcohol
    cmp46 = db.Column(db.Boolean)     # fuma
    
    # HISTORIA BUCAL Y DENTAL
    cmp47 = db.Column(db.Date)        # fecha_ultima_visita_dental
    cmp48 = db.Column(db.String(50))  # motivo_visita_dental
    cmp49 = db.Column(db.Integer)     # cepillado_diario (CORREGIDO: según ALTER es int)
    cmp50 = db.Column(db.Boolean)     # usa_aditamento_dental
    cmp51 = db.Column(db.String(50))  # aditamento_dental_detalle
    cmp52 = db.Column(db.Boolean)     # reaccion_anestesia
    cmp53 = db.Column(db.Boolean)     # molestia_boca
    cmp54 = db.Column(db.Boolean)     # mal_sabor_boca
    cmp55 = db.Column(db.Boolean)     # sangrado_encias
    cmp56 = db.Column(db.Boolean)     # dientes_moviles
    cmp57 = db.Column(db.Boolean)     # ruido_boca
    cmp58 = db.Column(db.String(50))  # habitos_orofaciales (CORREGIDO: según ALTER es varchar)
    cmp59 = db.Column(db.Boolean)     # respira_boca
    cmp60 = db.Column(db.Boolean)  # consentimiento_informado


    paciente = db.relationship('Paciente', back_populates='expediente')

    def to_dict(self):
        """Convierte el objeto Expediente a un diccionario con nombres legibles"""
        return {
            'id_expediente': self.id_expediente,
            'id_paciente': self.id_paciente,
            
            # INFORMACIÓN MÉDICA
            'medico_familiar': self.cmp1,
            'glucosa': self.cmp2,
            'presion_arterial': self.cmp3,
            'hora_ultimo_alimento': self.cmp4.isoformat() if self.cmp4 else None,
            'recomendado_por': self.cmp5,
            
            # MOTIVO DE CONSULTA
            'motivo_consulta': self.cmp7,
            'duracion_padecimiento': self.cmp8,
            
            # ANTECEDENTES HEREDO-FAMILIARES
            'antecedentes_padres': self.cmp9,
            'antecedentes_abuelos': self.cmp10,
            'antecedentes_tios': self.cmp11,
            'antecedentes_hermanos': self.cmp12,
            
            # ENFERMEDADES
            'diabetes': 'SI' if self.cmp13 else 'NO',
            'hipertension': 'SI' if self.cmp14 else 'NO',
            'hepatitis': 'SI' if self.cmp15 else 'NO',
            'infartos': 'SI' if self.cmp16 else 'NO',
            'migrania': 'SI' if self.cmp17 else 'NO',
            'tuberculos': 'SI' if self.cmp18 else 'NO',
            'anemia': 'SI' if self.cmp19 else 'NO',
            'asma_bronquial': 'SI' if self.cmp20 else 'NO',
            'epilepsia': 'SI' if self.cmp21 else 'NO',
            'enf_rinon': 'SI' if self.cmp22 else 'NO',
            'enf_tiroides': 'SI' if self.cmp23 else 'NO',
            'enf_respiratorias': 'SI' if self.cmp24 else 'NO',
            'vih_sida': 'SI' if self.cmp25 else 'NO',
            'cancer': 'SI' if self.cmp26 else 'NO',
            'mareos': 'SI' if self.cmp27 else 'NO',
            'artritis_reumatica': 'SI' if self.cmp28 else 'NO',
            'fiebre_reumatica': 'SI' if self.cmp29 else 'NO',
            'lupus': 'SI' if self.cmp30 else 'NO',
            
            # OTRAS ENFERMEDADES Y MEDICAMENTOS
            'enfermedades_infancia_detalle': self.cmp31,
            'covid19': 'SI' if self.cmp32 else 'NO',
            'covid19_tratamiento': self.cmp33,
            'consume_medicamento': 'SI' if self.cmp34 else 'NO',
            'otras_enfermedades': self.cmp35,
            'medicamento_detalle': self.cmp36,
            'dolores_cabeza': 'SI' if self.cmp37 else 'NO',
            'alergico_sustancia_detalle': self.cmp38,
            'intervencion_quirurgica': 'SI' if self.cmp39 else 'NO',
            'intervencion_quirurgica_detalle': self.cmp40,
            'sangra_excesivamente': 'SI' if self.cmp41 else 'NO',
            'embarazada': 'SI' if self.cmp42 else 'NO',
            'enfermedad_grave_reciente': 'SI' if self.cmp43 else 'NO',
            'enfermedad_grave_detalle': self.cmp44,
            'consume_alcohol': 'SI' if self.cmp45 else 'NO',
            'fuma': 'SI' if self.cmp46 else 'NO',
            
            # HISTORIA BUCAL Y DENTAL
            'fecha_ultima_visita_dental': self.cmp47.isoformat() if self.cmp47 else None,
            'motivo_visita_dental': self.cmp48,
            'cepillado_diario': self.cmp49,
            'usa_aditamento_dental': 'SI' if self.cmp50 else 'NO',
            'aditamento_dental_detalle': self.cmp51,
            'reaccion_anestesia': 'SI' if self.cmp52 else 'NO',
            'molestia_boca': 'SI' if self.cmp53 else 'NO',
            'mal_sabor_boca': 'SI' if self.cmp54 else 'NO',
            'sangrado_encias': 'SI' if self.cmp55 else 'NO',
            'dientes_moviles': 'SI' if self.cmp56 else 'NO',
            'ruido_boca': 'SI' if self.cmp57 else 'NO',
            'habitos_orofaciales': self.cmp58,
            'respira_boca': 'SI' if self.cmp59 else 'NO',
            'consentimiento_informado': 'SI' if self.cmp60 else 'NO',

        }