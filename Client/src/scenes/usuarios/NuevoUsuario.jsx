import { Button, Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridRowId } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useEffect, useState } from "react";

import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import Tooltip from "@mui/material/Tooltip";

const NuevoUsuario = () => {
  const navigate = useNavigate();

  return (
    <Box m="20px">
      <Header
        title="Nuevo Usuario"
        subtitle="Creacion dee Nuevos Usuarios del Sistema"
      />

      <Box display="flex" justifyContent="end" mt="20px">
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          onClick={() => navigate("/usuario-nuevo")}
        >
          Nuevo Usuario
        </Button>
      </Box>

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #f5f5f5",
            color: "#333333",
            fontSize: "14px",
            padding: "12px 16px",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f8f9fa",
            color: "#333333",
            borderBottom: "2px solid #e0e0e0",
            fontSize: "14px",
            fontWeight: "600",
            minHeight: "56px !important",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            color: "#333333",
            fontWeight: "600",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#ffffff",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "2px solid #e0e0e0",
            backgroundColor: "#f8f9fa",
            color: "#333333",
          },
          "& .MuiDataGrid-row": {
            minHeight: "60px !important",
            "&:hover": {
              backgroundColor: "#f0f8ff",
            },
            "&:nth-of-type(even)": {
              backgroundColor: "#fafafa",
            },
          },
          "& .MuiDataGrid-actionsCell .MuiIconButton-root": {
            color: "#666666",
            "&:hover": {
              backgroundColor: "#e3f2fd",
              color: "#1976d2",
            },
          },
        }}
      ></Box>
    </Box>
  );
};

export default NuevoUsuario;
