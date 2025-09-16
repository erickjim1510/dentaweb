# Documentacion apis

## Usuario

### Obtener todos los usuarios
endpoint: `http://127.0.0.1:5000/usuarios`
metodo: `GET`
respuesta:
```json
{
	"data": [
		{
			"apellido_materno": "Davila",
			"apellido_paterno": "Garcia",
			"contrasena_hash": "123",
			"email": "jesusarmandogada@gmail.com",
			"fecha_nacimiento": "2003-07-12",
			"fecha_registro": "2025-09-08",
			"id_estado": 1,
			"id_rol": 1,
			"id_usuario": 4,
			"nombre_usuario": "jesus12",
			"primer_nombre": "Jesus",
			"segundo_nombre": "Armando",
			"telefono": "8448698659"
		},
		{
			"apellido_materno": "Davila",
			"apellido_paterno": "Garcia",
			"contrasena_hash": "123",
			"email": "jesusarmandogada12@gmail.com",
			"fecha_nacimiento": "2003-07-12",
			"fecha_registro": "2025-09-08",
			"id_estado": 1,
			"id_rol": 1,
			"id_usuario": 5,
			"nombre_usuario": "jesus12",
			"primer_nombre": "Jesus",
			"segundo_nombre": "Armando",
			"telefono": "8448698659"
		},
		{
			"apellido_materno": "Davila",
			"apellido_paterno": "Garcia",
			"contrasena_hash": "123",
			"email": "jesusarmandogada@gmail.com",
			"fecha_nacimiento": "2003-07-12",
			"fecha_registro": "2025-09-08",
			"id_estado": 1,
			"id_rol": 1,
			"id_usuario": 6,
			"nombre_usuario": "jesus123",
			"primer_nombre": "Jesus",
			"segundo_nombre": "Armando",
			"telefono": "8448698659"
		}
	],
	"mensaje": "Usuarios obtenidos exitosamente",
	"success": true
}
```

### Obtener usuario por id
endpoint: `http://127.0.0.1:5000/usuarios/4`
metodo: `GET`
respuesta:
```json
{
	"data": {
		"apellido_materno": "Davila",
		"apellido_paterno": "Garcia",
		"contrasena_hash": "123",
		"email": "jesusarmandogada@gmail.com",
		"fecha_nacimiento": "2003-07-12",
		"fecha_registro": "2025-09-08",
		"id_estado": 1,
		"id_rol": 1,
		"id_usuario": 4,
		"nombre_usuario": "jesus12",
		"primer_nombre": "Jesus",
		"segundo_nombre": "Armando",
		"telefono": "8448698659"
	},
	"mensaje": "Usuario encontrado",
	"success": true
}
```

### Crear usuario
endpoint: `http://127.0.0.1:5000/usuarios`
metodo: `POST`
body: 
```json
{
		"apellido_materno": "Davila",
		"apellido_paterno": "Garcia",
		"contrasena_hash": "1324",
		"email": "jesusAABBA@gmail.com",
		"fecha_nacimiento": "2003-07-12",
		"id_estado": 1,
		"id_rol": 1,
		"id_usuario": 8,
		"nombre_usuario": "jesus22",
		"primer_nombre": "Jesus",
		"segundo_nombre": "Armando",
		"telefono": "8448698659"
	}
```
respuesta:
```json
{
	"data": {
		"apellido_materno": "Davila",
		"apellido_paterno": "Garcia",
		"email": "jesusAABBA@gmail.com",
		"fecha_nacimiento": "2003-07-12",
		"fecha_registro": "2025-09-15",
		"id_estado": 1,
		"id_rol": 1,
		"id_usuario": 9,
		"nombre_usuario": "jesus22",
		"primer_nombre": "Jesus",
		"segundo_nombre": "Armando",
		"telefono": "8448698659"
	},
	"mensaje": "Usuario creado exitosamente",
	"success": true
}
```

### Actualizar usuario
endpoint: `http://127.0.0.1:5000/usuarios`
metodo: `PUT`
body: 
```json
{
"id_usuario": 8,
"apellido_materno": "Canales"
}
```
respuesta:
```json
{
	"data": {
		"apellido_materno": "Canales",
		"apellido_paterno": "Garcia",
		"email": "jesusAAA@gmail.com",
		"fecha_nacimiento": "2003-07-12",
		"fecha_registro": "2025-09-08",
		"id_estado": 1,
		"id_rol": 1,
		"id_usuario": 8,
		"nombre_usuario": "jesus121212",
		"primer_nombre": "Jesus",
		"segundo_nombre": "Armando",
		"telefono": "8448698659"
	},
	"mensaje": "Usuario actualizado exitosamente",
	"success": true
}
```

### Eliminar usuario
endpoint: `http://127.0.0.1:5000/usuarios`
metodo: `DELETE`
body: `{"id_usuario": 8}`
respuesta:
```json
{
	"mensaje": "Usuario eliminado exitosamente",
	"success": true
}
```

### Login usuario
endpoint: `http://127.0.0.1:5000/usuarios/login`
metodo: `POST`
body:
```json
{
"email":"jesusarmandogada@gmail.com",
"contrasena_hash":"123"
}
```
respuesta:
```json
{
	"apellido_materno": "Davila",
	"apellido_paterno": "Garcia",
	"contrasena_hash": "123",
	"email": "jesusarmandogada@gmail.com",
	"fecha_nacimiento": "2003-07-12",
	"fecha_registro": "2025-09-08",
	"id_estado": 1,
	"id_rol": 1,
	"id_usuario": 4,
	"nombre_usuario": "jesus12",
	"primer_nombre": "Jesus",
	"segundo_nombre": "Armando",
	"telefono": "8448698659",
	"token": "be1150eb0321ce3771f81435be540b2da36843272acc27b1a59ab288db466a66"
}
```

