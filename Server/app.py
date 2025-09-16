from flask import Flask
from flask_cors import CORS
from config import Config
from db import db
from models.estado import Estado
from models.rol import Rol
from models.usuario import Usuario
from models.sexo import Sexo
from models.paciente import Paciente
from routes.estado_routes import estado_bp
from routes.rol_routes import rol_bp
from routes.usuario_routes import usuario_bp
from routes.sexo_routes import sexo_bp
from routes.paciente_routes import paciente_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # CORS SOLO para tu frontend
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
    db.init_app(app)
    
    app.register_blueprint(estado_bp)
    app.register_blueprint(rol_bp)
    app.register_blueprint(usuario_bp)
    app.register_blueprint(sexo_bp)
    app.register_blueprint(paciente_bp)
    
    return app  

if __name__ == "__main__":
    app = create_app()
    
    with app.app_context():
        db.create_all() 
    
    app.run(debug=True, port=5000)

    