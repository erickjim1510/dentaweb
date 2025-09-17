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

const ListaUsuarios = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await api.get("/usuarios");
        if (response.data.success) {
          setUsuarios(response.data.data);
        } else {
          console.error("Error en la respuesta:", response.data.mensaje);
        }
      } catch (error) {
        console.log(error.response?.data);
        console.log(error.response?.status);
        console.log(error.response?.headers);
      }
    };
    fetchUsuarios();
  }, []);

  const handleEliminarUsuario = async (idUsuario) => {
    if (window.confirm("¿Está seguro de eliminar este usuario?")) {
      try {
        const response = await api.delete(`/usuarios`, {
          data: { id_usuario: idUsuario },
        });

        if (response.data.success) {
          setUsuarios(
            usuarios.filter((usuario) => usuario.id_usuario !== idUsuario)
          );
          alert("Usuario eliminado exitosamente");
        } else {
          alert("Error al eliminar usuario: " + response.data.mensaje);
        }
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
        alert("Error al eliminar usuario");
      }
    }
  };

  const columns = [
    { field: "id_usuario", headerName: "ID Usuario", width: 100 },
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
      field: "nombre_rol",
      headerName: "Rol",
      flex: 1,
      renderCell: (params) => (
        <Box
          sx={{
            backgroundColor:
              params.value === "Administrador"
                ? "#e3f2fd"
                : params.value === "Doctor"
                ? "#f3e5f5"
                : params.value === "Recepcionista"
                ? "#e8f5e8"
                : "#fff3e0",
            color:
              params.value === "Administrador"
                ? "#1976d2"
                : params.value === "Doctor"
                ? "#7b1fa2"
                : params.value === "Recepcionista"
                ? "#388e3c"
                : "#f57c00",
            padding: "4px 8px",
            borderRadius: "12px",
            fontSize: "12px",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          {params.value || "Sin rol"}
        </Box>
      ),
    },
    {
      field: "nombre_estado",
      headerName: "Estado",
      flex: 1,
      renderCell: (params) => (
        <Box
          sx={{
            backgroundColor:
              params.value === "Activo"
                ? "#e8f5e8"
                : params.value === "Inactivo"
                ? "#ffebee"
                : params.value === "Suspendido"
                ? "#fff3e0"
                : "#f5f5f5",
            color:
              params.value === "Activo"
                ? "#2e7d32"
                : params.value === "Inactivo"
                ? "#d32f2f"
                : params.value === "Suspendido"
                ? "#f57c00"
                : "#666666",
            padding: "4px 8px",
            borderRadius: "12px",
            fontSize: "12px",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          {params.value || "Sin estado"}
        </Box>
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          key="info"
          icon={
            <Tooltip title="Ver detalles">
              <InfoIcon />
            </Tooltip>
          }
          label="Ver detalles"
          onClick={() => navigate(`/usuario-detalle/${params.id}`)}
        />,
        <GridActionsCellItem
          key="edit"
          icon={
            <Tooltip title="Editar">
              <EditIcon />
            </Tooltip>
          }
          label="Editar"
          onClick={() => navigate(`/usuario-editar/${params.id}`)}
        />,
        <GridActionsCellItem
          key="delete"
          icon={
            <Tooltip title="Eliminar">
              <DeleteIcon />
            </Tooltip>
          }
          label="Eliminar"
          onClick={() => handleEliminarUsuario(params.id)}
        />,
      ],
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
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default ListaUsuarios;
