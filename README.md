# dentaweb

Proyecto de Integracion y Despliegue Continuos

Trabajaremos con el proyecto “Denta Web”, un proyecto dedicado a los consultorios dentales, este tiene un manejo técnico para el administrador y recepcionista, con este la persona asignada de manejarlo puede dar de alta pacientes, doctores, demas usuarios y un gestor de citas para los pacientes, con el proposito de automatizar los procesos administrativos que se llevan en un consultorio dental.Creemos que con este proyecto lograremos desarrollar una versión funcional a lo largo del semestre y podremos aplicar los conceptos de CI/CD.

//Comit Inicial
//COMO INSTALARLO Y EJECUTARLO

### Para correr (windows):

##### Backend:

- cd Server
- py -m venv .venv **# solo la primera vez**
- source .venv\\\\Scripts\\\\activate **# cada vez que se use**
- py -m pip install -r requirements.txt **# solo la primera vez**
- py app.py

- Hay que configurar un archivo .env que tenga el siguiente atributo (ejemplo):
  DATABASE_URL=mysql+pymysql://root:123456@localhost:3306/bd_sd

- Nuestro esquema debe tener los siguientes insert:
  INSERT INTO Roles (nombre_rol) VALUES ('Administrador'), ('Recepcionista'), ('Doctor'), ('Paciente');
  INSERT INTO Sexos (nombre_sexo) VALUES ('Masculino'), ('Femenino'), ('Otro');
  INSERT INTO Estados (nombre_estado) VALUES ('Activo'), ('Inactivo');

**Correr el programa una vez antes de los insert para que SQLAlchemy cree las tablas automáticamente.**

##### Frontend:

- cd Client
- npm i **# solo la primera vez**
- npm start

---
