import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { AuthContext } from "../../context/AuthContext";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { user, logout } = useContext(AuthContext);
  const [message, setMessage] = useState([""]);
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleLogout = async () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <Box display="flex" justifyContent="flex-end" p={2}>
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton
          onClick={handleLogout}
          size="small"
          sx={{ color: "#3EB489" }}
        >
          <LogoutOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
