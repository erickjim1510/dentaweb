import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const getInitialState = () => {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getInitialState);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);

  const authlogin = (userData) => {
    setUser({
      id_usuario: userData.id_usuario,
      id_rol: userData.id_rol,
      id_estado: userData.id_estado,
      primer_nombre: userData.primer_nombre,
      segundo_nombre: userData.segundo_nombre,
      apellido_paterno: userData.apellido_paterno,
      apellido_materno: userData.apellido_materno,
      fecha_nacimiento: userData.fecha_nacimiento,
      nombre_usuario: userData.nombre_usuario,
      contrasena_hash: userData.contrasena_hash,
      telefono: userData.telefono,
      email: userData.email,
      fecha_registro: userData.fecha_registro,
      token: userData.token,
    });
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authlogin,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
