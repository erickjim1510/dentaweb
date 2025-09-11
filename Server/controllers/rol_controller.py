from models.rol import Rol
from db import db
from flask import jsonify

class RolController:

    @staticmethod
    def crear_rol(data):
        try:
            if not data:
                return {
                    "success":False,
                    "mensaje":"Datos no enviado"
                }
            rol_existente = Rol.query.filter_by(nombre_rol=data["nombre_rol"]).first()
            if rol_existente:
                return {
                    "success":False,
                    "mensaje":"Nombre de rol ya exitente"
                }
            nuevo_rol = Rol(nombre_rol=data["nombre_rol"])
            db.session.add(nuevo_rol)
            db.session.commit()
            return{
                "success":True,
                "data":nuevo_rol.to_dict(),
                "mensaje":"Creacion exitosa"
            }
        except Exception as e:
            return {
                "success":False,
                "mensaje":f"Error al crear rol: {str(e)}"
            }
        
        