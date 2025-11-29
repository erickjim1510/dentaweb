// MainRoutes.js
import { lazy } from 'react';
import Loadable from '../components/Loadable';
import MainLayout from '../layout/MainLayout';
import ProtectedRoute from '../components/ProtectRoute';
import EditarUsuario from '../scenes/usuarios/EditarUsuario';
import EditarPaciente from '../scenes/pacientes/EditarPaciente';
import Expediente from '../scenes/pacientes/Expediente';
import Citas from '../scenes/calendar/calendar';

const DashboardDefault = Loadable(lazy(() => import('../scenes/dashboard')));
const Usuarios = Loadable(lazy(() => import('../scenes/usuarios')));
const NuevoUsuario = Loadable(lazy(() => import('../scenes/usuarios/Nuevo')));
const Pacientes = Loadable(lazy(() => import('../scenes/pacientes')));
const NuevoPaciente = Loadable(lazy(() => import('../scenes/pacientes/NuevoPaciente')));
const CitaNueva = Loadable(lazy(() => import('../scenes/calendar/calendar')));

const getUser = () => JSON.parse(sessionStorage.getItem("user") || "{}");

const AdminOnlyRoute = ({ children }) => {
  const user = getUser();
  if (user.nombre_rol !== "Administrador") {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Acceso Denegado</h2>
        <p>No tienes permisos para acceder a esta sección.</p>
      </div>
    );
  }
  return children;
};

const NonAdminRoute = ({ children }) => {
  const user = getUser();
  if (user.nombre_rol === "Administrador") {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Acceso Denegado</h2>
        <p>Esta sección no está disponible para administradores.</p>
      </div>
    );
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

    // Rutas solo para admin
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
          <NuevoUsuario />
        </AdminOnlyRoute>
      )
    },
    {
      path: 'usuario-editar/:id',
      element: (
        <AdminOnlyRoute>
          <EditarUsuario />
        </AdminOnlyRoute>
      )
    },

    // Rutas para todos
    {
      path: 'pacientes',
      element: (
        <NonAdminRoute>
          <Pacientes />
        </NonAdminRoute>
      )
    },
    {
      path: 'paciente-nuevo',
      element: (
        <NonAdminRoute>
          <NuevoPaciente />
        </NonAdminRoute>
      )
    },
    {
      path: 'paciente-editar/:id',
      element: (
        <NonAdminRoute>
          <EditarPaciente />
        </NonAdminRoute>
      )
    },
    {
      path: 'expediente/:id',
      element: (
        <NonAdminRoute>
          <Expediente />
        </NonAdminRoute>
      )
    },
    {
      path: 'citas',
      element: (
        <NonAdminRoute>
          <Citas />
        </NonAdminRoute>
      )
    }
  ]
};

export default MainRoutes;
