from models.estado import Estado, db

class EstadoController:

    @staticmethod
    def obtener_todos():
        try:
            estados = Estado.query.all()
            return {
                'success': True,
                'data': [estado.to_dict() for estado in estados],
                'mensaje': 'Estados obtenidos exitosamente'
            }
        except Exception as e:
            return {
                'success': False,
                'mensaje': f'Error al obtener estados: {str(e)}'
            }
    
    @staticmethod
    def obtener_por_id(id_estado):
        try:
            estado = Estado.query.get(id_estado)
            if not estado:
                return {
                    "success": False,
                    "mensaje": "Estado no encontrado"
                }
            return {
                "success": True,
                "data": estado.to_dict(),
                "mensaje": "Estado obtenido con éxito"
            }
        except Exception as e:
            return {
                "success": False,
                "mensaje": f"Error al obtener estado: {str(e)}"
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
                'mensaje': f'Error al crear estado: {str(e)}'
            }

    @staticmethod
    def actualizar_estado(data):
        try:
            if not data or not data.get("id_estado"):
                return {
                    "success": False,
                    "mensaje": "ID de estado no enviado"
                }

            estado = Estado.query.get(data["id_estado"])
            if not estado:
                return {
                    "success": False,
                    "mensaje": "Estado no encontrado"
                }

            if "nombre_estado" in data:
                estado_existente = Estado.query.filter_by(nombre_estado=data["nombre_estado"]).first()
                if estado_existente and estado_existente.id_estado != estado.id_estado:
                    return {
                        "success": False,
                        "mensaje": "El nombre de estado ya está registrado"
                    }
                estado.nombre_estado = data["nombre_estado"]

            db.session.commit()
            return {
                "success": True,
                "data": estado.to_dict(),
                "mensaje": "Estado actualizado exitosamente"
            }
        except Exception as e:
            db.session.rollback()
            return {
                "success": False,
                "mensaje": f"Error al actualizar estado: {str(e)}"
            }

    @staticmethod
    def eliminar_estado(data):
        try:
            if not data:
                return {
                    "success": False,
                    "mensaje": "Datos no enviados"
                }
            estado = Estado.query.get(data["id_estado"])
            if not estado:
                return {
                    "success": False,
                    "mensaje": "Estado no encontrado"
                }
            db.session.delete(estado)
            db.session.commit()
            return {
                "success": True,
                "mensaje": "Eliminación exitosa"
            }
        except Exception as e:
            db.session.rollback()
            return {
                "success": False,
                "mensaje": f"Error al eliminar estado: {str(e)}"
            }
