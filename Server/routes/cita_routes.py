from flask import Blueprint, request, jsonify
from controllers.cita_controller import CitaController

citas_bp = Blueprint('citas', __name__, url_prefix='/citas')

@citas_bp.route('/<int:id_cita>', methods=['GET'])
def obtener_cita(id_cita):
    res = CitaController.obtener_por_id(id_cita)
    return jsonify(res), 200

@citas_bp.route('/crear', methods=['POST'])
def crear_cita():
    data = request.get_json(force=True)
    res = CitaController.crear_cita(data)
    return jsonify(res), 200

@citas_bp.route('/actualizar', methods=['PUT'])
def actualizar_cita():
    data = request.get_json(force=True)
    res = CitaController.actualizar_cita(data)
    return jsonify(res), 200

@citas_bp.route('/eliminar/<int:id_cita>', methods=['DELETE'])
def eliminar_cita(id_cita):
    res = CitaController.eliminar_cita(id_cita)
    return jsonify(res), 200

@citas_bp.route('/rango-json', methods=['POST'])
def obtener_rango_json():
    data = request.get_json()
    respuesta = CitaController.obtener_rango_json(data)
    return jsonify(respuesta), 200 if respuesta['success'] else 400

