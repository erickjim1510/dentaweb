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
    const { authlogin, isAuthenticated } = useContext(AuthContext);
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        document.body.style.backgroundColor = '#f7f6f2';
        document.body.style.backgroundImage = 'none';

        if (isAuthenticated) {
            navigate('/', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const loginAction = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/usuarios/login", { 
                email: email, 
                contrasena_hash: contrasena_hash 
            });

            if (response && response.data) {
                console.log('Datos recibidos del servidor:', response.data);
                
                authlogin(response.data);
                
                navigate('/dashboard', { replace: true });
            } else {
                setValidationErrors({ message: "Error de conexión con el Servidor" });
            }
        } catch (error) {
            let errormessage = {};
            if (!error.response) {
                errormessage = { message: error.message };
            } else {
                errormessage = { message: error.response.data.mensaje };
            }
            setValidationErrors(errormessage);
        }
    };

  
    const preventSpace = (e) => {
        if (e.key === ' ') {
            e.preventDefault();
        }
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
                            onKeyDown={preventSpace}
                            required
                            maxLength={30}
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
                            onKeyDown={preventSpace}
                            required
                            maxLength={30}
                            minLength={6}
                        />
                    </div>

                    <div className="d-grid gap-2 mt-4">
                        <button type="submit" className="btn-login">
                            Acceder
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;