from flask import Blueprint, request, jsonify
from controllers.paciente_controller import PacienteController

paciente_bp = Blueprint('paciente', __name__)

@paciente_bp.route('/pacientes/buscar', methods=['GET'])
def buscar_pacientes():
    termino = request.args.get('q', '')
    resultado = PacienteController.buscar_pacientes(termino)
    status_code = 200 if resultado['success'] else 500
    return jsonify(resultado), status_code

@paciente_bp.route('/pacientes', methods=['GET'])
def obtener_pacientes():
    resultado = PacienteController.obtener_todos()
    status_code = 200 if resultado['success'] else 500
    return jsonify(resultado), status_code

@paciente_bp.route('/pacientes/<int:id_paciente>', methods=['GET'])
def obtener_paciente(id_paciente):
    resultado = PacienteController.obtener_por_id(id_paciente)
    status_code = 200 if resultado['success'] else 404
    return jsonify(resultado), status_code

@paciente_bp.route('/pacientes', methods=['POST'])
def crear_paciente():
    data = request.get_json()
    if not data:
        return jsonify({'success': False, 'mensaje': 'No se enviaron datos'}), 400
        
    resultado = PacienteController.crear_paciente(data)
    status_code = 201 if resultado['success'] else 400
    return jsonify(resultado), status_code

@paciente_bp.route('/pacientes/<int:id_paciente>', methods=['PUT'])
def actualizar_paciente(id_paciente):
    data = request.get_json()
    if not data:
        return jsonify({'success': False, 'mensaje': 'No se enviaron datos'}), 400
        
    data['id_paciente'] = id_paciente
    resultado = PacienteController.actualizar_paciente(data)
    status_code = 200 if resultado['success'] else 400
    return jsonify(resultado), status_code

@paciente_bp.route('/pacientes', methods=['DELETE'])
def eliminar_paciente():
    data = request.get_json()
    if not data:
        return jsonify({'success': False, 'mensaje': 'No se enviaron datos'}), 400
    
    resultado = PacienteController.eliminar_paciente(data)
    status_code = 200 if resultado['success'] else 404
    return jsonify(resultado), status_code