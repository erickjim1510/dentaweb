import { lazy } from 'react';

import Loadable from '../components/Loadable';
import MainLayout from '../layout/MainLayout';
import ProtectedRoute from '../components/ProtectRoute';

const DashboardDefault = Loadable(lazy(() => import('../scenes/dashboard')));

const Usuarios = Loadable(lazy(() => import('../scenes/usuarios')));
const NuevoUsuario = Loadable(lazy(() => import("../scenes/usuarios/Nuevo")));

const Pacientes = Loadable(lazy(() => import('../scenes/pacientes')));
/*
const Invoices = Loadable(lazy(() => import('../scenes/invoices')));
const Contacts = Loadable(lazy(() => import('../scenes/contacts')));
const Bar = Loadable(lazy(() => import('../scenes/bar')));
const Line = Loadable(lazy(() => import('../scenes/line')));
const Pie = Loadable(lazy(() => import('../scenes/pie')));
const FAQ = Loadable(lazy(() => import('../scenes/faq')));
const Geography = Loadable(lazy(() => import('../scenes/geography')));
const Calendar = Loadable(lazy(() => import('../scenes/calendar/calendar')));*/

// ==============================|| MAIN ROUTING ||============================== //

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
    {
      path: 'usuarios',
      element: <Usuarios />
    },
    {
      path: 'usuario-nuevo',
      element: <NuevoUsuario/>
    },
    {
      path: 'pacientes',
      element: <Pacientes />
    },
    /*{
      path: 'invoices',
      element: <Invoices />
    },
    {
      path: 'contacts',
      element: <Contacts />
    },
    {
      path: 'bar',
      element: <Bar />
    },
    {
      path: 'line',
      element: <Line />
    },
    {
      path: 'pie',
      element: <Pie />
    },
    {
      path: 'faq',
      element: <FAQ />
    },
    {
      path: 'geography',
      element: <Geography />
    },
    {
      path: 'calendar',
      element: <Calendar />
    }*/
  ]
};

export default MainRoutes;