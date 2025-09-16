from flask import Blueprint, request, jsonify
from controllers.rol_controller import RolController

rol_bp = Blueprint("rol", __name__)

@rol_bp.route("/roles")
def obtener_todos():
    resultado = RolController.obtener_todos()
    status_code = 200 if resultado["success"] else 400
    return jsonify(resultado), status_code

@rol_bp.route("/roles/<int:id_rol>")
def obtener_rol_por_id(id_rol):
    resultado = RolController.obtener_por_id(id_rol)
    status_code = 200 if resultado["success"] else 400
    return jsonify(resultado), status_code

@rol_bp.route("/roles", methods=["POST"])
def crear_rol():
    data = request.get_json()
    if not data:
        return jsonify({"success": False, "mensaje": "Datos no enviados"}), 400

    resultado = RolController.crear_rol(data)
    status_code = 201 if resultado["success"] else 400
    return jsonify(resultado), status_code

@rol_bp.route("/roles", methods=["PUT"])
def actualizar_rol():
    data = request.get_json()
    if not data:
        return jsonify({"success": False, "mensaje": "Datos no enviados"}), 400

    resultado = RolController.actualizar_rol(data)
    status_code = 200 if resultado["success"] else 400
    return jsonify(resultado), status_code

@rol_bp.route("/roles", methods=["DELETE"])
def eliminar_rol():
    try:
        data = request.get_json()
        resultado = RolController.eliminar_rol(data)
        status_code = 200 if resultado["success"] else 400
        return jsonify(resultado), status_code
    except Exception as e:
        return jsonify({
            "success": False,
            "mensaje": f"Error al procesar petición: {str(e)}"
        }), 500
