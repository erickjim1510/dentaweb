from models.sexo import Sexo, db

class SexoController:
     
     @staticmethod
     def obtener_todos():
          try:
               sexos = Sexo.query.all()
               return {
                    "success": True,
                    "data": [sexo.to_dict() for sexo in sexos],
                    "mensaje": "Sexos obtenidos con exito"
               }
          except Exception as e:
               return {
                    "success": False,
                    "mensaje": f"Error al obtener sexos: {str(e)}"
               }
    
     @staticmethod
     def crear_sexo(data):
          try:
               campos_requeridos = ["nombre_sexo"]
               for campo in campos_requeridos:
                    if not data.get(campo):
                         return {
                              "success": False,
                              "mensaje": f"Se requiere el campo: {campo}"
                         }
                    sexo_existente = Sexo.query.filter_by(nombre_sexo=data["nombre_sexo"]).first()
                    if sexo_existente:
                         return {
                              "success": False,
                              "mensaje": "Nombre sexo ya registrado"
                         }
                    sexo_nuevo = Sexo(
                         nombre_sexo = data["nombre_sexo"]
                    )
                    db.session.add(sexo_nuevo)
                    db.session.commit()
                    return {
                         "success": True,
                         "data": sexo_nuevo.to_dict(),
                         "mensaje": "Sexo creado con exito"
                    }
          except Exception as e:
               return {
                    "success": False,
                    "mensaje": f"Error al crear usuario: {str(e)}"
               }
          
