from flask import Blueprint, request, jsonify
from controllers.paciente_controller import PacienteController

paciente_bp = Blueprint("paciente", __name__)

@paciente_bp.route("/pacientes")
def obtener_todos():
    resultado = PacienteController.obtener_todos()
    status_code = 200 if resultado["success"] else 400
    return jsonify(resultado), status_code

@paciente_bp.route("/pacientes", methods=["POST"])
def crear_paciente():
    data = request.get_json()
    if not data:
        return {
            "success":False,
            "mensaje": "Datos no enviados"
        }
    resultado = PacienteController.crear_paciente(data)
    status_code = 200 if resultado["success"] else 400
    return jsonify(resultado), status_code