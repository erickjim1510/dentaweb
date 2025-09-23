import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      px={2}
      py={1}
      sx={{
        height: "40px",
        backgroundColor: "transparent",
      }}
    >
      <IconButton
        onClick={handleLogout}
        sx={{
          color: "#3EB489",
          fontSize: "2rem",
        }}
      >
        <LogoutOutlinedIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );
};

export default Topbar;
