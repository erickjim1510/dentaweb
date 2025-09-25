import { createContext, useState, useEffect } from "react";

// CONTEXTO - Este componente nos ayuda a pasar los datos
// del usuario loggeado

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
      sessionStorage.removeItem("token");
    }
  }, [user]);

  const authlogin = (userData) => {
    setUser({
      id_usuario: userData.id_usuario,
      primer_nombre: userData.primer_nombre,
      apellido_paterno: userData.apellido_paterno,
      email: userData.email,
      id_rol: userData.id_rol,
      nombre_rol: userData.nombre_rol,
    });
  };

  const logout = () => {
    setUser(null);
    sessionStorage.clear();
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
