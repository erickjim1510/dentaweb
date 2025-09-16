from flask import Blueprint, request, jsonify
from controllers.paciente_controller import PacienteController

paciente_bp = Blueprint("paciente", __name__)

@paciente_bp.route("/pacientes")
def obtener_todos():
    resultado = PacienteController.obtener_todos()
    status_code = 200 if resultado["success"] else 400
    return jsonify(resultado), status_code

@paciente_bp.route("/pacientes/<int:id_paciente>")
def obtener_paciente_por_id(id_paciente):
    resultado = PacienteController.obtener_por_id(id_paciente)
    status_code = 200 if resultado["success"] else 400
    return jsonify(resultado), status_code

@paciente_bp.route("/pacientes", methods=["POST"])
def crear_paciente():
    data = request.get_json()
    if not data:
        return jsonify({"success": False, "mensaje": "Datos no enviados"}), 400

    resultado = PacienteController.crear_paciente(data)
    status_code = 201 if resultado["success"] else 400
    return jsonify(resultado), status_code

@paciente_bp.route("/pacientes", methods=["PUT"])
def actualizar_paciente():
    data = request.get_json()
    if not data:
        return jsonify({"success": False, "mensaje": "Datos no enviados"}), 400

    resultado = PacienteController.actualizar_paciente(data)
    status_code = 200 if resultado["success"] else 400
    return jsonify(resultado), status_code

@paciente_bp.route("/pacientes", methods=["DELETE"])
def eliminar_paciente():
    try:
        data = request.get_json()
        resultado = PacienteController.eliminar_paciente(data)
        status_code = 200 if resultado["success"] else 400
        return jsonify(resultado), status_code
    except Exception as e:
        return jsonify({
            "success": False,
            "mensaje": f"Error al procesar petición: {str(e)}"
        }), 500
