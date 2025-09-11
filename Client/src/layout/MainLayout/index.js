import { Outlet, Routes, Route} from "react-router-dom";
import Topbar from "../../scenes/global/Topbar";
import Sidebar from "../../scenes/global/Sidebar";
import { useState} from "react";

// ==============================|| Main LAYOUT ||============================== //
const MainLayout = () => {
  const [isSidebar, setIsSidebar] = useState(true);

 return (
  <div className="app">
    <Sidebar isSidebar={isSidebar} />
    <main className="content">
      <Topbar setIsSidebar={setIsSidebar} />
      <Outlet />
    </main>
  </div>
)};

export default MainLayout;
