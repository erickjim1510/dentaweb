import { Button, Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ListaUsuarios = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {}, []);

  const columns = [
    { field: "idusuario", headerName: "ID Usuario", width: 100 },
    {
      field: "primer_nombre",
      headerName: "Primer Nombre",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "apellido_paterno",
      headerName: "Ap. Paterno",
      flex: 1,
    },
    {
      field: "nombre_usuario",
      headerName: "Usuario",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "telefono",
      headerName: "Teléfono",
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      width: 150,
    },
  ];

  return (
    <Box m="20px">
      <Header title="Usuarios" subtitle="Lista de usuarios del sistema" />

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
      >
        {console.log("Datos de Usuarios: ", usuarios)}

        <DataGrid
          rows={usuarios}
          columns={columns}
          getRowId={(row) => row.id_usuario}
        />
      </Box>
    </Box>
  );
};

export default ListaUsuarios;
