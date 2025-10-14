// MainRoutes.js - REEMPLAZA TU ARCHIVO ACTUAL
import { lazy } from 'react';
import Loadable from '../components/Loadable';
import MainLayout from '../layout/MainLayout';
import ProtectedRoute from '../components/ProtectRoute';
import EditarUsuario from '../scenes/usuarios/EditarUsuario';
import EditarPaciente from '../scenes/pacientes/EditarPaciente';
import Expediente from '../scenes/pacientes/Expediente';

const DashboardDefault = Loadable(lazy(() => import('../scenes/dashboard')));
const Usuarios = Loadable(lazy(() => import('../scenes/usuarios')));
const NuevoUsuario = Loadable(lazy(() => import("../scenes/usuarios/Nuevo")));
const Pacientes = Loadable(lazy(() => import('../scenes/pacientes')));
const NuevoPaciente = Loadable(lazy(() => import('../scenes/pacientes/NuevoPaciente')));

// Componente para proteger rutas de administrador
const AdminOnlyRoute = ({ children }) => {
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  
  if (user.nombre_rol !== "Administrador") {
    return <div style={{padding: "20px", textAlign: "center"}}>
      <h2>Acceso Denegado</h2>
      <p>No tienes permisos para acceder a esta sección.</p>
    </div>;
  }
  
  return children;
};

const MainRoutes = {
  path: '/',
  element: (
    <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: 'dashboard',
      element: <DashboardDefault />
    },
    // RUTAS SOLO PARA ADMINISTRADOR
    {
      path: 'usuarios',
      element: (
        <AdminOnlyRoute>
          <Usuarios />
        </AdminOnlyRoute>
      )
    },
    {
      path: 'usuario-nuevo',
      element: (
        <AdminOnlyRoute>
          <NuevoUsuario/>
        </AdminOnlyRoute>
      )
    },
    {
      path: 'usuario-editar/:id',
      element: (
        <AdminOnlyRoute>
          <EditarUsuario/>
        </AdminOnlyRoute>
      )
    },
    // RUTAS PARA TODOS (Administrador, Recepcionista, Doctor)
    {
      path: 'pacientes',
      element: <Pacientes />
    },
    {
      path: 'paciente-nuevo',
      element: <NuevoPaciente/>
    },
    {
      path: 'paciente-editar/:id',
      element: <EditarPaciente/>
    },
    {
      path: 'expediente/:id',
      element: <Expediente/>
    }
  ]
};

export default MainRoutes;