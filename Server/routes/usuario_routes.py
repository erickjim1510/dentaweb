from flask import Blueprint, request, jsonify
from controllers.usuario_controller import UsuarioController

usuario_bp = Blueprint('usuario', __name__)

# Obtener todos los usuarios
@usuario_bp.route('/usuarios', methods=['GET'])
def obtener_usuarios():
    resultado = UsuarioController.obtener_todos()
    status_code = 200 if resultado['success'] else 500
    return jsonify(resultado), status_code

# Obtener usuario por ID
@usuario_bp.route('/usuarios/<int:id_usuario>', methods=['GET'])
def obtener_usuario(id_usuario):
    resultado = UsuarioController.obtener_por_id(id_usuario)
    status_code = 200 if resultado['success'] else 404
    return jsonify(resultado), status_code

# Crear usuario
@usuario_bp.route('/usuarios', methods=['POST'])
def crear_usuario():
    data = request.get_json()
    if not data:
        return jsonify({'success': False, 'mensaje': 'No se enviaron datos'}), 400
    
    resultado = UsuarioController.crear_usuario(data)
    status_code = 201 if resultado['success'] else 400
    return jsonify(resultado), status_code

# Actualizar usuario
@usuario_bp.route('/usuarios', methods=['PUT'])
def actualizar_usuario():
    data = request.get_json()
    if not data:
        return jsonify({'success': False, 'mensaje': 'No se enviaron datos'}), 400
    
    resultado = UsuarioController.actualizar_usuario(id_usuario, data)
    status_code = 200 if resultado['success'] else 400
    return jsonify(resultado), status_code

# Eliminar usuario
@usuario_bp.route('/usuarios', methods=['DELETE'])
def eliminar_usuario():
    data = request.get_json()
    if not data:
        return jsonify({'success': False, 'mensaje': 'No se enviaron datos'}), 400
    resultado = UsuarioController.eliminar_usuario(data)
    status_code = 200 if resultado['success'] else 404
    return jsonify(resultado), status_code

# Login
@usuario_bp.route('/usuarios/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({'success': False, 'mensaje': 'No se enviaron datos'}), 400
    
    email = data.get('email')
    contrasena_hash = data.get('contrasena_hash')
    
    if not email or not contrasena_hash:
        return jsonify({'success': False, 'mensaje': 'Email y Contraseña son requeridos'}), 400
    
    resultado = UsuarioController.login(email, contrasena_hash)
    
    if resultado['success']:
        return jsonify(resultado['data']), 200
    else:
        return jsonify({'mensaje': resultado['mensaje']}), 401
