import { Outlet } from 'react-router-dom';

// ==============================|| MINIMAL LAYOUT ||============================== //
//Este componente ayuda a renderizar los componentes hijos dentro de las rutas aniddadas como
// modales u otras cosas

const MinimalLayout = () => {
 return(
  <>
    <Outlet />
  </>
)};

export default MinimalLayout;
