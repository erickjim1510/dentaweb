from db import db

class Expediente(db.Model):
    __tablename__ = 'expedientes'

    id_expediente = db.Column(db.Integer, primary_key=True)
    id_paciente = db.Column(db.Integer, db.ForeignKey("pacientes.id_paciente"), nullable=False)
    cmp1 = db.Column(db.String(50)) #medico familiar
    cmp2 = db.Column(db.Integer) #glucosa
    cmp3 = db.Column(db.String(30)) #presion arterial
    cmp4 = db.Column(db.Time) #hora ultimo alimento
    cmp5 = db.Column(db.Date) #fecha ultima consulta
    cmp6 = db.Column(db.String(50)) #motivo
    cmp7 = db.Column(db.String(100)) #descripcion
    cmp8 = db.Column(db.Integer) #duracion
    cmp9 = db.Column(db.String(50)) #padres
    cmp10 = db.Column(db.String(50)) #abuelos

    cmp11 = db.Column(db.String(50)) #tios
    cmp12 = db.Column(db.String(50)) #hermanos
    cmp13 = db.Column(db.Boolean) #diabetes
    cmp14 = db.Column(db.Boolean) #hipertension
    cmp15 = db.Column(db.Boolean) #hepatitis
    cmp16 = db.Column(db.Boolean) #infartos
    cmp17 = db.Column(db.Boolean) #migraña
    cmp18 = db.Column(db.Boolean) #tuberculosis
    cmp19 = db.Column(db.Boolean) #anemia
    cmp20 = db.Column(db.Boolean) #asma bronquial

    cmp21 = db.Column(db.Boolean) #epilepsia
    cmp22 = db.Column(db.Boolean) #enfermedad riñon
    cmp23 = db.Column(db.Boolean) #enfermedad tiroides
    cmp24 = db.Column(db.Boolean) #enfermedad respiratorias
    cmp25 = db.Column(db.Boolean) #vih sida
    cmp26 = db.Column(db.Boolean) #cancer
    cmp27 = db.Column(db.Boolean) #mareos
    cmp28 = db.Column(db.Boolean) #artritis reumatica
    cmp29 = db.Column(db.Boolean) #fiebre reumatica
    cmp30 = db.Column(db.Boolean) #lupus

    cmp31 = db.Column(db.String(50)) #enfermedades infacia
    cmp32 = db.Column(db.Boolean) #covid 19
    cmp33 = db.Column(db.String(50)) #tratamiento covid 19
    cmp34 = db.Column(db.Boolean) #otros
    cmp35 = db.Column(db.String(50)) #explique otros
    cmp36 = db.Column(db.String(50)) #consumo medicamento
    cmp37 = db.Column(db.Boolean) #sufre dolores cabeza
    cmp38 = db.Column(db.String(50)) #alergias
    cmp39 = db.Column(db.Boolean) #intervenido quirurgicamente
    cmp40 = db.Column(db.String(50)) #que intervencion

    cmp41 = db.Column(db.Date) #fecha intervencion
    cmp42 = db.Column(db.Boolean) #sangra excesivamente
    cmp43 = db.Column(db.Boolean) #esta embarazada
    cmp44 = db.Column(db.String(50)) #padecio enfermedad grave
    cmp45 = db.Column(db.Boolean) #consume alcohol
    cmp46 = db.Column(db.Boolean) #fuma
    cmp47 = db.Column(db.Date) #fecha ultima visita dental
    cmp48 = db.Column(db.String(50)) #motivo
    cmp49 = db.Column(db.Boolean) #cantidad cepillados diarios
    cmp50 = db.Column(db.Boolean) #utiliza otro aditamento

    cmp51 = db.Column(db.String(50)) #cuales aditamentos
    cmp52 = db.Column(db.Boolean) #reaccion anestecia local
    cmp53 = db.Column(db.Boolean) #molestia dolor bucal
    cmp54 = db.Column(db.Boolean) #mal olor mal sabor boca
    cmp55 = db.Column(db.Boolean) #sangran encias
    cmp56 = db.Column(db.Boolean) #siente dientes moviles aprieta rechinan sus dientes
    cmp57 = db.Column(db.Boolean) #molestia ruido al abrir y cerrar su boca
    cmp58 = db.Column(db.Boolean) #malos habitos orofaciales
    cmp59 = db.Column(db.Boolean) #repira con boca

    paciente = db.relationship('Paciente', back_populates='expediente')

    def to_dict(self):
        """Convierte el objeto Expediente a un diccionario"""
        expediente_dict = {
            'id_expediente': self.id_expediente,
            'id_paciente': self.id_paciente,
            'cmp1': self.cmp1,
            'cmp2': self.cmp2,
            'cmp3': self.cmp3,
            'cmp4': self.cmp4.isoformat() if self.cmp4 else None,  # Time a string
            'cmp5': self.cmp5.isoformat() if self.cmp5 else None,  # Date a string
            'cmp6': self.cmp6,
            'cmp7': self.cmp7,
            'cmp8': self.cmp8,
            'cmp9': self.cmp9,
            'cmp10': self.cmp10,
            'cmp11': self.cmp11,
            'cmp12': self.cmp12,
            'cmp13': self.cmp13,
            'cmp14': self.cmp14,
            'cmp15': self.cmp15,
            'cmp16': self.cmp16,
            'cmp17': self.cmp17,
            'cmp18': self.cmp18,
            'cmp19': self.cmp19,
            'cmp20': self.cmp20,
            'cmp21': self.cmp21,
            'cmp22': self.cmp22,
            'cmp23': self.cmp23,
            'cmp24': self.cmp24,
            'cmp25': self.cmp25,
            'cmp26': self.cmp26,
            'cmp27': self.cmp27,
            'cmp28': self.cmp28,
            'cmp29': self.cmp29,
            'cmp30': self.cmp30,
            'cmp31': self.cmp31,
            'cmp32': self.cmp32,
            'cmp33': self.cmp33,
            'cmp34': self.cmp34,
            'cmp35': self.cmp35,
            'cmp36': self.cmp36,
            'cmp37': self.cmp37,
            'cmp38': self.cmp38,
            'cmp39': self.cmp39,
            'cmp40': self.cmp40,
            'cmp41': self.cmp41.isoformat() if self.cmp41 else None,  # Date a string
            'cmp42': self.cmp42,
            'cmp43': self.cmp43,
            'cmp44': self.cmp44,
            'cmp45': self.cmp45,
            'cmp46': self.cmp46,
            'cmp47': self.cmp47.isoformat() if self.cmp47 else None,  # Date a string
            'cmp48': self.cmp48,
            'cmp49': self.cmp49,
            'cmp50': self.cmp50,
            'cmp51': self.cmp51,
            'cmp52': self.cmp52,
            'cmp53': self.cmp53,
            'cmp54': self.cmp54,
            'cmp55': self.cmp55,
            'cmp56': self.cmp56,
            'cmp57': self.cmp57,
            'cmp58': self.cmp58,
            'cmp59': self.cmp59
        }
        return expediente_dict
    
        