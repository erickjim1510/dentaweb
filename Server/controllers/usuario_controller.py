from models.usuario import Usuario, db
from models.rol import Rol
from models.estado import Estado
from utils.auth import generar_token
from datetime import date

class UsuarioController:

    @staticmethod
    def obtener_todos():
        try:
            # Usar joinedload para cargar las relaciones de una vez
            usuarios = Usuario.query.join(Rol).join(Estado).all()
            return {
                'success': True,
                'data': [usuario.to_dict(exclude_password=True) for usuario in usuarios],
                'mensaje': 'Usuarios obtenidos exitosamente'
            }
        except Exception as e:
            return {
                'success': False,
                'mensaje': f'Error al obtener usuarios: {str(e)}'
            }

    @staticmethod
    def obtener_por_id(id_usuario):
        try:
            usuario = Usuario.query.join(Rol).join(Estado).filter(Usuario.id_usuario == id_usuario).first()
            if not usuario:
                return {
                    'success': False,
                    'mensaje': 'Usuario no encontrado'
                }
            return {
                'success': True,
                'data': usuario.to_dict(exclude_password=True),
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
                "id_rol", "id_estado", "primer_nombre", "apellido_paterno",
                "apellido_materno", "fecha_nacimiento", "nombre_usuario",
                "contrasena_hash", "telefono", "email"
            ]
            for campo in campos_requeridos:
                if not data.get(campo):
                    return {'success': False, 'mensaje': f'El campo {campo} es requerido'}

            # Verificar que el rol existe
            rol = Rol.query.get(data['id_rol'])
            if not rol:
                return {'success': False, 'mensaje': 'El rol seleccionado no existe'}
            
            # Verificar que el estado existe
            estado = Estado.query.get(data['id_estado'])
            if not estado:
                return {'success': False, 'mensaje': 'El estado seleccionado no existe'}

            # Verificar unicidad
            if Usuario.query.filter_by(nombre_usuario=data['nombre_usuario']).first():
                return {'success': False, 'mensaje': 'El nombre de usuario ya está registrado'}
            if Usuario.query.filter_by(email=data['email']).first():
                return {'success': False, 'mensaje': 'El email ya está en uso'}

            nuevo_usuario = Usuario(
                id_rol=data["id_rol"],
                id_estado=data["id_estado"],
                primer_nombre=data["primer_nombre"],
                segundo_nombre=data.get("segundo_nombre"),
                apellido_paterno=data["apellido_paterno"],
                apellido_materno=data["apellido_materno"],
                fecha_nacimiento=data["fecha_nacimiento"],
                nombre_usuario=data["nombre_usuario"],
                contrasena_hash=data["contrasena_hash"],
                telefono=data["telefono"],
                email=data["email"],
                fecha_registro=date.today()  # Fecha automática
            )

            db.session.add(nuevo_usuario)
            db.session.commit()

            # Obtener el usuario recién creado con las relaciones
            usuario_creado = Usuario.query.join(Rol).join(Estado).filter(Usuario.id_usuario == nuevo_usuario.id_usuario).first()

            return {
                'success': True,
                'data': usuario_creado.to_dict(exclude_password=True),
                'mensaje': 'Usuario creado exitosamente'
            }

        except Exception as e:
            db.session.rollback()
            return {'success': False, 'mensaje': f'Error al crear usuario: {str(e)}'}

    @staticmethod
    def actualizar_usuario(data):
        try:
            id_usuario = data.get('id_usuario')
            if not id_usuario:
                return {'success': False, 'mensaje': 'Se requiere el id_usuario en el JSON'}

            usuario = Usuario.query.get(id_usuario)
            if not usuario:
                return {'success': False, 'mensaje': 'Usuario no encontrado'}

            # Verificar que el rol existe si se está actualizando
            if 'id_rol' in data:
                rol = Rol.query.get(data['id_rol'])
                if not rol:
                    return {'success': False, 'mensaje': 'El rol seleccionado no existe'}
            
            # Verificar que el estado existe si se está actualizando
            if 'id_estado' in data:
                estado = Estado.query.get(data['id_estado'])
                if not estado:
                    return {'success': False, 'mensaje': 'El estado seleccionado no existe'}

            # Validaciones de unicidad
            if 'email' in data and data['email'] != usuario.email:
                if Usuario.query.filter(Usuario.email == data['email'], Usuario.id_usuario != id_usuario).first():
                    return {'success': False, 'mensaje': 'El email ya está en uso por otro usuario'}
            if 'nombre_usuario' in data and data['nombre_usuario'] != usuario.nombre_usuario:
                if Usuario.query.filter(Usuario.nombre_usuario == data['nombre_usuario'], Usuario.id_usuario != id_usuario).first():
                    return {'success': False, 'mensaje': 'El nombre de usuario ya está en uso'}

            # Campos editables
            campos_editables = [
                "primer_nombre", "segundo_nombre", "apellido_paterno", "apellido_materno",
                "email", "contrasena_hash", "id_rol", "id_estado", "nombre_usuario",
                "telefono", "fecha_nacimiento"
            ]
            for campo in campos_editables:
                if campo in data:
                    setattr(usuario, campo, data[campo])

            db.session.commit()

            # Obtener el usuario actualizado con las relaciones
            usuario_actualizado = Usuario.query.join(Rol).join(Estado).filter(Usuario.id_usuario == id_usuario).first()

            return {
                'success': True,
                'data': usuario_actualizado.to_dict(exclude_password=True),
                'mensaje': 'Usuario actualizado exitosamente'
            }

        except Exception as e:
            db.session.rollback()
            return {'success': False, 'mensaje': f'Error al actualizar usuario: {str(e)}'}

    @staticmethod
    def eliminar_usuario(data):
        try:
            id_usuario = data.get('id_usuario')
            if not id_usuario:
                return {'success': False, 'mensaje': 'Se requiere el id_usuario en el JSON'}

            usuario = Usuario.query.get(id_usuario)
            if not usuario:
                return {'success': False, 'mensaje': 'Usuario no encontrado'}

            db.session.delete(usuario)
            db.session.commit()

            return {'success': True, 'mensaje': 'Usuario eliminado exitosamente'}

        except Exception as e:
            db.session.rollback()
            return {'success': False, 'mensaje': f'Error al eliminar usuario: {str(e)}'}

    @staticmethod
    def login(email, contrasena_hash):
        try:
            usuario = Usuario.query.join(Rol).join(Estado).filter(Usuario.email == email).first()
            if not usuario:
                return {'success': False, 'mensaje': 'Usuario no encontrado'}

            if not usuario.verificar_password(contrasena_hash):
                return {'success': False, 'mensaje': 'Contraseña incorrecta'}

            token = generar_token()

            return {
                'success': True,
                'data': {**usuario.to_dict(exclude_password=True), 'token': token},
                'mensaje': 'Login exitoso'
            }

        except Exception as e:
            return {'success': False, 'mensaje': f'Error en login: {str(e)}'}