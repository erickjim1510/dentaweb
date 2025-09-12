## Pasos para crear entorno virtual

Tener instalado python y pip en tu equipo.
Abrir una terminal en la ruta actual `/dentaweb/Server` .
Ejecutar el siguiente comando:

```cmd
python -m venv venv
```

> Solo se necesita crear el entorno virtual una sola vez.

## Activar el entorno virtual

Desde la terminal en la ruta actual `/dentaweb/Server` ejecutar el siguiente comando:

```cmd
venv\scripts\activate
```

## Descargar las dependencias

Desde la terminal en la ruta `/dentaweb/Server` y con el entorno virtual activado ejecutar el siguiente comando:

```cmd
pip install -r requirements.txt
```

> Solo se necesita descargar las dependencias una sola vez.
## Ejecutar el servidor

Desde la terminal en la ruta `/dentaweb/Server` y con el entorno virtual activado ejecutar el siguiente comando:

```cmd
python app.py
```


