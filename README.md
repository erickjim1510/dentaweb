# dentaweb

Proyecto de Ingenieria de Software: Pagina web para Odontologo - Equipo 4

---
### Para correr (windows):

##### Backend:
- cd Server
- py -m venv .venv  **# solo la primera vez**
- source .venv\\\\Scripts\\\\activate  **# cada vez que se use**
- py -m pip install -r requirements.txt  **# solo la primera vez**
- py app.py

^Hay que configurar un archivo .env que tenga el siguiente atributo (ejemplo):
DATABASE_URL=mysql+pymysql://root:123456@localhost:3306/bd_sd
^Nuestro esquema debe tener los siguientes insert:
INSERT INTO Roles (nombre_rol) VALUES ('Administrador'), ('Recepcionista'), ('Doctor'), ('Paciente');
INSERT INTO Sexos (nombre_sexo) VALUES ('Masculino'), ('Femenino'), ('Otro');
INSERT INTO Estados (nombre_estado) VALUES ('Activo'), ('Inactivo');
^Correr el programa una vez antes de los insert para que SQLAlchemy cree las tablas automáticamente.
##### Frontend:
- cd Client
- npm i  **# solo la primera vez**
- npm start

---


TODO:
* Añadir un script que inicie el backend y el frontend al mismo tiempo, si se puede, que el script maneje los sockets.
* NO BORRAR CACHE
* Pantalla de edición de usuarios | Permite modificar la fecha de nacimiento (?)
* Text Box | Sugerencia, que las letras se puedan ver de manera más clara
* Roles | Sugerencia solo usuarios con roles de Recepcionista y Doctor pueden gestionar pacientes
* Pantalla de pacientes | En el buscador NO se deben de ingresar números y caracteres especiales
* Pantalla de usuarios | En el buscador NO se deben de ingresar números y caracteres especiales

Dudas:
* Campo de email | Duda, se puede cualquier dominio o solo los generales (Gmail, Outlook, etc) o (@personalizado.com)
