from flask import Blueprint, request, jsonify
from controllers.expediente_controller import ExpedienteController

expediente_bp = Blueprint('expediente', __name__)

# Obtener expedienbte por ID
@expediente_bp.route('/expedientes/<int:id_paciente>', methods=['GET'])
def obtener_expediente(id_paciente):
    resultado = ExpedienteController.obtener_por_id(id_paciente)
    status_code = 200 if resultado['success'] else 404
    return jsonify(resultado), status_code

# Crear expediente
@expediente_bp.route('/expedientes', methods=['POST'])
def crear_expediente():
    data = request.get_json()
    if not data:
        return jsonify({'success': False, 'mensaje': 'No se enviaron datos'}), 400
        
    resultado = ExpedienteController.crear_expediente(data)
    status_code = 201 if resultado['success'] else 400
    return jsonify(resultado), status_code

# Actualizar expediente
@expediente_bp.route('/expedientes/<int:id_paciente>', methods=['PUT'])
def actualizar_expediente(id_paciente):
    data = request.get_json()
    if not data:
        return jsonify({'success': False, 'mensaje': 'No se enviaron datos'}), 400
        
    data['id_paciente'] = id_paciente
    resultado = ExpedienteController.actualizar_expediente(data)
    status_code = 200 if resultado['success'] else 400
    return jsonify(resultado), status_code

