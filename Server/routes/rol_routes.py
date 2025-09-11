from flask import Blueprint, request, jsonify
from controllers.rol_controller import RolController

rol_bp = Blueprint("rol", __name__)

@rol_bp.route("/roles", methods=["POST"])
def crear_rol():
    data = request.get_json()
    resultado = RolController.crear_rol(data)
    status_code = 200 if resultado["success"] else 400
    return jsonify(resultado), status_code

