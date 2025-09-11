from flask import Blueprint, request, jsonify
from controllers.estado_controller import EstadoController

estado_bp = Blueprint("estado", __name__)

@estado_bp.route("/estados")
def obtener_estado():
    resultado = EstadoController.obtener_todos()
    status_code = 200 if resultado["success"] else 500
    return jsonify(resultado), status_code

@estado_bp.route("/estados/<int:id_estado>")
def obtener_estado_por_id(id_estado):
    resultado = EstadoController.obtener_por_id(id_estado)
    status_code = 200 if resultado["success"] else 400
    return jsonify(resultado), status_code

@estado_bp.route("/estados", methods=["POST"])
def crear_estado():
    data = request.get_json()
    if not data:
        return jsonify({"success":False, "mensaje":"No se enviaron datos"}), 400

    resultado = EstadoController.crear_estado(data)
    status_code = 201 if resultado["success"] else 400
    return jsonify(resultado), status_code

@estado_bp.route("/estados", methods=["DELETE"])
def eliminar_estado():
    try:
        data = request.get_json()
        resultado = EstadoController.eliminar_estado(data)
        status_code = 200 if resultado["success"] else 400
        return jsonify(resultado), status_code
    except Exception as e:
        return {
            "success":False,
            "mensaje":f"Error al procesar peticion: {str(e)}"
        }
        
        
    except Exception as e:
        return {
            "success":False,
            "mensaje":f"Error al eliminar estado: {str(e)}"
        }
