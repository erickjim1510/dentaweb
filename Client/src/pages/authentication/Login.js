import React, { useEffect, useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./auth.css";
import logo from '../../assets/bodyfondos/Logo.png';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';
import api from '../../services/api.js';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [contrasena_hash, setContrasena_hash] = useState('');
    const { authlogin } = useContext(AuthContext);
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        document.body.style.backgroundColor = '#f7f6f2';
        document.body.style.backgroundImage = 'none';
    }, []);

    const loginAction = async (e) => {
        e.preventDefault();

        await api
            .post("/usuarios/login", { Usuario: email, Password: contrasena_hash })
            .then((r) => {
                if (r && r.data) {
                    console.log('Datos recibidos del servidor:', r.data);
                    
                    authlogin(r.data);
                    
                    if (r.data.token) {
                        sessionStorage.setItem("token", r.data.token);
                    }
                    
                    navigate('/dashboard');
                     window.location.reload(false);
                } else {
                    setValidationErrors({ message: "Error de conexión con el Servidor" });
                }
            })
            .catch((e) => {
                let errormessage = {};
                if (e.response === undefined) {
                    errormessage = { message: e.message };
                } else {
                    errormessage = { message: e.response.data.mensaje };
                }
                setValidationErrors(errormessage);
            });
    };

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={loginAction}>
                <div className="Auth-form-content">
                    <div className="text-center mb-4">
                        <img src={logo} alt="logo" className="login-logo" />
                    </div>

                    {validationErrors.message && (
                        <div className="alert alert-danger" role="alert">
                            {validationErrors.message}
                        </div>
                    )}

                    <div className="form-group mt-3">
                        <label>Correo Electrónico:</label>
                        <input
                            id="email"
                            name="email"
                            type="email"  
                            className="form-control mt-1"
                            placeholder="Ingresa Correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group mt-3">
                        <label>Contraseña:</label>
                        <input
                            id="contrasena_hash"
                            name="contrasena_hash"
                            type="password"  
                            className="form-control mt-1"
                            placeholder="Ingresa Contraseña"
                            value={contrasena_hash}
                            onChange={(e) => setContrasena_hash(e.target.value)}
                        />
                    </div>

                    <div className="d-grid gap-2 mt-4">
                        <button type="submit" className="btn-login">
                            Acceder
                        </button>
                    </div>

                    <p className="signup-text">
                        ¿No tienes cuenta?
                        <span className="signup-btn">Registrarse</span>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
