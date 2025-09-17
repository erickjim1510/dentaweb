from flask import Blueprint, request, jsonify
from controllers.sexo_controller import SexoController

sexo_bp = Blueprint("sexos", __name__)

@sexo_bp.route("/sexos")
def obtener_sexos():
    resultado = SexoController.obtener_todos()
    status_code = 200 if resultado["success"] else 400
    return jsonify(resultado), status_code

@sexo_bp.route("/sexos/<int:id_sexo>")
def obtener_sexo_por_id(id_sexo):
    resultado = SexoController.obtener_por_id(id_sexo)
    status_code = 200 if resultado["success"] else 400
    return jsonify(resultado), status_code

@sexo_bp.route("/sexos", methods=["POST"])
def crear_sexo():
    data = request.get_json()
    if not data:
        return jsonify({"success": False, "mensaje": "Datos no enviados"}), 400

    resultado = SexoController.crear_sexo(data)
    status_code = 201 if resultado["success"] else 400
    return jsonify(resultado), status_code

@sexo_bp.route("/sexos", methods=["PUT"])
def actualizar_sexo():
    data = request.get_json()
    if not data:
        return jsonify({"success": False, "mensaje": "Datos no enviados"}), 400

    resultado = SexoController.actualizar_sexo(data)
    status_code = 200 if resultado["success"] else 400
    return jsonify(resultado), status_code

@sexo_bp.route("/sexos", methods=["DELETE"])
def eliminar_sexo():
    try:
        data = request.get_json()
        resultado = SexoController.eliminar_sexo(data)
        status_code = 200 if resultado["success"] else 400
        return jsonify(resultado), status_code
    except Exception as e:
        return jsonify({
            "success": False,
            "mensaje": f"Error al procesar petición: {str(e)}"
        }), 500
