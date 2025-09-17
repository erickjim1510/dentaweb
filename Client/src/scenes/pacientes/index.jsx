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

const ListaPacientes = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await api.get("/pacientes");
        setPacientes(response.data.data);
      } catch (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    };
    fetchPacientes();
  }, []);

  const handleEliminarPaciente = async (idPaciente) => {
    if (window.confirm("¿Está seguro de eliminar este paciente?")) {
      try {
        await api.delete(`/pacientes/${idPaciente}`);
        setPacientes(
          pacientes.filter((paciente) => paciente.id_paciente !== idPaciente)
        );
      } catch (error) {
        console.error("Error al eliminar paciente:", error);
      }
    }
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "";
    const fechaObj = new Date(fecha);
    return fechaObj.toLocaleDateString("es-ES");
  };

  const columns = [
    { field: "id_paciente", headerName: "ID Paciente", width: 100 },
    {
      field: "primer_nombre",
      headerName: "Primer Nombre",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "segundo_nombre",
      headerName: "Segundo Nombre",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "apellido_paterno",
      headerName: "Ap. Paterno",
      flex: 1,
    },
    {
      field: "apellido_materno",
      headerName: "Ap. Materno",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.2,
    },
    {
      field: "telefono",
      headerName: "Teléfono",
      width: 120,
    },
    {
      field: "fecha_nacimiento",
      headerName: "Fecha Nacimiento",
      width: 140,
      renderCell: (params) => formatearFecha(params.value),
    },
    {
      field: "ocupacion",
      headerName: "Ocupación",
      width: 120,
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
          onClick={() => navigate(`/paciente-detalle/${params.id}`)}
        />,
        <GridActionsCellItem
          key="edit"
          icon={
            <Tooltip title="Editar">
              <EditIcon />
            </Tooltip>
          }
          label="Editar"
          onClick={() => navigate(`/paciente-editar/${params.id}`)}
        />,
        <GridActionsCellItem
          key="delete"
          icon={
            <Tooltip title="Eliminar">
              <DeleteIcon />
            </Tooltip>
          }
          label="Eliminar"
          onClick={() => handleEliminarPaciente(params.id)}
        />,
      ],
    },
  ];

  return (
    <Box m="20px">
      <Header title="Pacientes" subtitle="Lista de pacientes del sistema" />

      <Box display="flex" justifyContent="end" mt="20px">
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          onClick={() => navigate("/paciente-nuevo")}
        >
          Nuevo Paciente
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
        {console.log("Datos de Pacientes: ", pacientes)}

        <DataGrid
          rows={pacientes}
          columns={columns}
          getRowId={(row) => row.id_paciente}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 25, 50]}
          checkboxSelection={false}
        />
      </Box>
    </Box>
  );
};

export default ListaPacientes;
