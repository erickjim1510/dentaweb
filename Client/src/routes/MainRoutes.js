import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layout/MainLayout';
 
// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('../scenes/dashboard')));

//render  
const Usuarios = Loadable(lazy(() => import('../scenes/usuarios')));
const Invoices = Loadable(lazy(() => import('../scenes/invoices')));
const Contacts = Loadable(lazy(() => import('../scenes/contacts')));
const Bar = Loadable(lazy(() => import('../scenes/bar')));
const Form = Loadable(lazy(() => import('../scenes/form')));
const Line = Loadable(lazy(() => import('../scenes/line')));
const Pie = Loadable(lazy(() => import('../scenes/pie')));
const FAQ = Loadable(lazy(() => import('../scenes/faq')));
const Geography = Loadable(lazy(() => import('../scenes/geography')));
const Calendar = Loadable(lazy(() => import('../scenes/calendar/calendar')));



// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
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
      path: 'form',
      element: <Form />
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
    }
    
  ]
};

export default MainRoutes;



