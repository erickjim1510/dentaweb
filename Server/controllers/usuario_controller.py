from models.usuario import Usuario, db
from utils.auth import generar_token
from flask import jsonify

class UsuarioController:
    
    @staticmethod
    def obtener_todos():
        try:
            usuarios = Usuario.query.all()
            return {
                'success': True,
                'data': [usuario.to_dict() for usuario in usuarios],
                'mensaje': 'Usuarios obtenidos exitosamente'
            }
        except Exception as e:
            return {
                'success': False,
                'mensaje': f'Error al obtener usuarios: {str(e)}'
            }
    
    @staticmethod
    def obtener_por_id(idusuario):
        try:
            usuario = Usuario.query.get(idusuario)
            if not usuario:
                return {
                    'success': False,
                    'mensaje': 'Usuario no encontrado'
                }
            
            return {
                'success': True,
                'data': usuario.to_dict(),
                'mensaje': 'Usuario encontrado'
            }
        except Exception as e:
            return {
                'success': False,
                'mensaje': f'Error al obtener usuario: {str(e)}'
            }
    
    @staticmethod
    def crear_usuario(data):
        try:
            campos_requeridos = [
            "id_rol",
            "id_estado",
            "primer_nombre",
            "segundo_nombre",
            "apellido_paterno",
            "apellido_materno",
            "fecha_nacimiento",
            "nombre_usuario",
            "contrasena_hash",
            "telefono",
            "email",
            "fecha_registro"]
            for campo in campos_requeridos:
                if not data.get(campo):
                    return {
                        'success': False,
                        'mensaje': f'El campo {campo} es requerido'
                    }
            
            usuario_existente = Usuario.query.filter_by(nombre_usuario=data['nombre_usuario']).first()
            if usuario_existente:
                return {
                    'success': False,
                    'mensaje': 'El nombre de usuario ya está registrado'
                }
            
            nuevo_usuario = Usuario(
                id_rol=data["id_rol"],
                id_estado=data["id_estado"],
                primer_nombre=data["primer_nombre"],
                segundo_nombre=data["segundo_nombre"],
                apellido_paterno=data["apellido_paterno"],
                apellido_materno=data["apellido_materno"],
                fecha_nacimiento=data["fecha_nacimiento"],
                nombre_usuario=data["nombre_usuario"],
                contrasena_hash=data["contrasena_hash"],
                telefono=data["telefono"],
                email=data["email"],
                fecha_registro=data["fecha_registro"],
            )
            
            db.session.add(nuevo_usuario)
            db.session.commit()
            
            return {
                'success': True,
                'data': nuevo_usuario.to_dict(),
                'mensaje': 'Usuario creado exitosamente'
            }
            
        except Exception as e:
            db.session.rollback()
            return {
                'success': False,
                'mensaje': f'Error al crear usuario: {str(e)}'
            }
    
    @staticmethod
    def actualizar_usuario(idusuario, data):
        try:
            usuario = Usuario.query.get(idusuario)
            if not usuario:
                return {
                    'success': False,
                    'mensaje': 'Usuario no encontrado'
                }
            
            if 'nombre' in data:
                usuario.nombre = data['nombre']
            if 'apellido' in data:
                usuario.apellido = data['apellido']
            if 'email' in data:
                usuario_existente = Usuario.query.filter(
                    Usuario.email == data['email'],
                    Usuario.idusuario != idusuario
                ).first()
                if usuario_existente:
                    return {
                        'success': False,
                        'mensaje': 'El email ya está en uso por otro usuario'
                    }
                usuario.email = data['email']
            if 'password' in data:
                usuario.password = data['password']
            if 'idestatus' in data:
                usuario.idestatus = data['idestatus']
            
            db.session.commit()
            
            return {
                'success': True,
                'data': usuario.to_dict(),
                'mensaje': 'Usuario actualizado exitosamente'
            }
            
        except Exception as e:
            db.session.rollback()
            return {
                'success': False,
                'mensaje': f'Error al actualizar usuario: {str(e)}'
            }
    
    @staticmethod
    def eliminar_usuario(idusuario):
        try:
            usuario = Usuario.query.get(idusuario)
            if not usuario:
                return {
                    'success': False,
                    'mensaje': 'Usuario no encontrado'
                }
            
            db.session.delete(usuario)
            db.session.commit()
            
            return {
                'success': True,
                'mensaje': 'Usuario eliminado exitosamente'
            }
            
        except Exception as e:
            db.session.rollback()
            return {
                'success': False,
                'mensaje': f'Error al eliminar usuario: {str(e)}'
            }
    
    @staticmethod
    def login(email, contrasena_hash):
        try:
            usuario = Usuario.query.filter_by(email=email).first()
            
            if not usuario:
                return {
                    'success': False,
                    'mensaje': 'Usuario no encontrado'
                }
            
            if not usuario.verificar_password(contrasena_hash):
                return {
                    'success': False,
                    'mensaje': 'Contraseña incorrecta'
                }
            
            token = generar_token()
            
            return {
                'success': True,
                'data': {
                    **usuario.to_dict(),
                    'token': token
                },
                'mensaje': 'Login exitoso'
            }
            
        except Exception as e:
            return {
                'success': False,
                'mensaje': f'Error en login: {str(e)}'
            }