import { Outlet } from "react-router-dom"; 
import Topbar from "../../scenes/global/Topbar"; 
import Sidebar from "../../scenes/global/Sidebar"; 
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

// ==============================|| Main LAYOUT ||============================== //
// Pagina home o main, es decir que es la base para todas las siguientes paginas que este contenga
const MainLayout = () => {   
  const [isSidebar, setIsSidebar] = useState(true);
  const { isAuthenticated, user } = useContext(AuthContext);

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return (   
    <div className="app">     
      <Sidebar isSidebar={isSidebar} />     
      <main className="content">       
        <Topbar setIsSidebar={setIsSidebar} />       
        <Outlet />     
      </main>   
    </div> 
  );
};  

export default MainLayout;