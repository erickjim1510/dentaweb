from models.sexo import Sexo
from db import db

class SexoController:

    @staticmethod
    def obtener_todos():
        try:
            sexos = Sexo.query.all()
            return {
                "success": True,
                "data": [sexo.to_dict() for sexo in sexos],
                "mensaje": "Sexos obtenidos exitosamente"
            }
        except Exception as e:
            return {
                "success": False,
                "mensaje": f"Error al obtener sexos: {str(e)}"
            }

    @staticmethod
    def obtener_por_id(id_sexo):
        try:
            sexo = Sexo.query.get(id_sexo)
            if not sexo:
                return {
                    "success": False,
                    "mensaje": "Sexo no encontrado"
                }
            return {
                "success": True,
                "data": sexo.to_dict(),
                "mensaje": "Sexo obtenido con éxito"
            }
        except Exception as e:
            return {
                "success": False,
                "mensaje": f"Error al obtener sexo: {str(e)}"
            }

    @staticmethod
    def crear_sexo(data):
        try:
            if not data or not data.get("nombre_sexo"):
                return {
                    "success": False,
                    "mensaje": "El campo nombre_sexo es requerido"
                }

            sexo_existente = Sexo.query.filter_by(nombre_sexo=data["nombre_sexo"]).first()
            if sexo_existente:
                return {
                    "success": False,
                    "mensaje": "Nombre de sexo ya existente"
                }

            nuevo_sexo = Sexo(nombre_sexo=data["nombre_sexo"])
            db.session.add(nuevo_sexo)
            db.session.commit()
            return {
                "success": True,
                "data": nuevo_sexo.to_dict(),
                "mensaje": "Sexo creado exitosamente"
            }
        except Exception as e:
            db.session.rollback()
            return {
                "success": False,
                "mensaje": f"Error al crear sexo: {str(e)}"
            }

    @staticmethod
    def actualizar_sexo(data):
        try:
            if not data or not data.get("id_sexo"):
                return {
                    "success": False,
                    "mensaje": "ID de sexo no enviado"
                }
            
            sexo = Sexo.query.get(data["id_sexo"])
            if not sexo:
                return {
                    "success": False,
                    "mensaje": "Sexo no encontrado"
                }

            if "nombre_sexo" in data:
                sexo_existente = Sexo.query.filter_by(nombre_sexo=data["nombre_sexo"]).first()
                if sexo_existente and sexo_existente.id_sexo != sexo.id_sexo:
                    return {
                        "success": False,
                        "mensaje": "Nombre de sexo ya existente"
                    }
                sexo.nombre_sexo = data["nombre_sexo"]

            db.session.commit()
            return {
                "success": True,
                "data": sexo.to_dict(),
                "mensaje": "Sexo actualizado exitosamente"
            }
        except Exception as e:
            db.session.rollback()
            return {
                "success": False,
                "mensaje": f"Error al actualizar sexo: {str(e)}"
            }

    @staticmethod
    def eliminar_sexo(data):
        try:
            if not data or not data.get("id_sexo"):
                return {
                    "success": False,
                    "mensaje": "ID de sexo no enviado"
                }

            sexo = Sexo.query.get(data["id_sexo"])
            if not sexo:
                return {
                    "success": False,
                    "mensaje": "Sexo no encontrado"
                }

            db.session.delete(sexo)
            db.session.commit()
            return {
                "success": True,
                "mensaje": "Sexo eliminado exitosamente"
            }
        except Exception as e:
            db.session.rollback()
            return {
                "success": False,
                "mensaje": f"Error al eliminar sexo: {str(e)}"
            }
