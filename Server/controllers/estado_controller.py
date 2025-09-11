from models.estado import Estado, db
from flask import jsonify

class EstadoController:

    @staticmethod
    def obtener_todos():
        try:
            estados = Estado.query.all()
            return {
                'success': True,
                'data': [estado.to_dict() for estado in estados],
                'mensaje': 'Usuarios obtenidos exitosamente'
            }
        except Exception as e:
            return {
                'success': False,
                'mensaje': f'Error al obtener usuarios: {str(e)}'
            }
    
    @staticmethod
    def obtener_por_id(id_estado):
        try:
            estado = Estado.query.get(id_estado)
            if not estado:
                return {
                    "success":False,
                    "mensaje":"Estado no encotrado"
                }
            return {
                "success":True,
                "data":estado.to_dict(),
                "mensaje":"Estado obtenido con exito"
            }
        except Exception as e:
            return{
                "success":False,
                "mensaje":f"Error al obtener usuario: {str(e)}"
            }

        

    @staticmethod
    def crear_estado(data):
        try:
            campos_requeridos = ['nombre_estado']
            for campo in campos_requeridos:
                if not data.get(campo):
                    return {
                        'success': False,
                        'mensaje': f'El campo {campo} es requerido'
                    }
            
            estado_existente = Estado.query.filter_by(nombre_estado=data['nombre_estado']).first()
            if estado_existente:
                return {
                    'success': False,
                    'mensaje': 'El nombre de estado ya está registrado'
                }
            
            nuevo_estado = Estado(
                nombre_estado=data['nombre_estado']
            )
            
            db.session.add(nuevo_estado)
            db.session.commit()
            
            return {
                'success': True,
                'data': nuevo_estado.to_dict(),
                'mensaje': 'Estado creado exitosamente'
            }
            
        except Exception as e:
            db.session.rollback()
            return {
                'success': False,
                'mensaje': f'Error al crear usuario: {str(e)}'
            }
    
    @staticmethod
    def eliminar_estado(data):
        try:
            if not data:
                return {
                    "success":False,
                    "mensaje":"Datos no enviados"
                }
            estado = Estado.query.get(data["id_estado"])
            if not estado:
                return {
                    "success":False,
                    "mensaje":"Estado no encotrado"
                }
            db.session.delete(estado)
            db.session.commit()
            return {
                "success":True,
                "mensaje":"Eliminacion exitosa"
            }
        except Exception as e:
            db.session.rollback()
            return {
                "success":False,
                "mensaje":f"Error al eliminar estado: {str(e)}"
            }
        

        
        






