import {
  Button,
  Box,
  Typography,
  useTheme,
  TextField,
  InputAdornment,
} from "@mui/material";
import { DataGrid, GridActionsCellItem, GridRowId } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useEffect, useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import Tooltip from "@mui/material/Tooltip";

const ListaPacientes = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [pacientesFiltrados, setPacientesFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(false);

  const buscarPacientes = async (termino) => {
    if (!termino.trim()) {
      setPacientesFiltrados([]);
      return;
    }

    try {
      setLoading(true);
      const response = await api.get(
        `/pacientes/buscar?q=${encodeURIComponent(termino)}`
      );

      if (response.data.success) {
        setPacientesFiltrados(response.data.data);
      } else {
        console.error("Error en la respuesta:", response.data.mensaje);
        setPacientesFiltrados([]);
      }
    } catch (error) {
      console.error("Error al buscar pacientes:", error);
      setPacientesFiltrados([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      buscarPacientes(busqueda);
    }, 500);

    return () => clearTimeout(timer);
  }, [busqueda]);

  const handleEliminarPaciente = async (idPaciente) => {
    if (window.confirm("¿Está seguro de eliminar este paciente?")) {
      try {
        const response = await api.delete(`/pacientes`, {
          data: { id_paciente: idPaciente },
        });

        if (response.data.success) {
          setPacientesFiltrados(
            pacientesFiltrados.filter(
              (paciente) => paciente.id_paciente !== idPaciente
            )
          );
          alert("Paciente eliminado exitosamente");
        } else {
          alert("Error al eliminar paciente: " + response.data.mensaje);
        }
      } catch (error) {
        console.error("Error al eliminar paciente:", error);
        alert("Error al eliminar paciente");
      }
    }
  };

  const handleEditarPaciente = (idPaciente) => {
    navigate(`/paciente-editar/${idPaciente}`);
  };

  const columns = [
    { field: "id_paciente", headerName: "ID", width: 80 },
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
      field: "apellido_materno",
      headerName: "Ap. Materno",
      flex: 1,
    },
    {
      field: "fecha_nacimiento",
      headerName: "Fecha Nac.",
      flex: 1,
      renderCell: (params) => {
        if (params.value) {
          const fecha = new Date(params.value);
          return fecha.toLocaleDateString("es-MX");
        }
        return "N/A";
      },
    },
    {
      field: "telefono",
      headerName: "Teléfono",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "nombre_sexo",
      headerName: "Sexo",
      flex: 1,
      renderCell: (params) => (
        <Box
          sx={{
            backgroundColor:
              params.value === "Masculino"
                ? "#e3f2fd"
                : params.value === "Femenino"
                ? "#fce4ec"
                : "#f5f5f5",
            color:
              params.value === "Masculino"
                ? "#1976d2"
                : params.value === "Femenino"
                ? "#c2185b"
                : "#666666",
            padding: "4px 8px",
            borderRadius: "12px",
            fontSize: "12px",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          {params.value || "N/A"}
        </Box>
      ),
    },
    {
      field: "fecha_registro",
      headerName: "Fecha Registro",
      flex: 1,
      renderCell: (params) => {
        if (params.value) {
          const fecha = new Date(params.value);
          return fecha.toLocaleDateString("es-MX");
        }
        return "N/A";
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          key="view-edit"
          icon={
            <Tooltip title="Ver y Editar">
              <EditIcon />
            </Tooltip>
          }
          label="Ver y Editar"
          onClick={() => handleEditarPaciente(params.id)}
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
      <Header title="Pacientes" subtitle="Buscar pacientes registrados" />

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt="20px"
        gap={2}
      >
        <TextField
          placeholder="Buscar por Nombre, Apellido, Teléfono o Email"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          sx={{
            minWidth: "400px",
            "& .MuiOutlinedInput-root": {
              backgroundColor: "white",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          color="secondary"
          variant="contained"
          onClick={() => navigate("/paciente-nuevo")}
        >
          Nuevo Paciente
        </Button>
      </Box>

      {!busqueda.trim() && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="400px"
          flexDirection="column"
        >
          <PersonIcon sx={{ fontSize: 80, color: colors.grey[400], mb: 2 }} />
          <Typography variant="h4" color={colors.grey[400]} textAlign="center">
            Ingrese un término de búsqueda
          </Typography>
          <Typography
            variant="body1"
            color={colors.grey[500]}
            textAlign="center"
            mt={1}
          >
            Escriba el nombre, apellido, teléfono o email del paciente que desea
            buscar
          </Typography>
        </Box>
      )}

      {busqueda.trim() && pacientesFiltrados.length === 0 && !loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="400px"
          flexDirection="column"
        >
          <SearchIcon sx={{ fontSize: 80, color: colors.grey[400], mb: 2 }} />
          <Typography variant="h4" color={colors.grey[400]} textAlign="center">
            No se encontraron resultados
          </Typography>
          <Typography
            variant="body1"
            color={colors.grey[500]}
            textAlign="center"
            mt={1}
          >
            No hay pacientes que coincidan con "{busqueda}"
          </Typography>
        </Box>
      )}

      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="400px"
          flexDirection="column"
        >
          <Typography variant="h4" color={colors.grey[400]} textAlign="center">
            Buscando...
          </Typography>
        </Box>
      )}

      {pacientesFiltrados.length > 0 && !loading && (
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
          <DataGrid
            rows={pacientesFiltrados}
            columns={columns}
            getRowId={(row) => row.id_paciente}
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default ListaPacientes;
