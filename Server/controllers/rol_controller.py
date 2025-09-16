from models.rol import Rol
from db import db

class RolController:

    @staticmethod
    def obtener_todos():
        try:
            roles = Rol.query.all()
            return {
                "success": True,
                "data": [rol.to_dict() for rol in roles],
                "mensaje": "Roles obtenidos exitosamente"
            }
        except Exception as e:
            return {
                "success": False,
                "mensaje": f"Error al obtener roles: {str(e)}"
            }

    @staticmethod
    def obtener_por_id(id_rol):
        try:
            rol = Rol.query.get(id_rol)
            if not rol:
                return {
                    "success": False,
                    "mensaje": "Rol no encontrado"
                }
            return {
                "success": True,
                "data": rol.to_dict(),
                "mensaje": "Rol obtenido con éxito"
            }
        except Exception as e:
            return {
                "success": False,
                "mensaje": f"Error al obtener rol: {str(e)}"
            }

    @staticmethod
    def crear_rol(data):
        try:
            if not data or not data.get("nombre_rol"):
                return {
                    "success": False,
                    "mensaje": "El campo nombre_rol es requerido"
                }

            rol_existente = Rol.query.filter_by(nombre_rol=data["nombre_rol"]).first()
            if rol_existente:
                return {
                    "success": False,
                    "mensaje": "Nombre de rol ya existente"
                }

            nuevo_rol = Rol(nombre_rol=data["nombre_rol"])
            db.session.add(nuevo_rol)
            db.session.commit()
            return {
                "success": True,
                "data": nuevo_rol.to_dict(),
                "mensaje": "Rol creado exitosamente"
            }
        except Exception as e:
            db.session.rollback()
            return {
                "success": False,
                "mensaje": f"Error al crear rol: {str(e)}"
            }

    @staticmethod
    def actualizar_rol(data):
        try:
            if not data or not data.get("id_rol"):
                return {
                    "success": False,
                    "mensaje": "ID de rol no enviado"
                }
            
            rol = Rol.query.get(data["id_rol"])
            if not rol:
                return {
                    "success": False,
                    "mensaje": "Rol no encontrado"
                }

            if "nombre_rol" in data:
                rol_existente = Rol.query.filter_by(nombre_rol=data["nombre_rol"]).first()
                if rol_existente and rol_existente.id_rol != rol.id_rol:
                    return {
                        "success": False,
                        "mensaje": "Nombre de rol ya existente"
                    }
                rol.nombre_rol = data["nombre_rol"]

            db.session.commit()
            return {
                "success": True,
                "data": rol.to_dict(),
                "mensaje": "Rol actualizado exitosamente"
            }
        except Exception as e:
            db.session.rollback()
            return {
                "success": False,
                "mensaje": f"Error al actualizar rol: {str(e)}"
            }

    @staticmethod
    def eliminar_rol(data):
        try:
            if not data or not data.get("id_rol"):
                return {
                    "success": False,
                    "mensaje": "ID de rol no enviado"
                }

            rol = Rol.query.get(data["id_rol"])
            if not rol:
                return {
                    "success": False,
                    "mensaje": "Rol no encontrado"
                }

            db.session.delete(rol)
            db.session.commit()
            return {
                "success": True,
                "mensaje": "Rol eliminado exitosamente"
            }
        except Exception as e:
            db.session.rollback()
            return {
                "success": False,
                "mensaje": f"Error al eliminar rol: {str(e)}"
            }
