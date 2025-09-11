from flask import Blueprint, request, jsonify
from controllers.sexo_controller import SexoController

sexo_bp = Blueprint("sexos", __name__)

@sexo_bp.route("/sexos")
def obtener_sexos():
    resultado = SexoController.obtener_todos()
    status_code = 200 if resultado["success"] else 400
    return jsonify(resultado), status_code

@sexo_bp.route("/sexos", methods=["POST"])
def crear_sexo():
    data = request.get_json()
    if not data:
        return {
            "success":False,
            "mensaje": "Datos no enviados"
        }, 400
    resultado = SexoController.crear_sexo(data)
    status_code = 200 if resultado["success"] else 400
    return jsonify(resultado), status_code