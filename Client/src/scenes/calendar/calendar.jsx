import {
  Button,
  Box,
  Typography,
  useTheme,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useEffect, useState } from "react";
import * as yup from "yup";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EventIcon from "@mui/icons-material/Event";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import Swal from "sweetalert2";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const getDefaultFechaInicio = () => {
    const hoy = new Date();
    hoy.setDate(hoy.getDate());
    return hoy.toISOString().split("T")[0];
  };

  const getDefaultFechaFin = () => {
    const hoy = new Date();
    hoy.setDate(hoy.getDate() + 30);
    return hoy.toISOString().split("T")[0];
  };

  const getFechaMinima = () => {
    const hoy = new Date();
    return hoy.toISOString().split("T")[0];
  };

  const [citas, setCitas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [doctores, setDoctores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [fechaInicio, setFechaInicio] = useState(getDefaultFechaInicio());
  const [fechaFin, setFechaFin] = useState(getDefaultFechaFin());
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    id_cita: null,
    id_paciente: "",
    id_usuario: "",
    fecha: "",
    hora: "",
    motivo: "",
    estado: "Pendiente",
  });

  const citaSchema = yup.object().shape({
    id_paciente: yup.string().required("El paciente es obligatorio"),
    id_usuario: yup.string().required("El doctor es obligatorio"),
    fecha: yup
      .string()
      .required("La fecha es obligatoria")
      .test(
        "fecha-hora-valida",
        "No se pueden crear citas en fechas u horas pasadas",
        function (value) {
          if (!value) return false;
          const { hora } = this.parent;
          if (!hora) return true;

          const fechaSeleccionada = new Date(value + "T" + hora);
          const ahora = new Date();

          return fechaSeleccionada >= ahora;
        }
      ),
    hora: yup.string().required("La hora es obligatoria"),
    motivo: yup
      .string()
      .max(50, "El motivo no puede exceder 50 caracteres")
      .required("El motivo de consulta es obligatorio")
      .matches(
        /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s]*$/,
        "El motivo solo puede contener letras y numeros "
      ),
    estado: yup.string().required("El estado es obligatorio"),
  });

  const cargarDoctores = async () => {
    try {
      const response = await api.get("/usuarios");
      if (response.data.success) {
        const doctoresFiltrados = response.data.data.filter(
          (usuario) => usuario.id_rol === 3 || usuario.nombre_rol === "Doctor"
        );
        setDoctores(doctoresFiltrados);
      }
    } catch (error) {
      console.error("Error al cargar doctores:", error);
    }
  };

  const cargarPacientes = async () => {
    try {
      const response = await api.get("/pacientes");
      if (response.data.success) {
        setPacientes(response.data.data);
      }
    } catch (error) {
      console.error("Error al cargar pacientes:", error);
    }
  };

  useEffect(() => {
    cargarDoctores();
    cargarPacientes();
  }, []);

  const cargarCitas = async () => {
    if (!fechaInicio || !fechaFin) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/citas/rango-json", {
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
      });

      if (response.data.success) {
        setCitas(response.data.data);
      } else {
        console.error("Error en la respuesta:", response.data.mensaje);
        setCitas([]);
      }
    } catch (error) {
      console.error("Error al cargar citas:", error);
      setCitas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarCitas();
  }, [fechaInicio, fechaFin]);

  const handleNuevaCita = () => {
    setEditMode(false);
    setFormData({
      id_cita: null,
      id_paciente: "",
      id_usuario: "",
      fecha: "",
      hora: "",
      motivo: "",
      estado: "Pendiente",
    });
    setErrors({});
    setOpenDialog(true);
  };

  const handleEditarCita = async (idCita) => {
    try {
      const response = await api.get(`/citas/${idCita}`);

      if (response.data.success) {
        const cita = response.data.data;
        setFormData({
          id_cita: cita.id_cita,
          id_paciente: cita.id_paciente,
          id_usuario: cita.id_usuario,
          fecha: cita.fecha,
          hora: cita.hora,
          motivo: cita.motivo || "",
          estado: cita.estado || "Pendiente",
        });
        setErrors({});
        setEditMode(true);
        setOpenDialog(true);
      }
    } catch (error) {
      console.error("Error al cargar cita:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al cargar los datos de la cita",
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleGuardarCita = async () => {
    try {
      await citaSchema.validate(formData, { abortEarly: false });
      setErrors({});

      let response;

      if (editMode) {
        response = await api.put("/citas/actualizar", formData);
      } else {
        response = await api.post("/citas/crear", formData);
      }

      if (response.data.success) {
        setOpenDialog(false);
        Swal.fire({
          icon: "success",
          title: editMode
            ? "La Cita ha sido Actualizada!"
            : "La Cita fue Creada!",
          text: response.data.mensaje,
          confirmButtonColor: "#3085d6",
        });
        cargarCitas();
      } else {
        setOpenDialog(false);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.mensaje,
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.error("Error al guardar cita:", error);
        setOpenDialog(false);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al guardar la cita",
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  const handleEliminarCita = async (idCita) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "Quieres eliminar esta cita?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await api.delete(`/citas/eliminar/${idCita}`);

          if (response.data.success) {
            setCitas(citas.filter((cita) => cita.id_cita !== idCita));
            Swal.fire({
              icon: "success",
              title: "Cita Eliminada!",
              text: "La cita ha sido eliminada",
              confirmButtonColor: "#3085d6",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Error al eliminar cita: " + response.data.mensaje,
              confirmButtonColor: "#d33",
            });
          }
        } catch (error) {
          console.error("Error al eliminar cita:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al eliminar cita",
            confirmButtonColor: "#d33",
          });
        }
      }
    });
  };

  const getNombrePaciente = (idPaciente) => {
    const paciente = pacientes.find((p) => p.id_paciente === idPaciente);
    if (paciente) {
      return `${paciente.primer_nombre} ${paciente.apellido_paterno} ${paciente.apellido_materno}`;
    }
    return "N/A";
  };

  const getNombreDoctor = (idUsuario) => {
    const doctor = doctores.find((d) => d.id_usuario === idUsuario);
    if (doctor) {
      return `Dr. ${doctor.primer_nombre} ${doctor.apellido_paterno}`;
    }
    return "N/A";
  };

  const columns = [
    { field: "id_cita", headerName: "ID", width: 80 },
    {
      field: "id_paciente",
      headerName: "Paciente",
      flex: 1.5,
      renderCell: (params) => getNombrePaciente(params.value),
    },
    {
      field: "id_usuario",
      headerName: "Doctor",
      flex: 1.5,
      renderCell: (params) => getNombreDoctor(params.value),
    },
    {
      field: "fecha",
      headerName: "Fecha",
      flex: 1,
      renderCell: (params) => {
        if (params.value) {
          const fecha = new Date(params.value + "T00:00:00");
          return fecha.toLocaleDateString("es-MX");
        }
        return "N/A";
      },
    },
    {
      field: "hora",
      headerName: "Hora",
      flex: 1,
    },
    {
      field: "motivo",
      headerName: "Motivo",
      flex: 2,
    },
    {
      field: "estado",
      headerName: "Estado",
      flex: 1,
      renderCell: (params) => {
        let bgColor = "#f5f5f5";
        let textColor = "#666666";

        if (params.value === "Pendiente") {
          bgColor = "#fff3cd";
          textColor = "#856404";
        } else if (params.value === "Confirmada") {
          bgColor = "#d4edda";
          textColor = "#155724";
        } else if (params.value === "Cancelada") {
          bgColor = "#f8d7da";
          textColor = "#721c24";
        } else if (params.value === "Completada") {
          bgColor = "#d1ecf1";
          textColor = "#0c5460";
        }

        return (
          <Box
            sx={{
              backgroundColor: bgColor,
              color: textColor,
              padding: "4px 8px",
              borderRadius: "12px",
              fontSize: "12px",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            {params.value || "N/A"}
          </Box>
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      width: 120,
      getActions: (params) => [
        <GridActionsCellItem
          key="edit"
          icon={
            <Tooltip title="Editar">
              <EditIcon />
            </Tooltip>
          }
          label="Editar"
          onClick={() => handleEditarCita(params.id)}
        />,
        <GridActionsCellItem
          key="delete"
          icon={
            <Tooltip title="Eliminar">
              <DeleteIcon />
            </Tooltip>
          }
          label="Eliminar"
          onClick={() => handleEliminarCita(params.id)}
        />,
      ],
    },
  ];

  return (
    <Box m="20px">
      <Header title="Calendario de Citas" subtitle="Gestión de citas medicas" />

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt="20px"
        gap={2}
      >
        <Box display="flex" gap={2}>
          <TextField
            label="Fecha Inicio"
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            InputLabelProps={{ shrink: true }}
            onKeyDown={(e) => e.preventDefault()}
            sx={{
              minWidth: "200px",
              "& .MuiOutlinedInput-root": {
                backgroundColor: "white",
                "&:hover fieldset": {
                  borderColor: "#000000",
                },
                "&.Mui-focused fieldset": {
                  borderColor: colors.greenAccent[500],
                  borderWidth: "2px",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#666666",
                "&.Mui-focused": {
                  color: colors.greenAccent[500],
                },
              },
              "& .MuiOutlinedInput-input": {
                color: "#000000",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#000000",
              },
            }}
          />
          <TextField
            label="Fecha Fin"
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            InputLabelProps={{ shrink: true }}
            onKeyDown={(e) => e.preventDefault()}
            sx={{
              minWidth: "200px",
              "& .MuiOutlinedInput-root": {
                backgroundColor: "white",
                "&:hover fieldset": {
                  borderColor: "#000000",
                },
                "&.Mui-focused fieldset": {
                  borderColor: colors.greenAccent[500],
                  borderWidth: "2px",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#666666",
                "&.Mui-focused": {
                  color: colors.greenAccent[500],
                },
              },
              "& .MuiOutlinedInput-input": {
                color: "#000000",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#000000",
              },
            }}
          />
        </Box>

        <Button
          type="submit"
          color="secondary"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleNuevaCita}
        >
          Nueva Cita
        </Button>
      </Box>

      {(!fechaInicio || !fechaFin) && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="400px"
          flexDirection="column"
        >
          <EventIcon sx={{ fontSize: 80, color: colors.grey[400], mb: 2 }} />
          <Typography variant="h4" color={colors.grey[400]} textAlign="center">
            Seleccione un rango de fechas
          </Typography>
          <Typography
            variant="body1"
            color={colors.grey[500]}
            textAlign="center"
            mt={1}
          >
            Ingrese la fecha de inicio y fin para ver las citas
          </Typography>
        </Box>
      )}

      {fechaInicio && fechaFin && citas.length === 0 && !loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="400px"
          flexDirection="column"
        >
          <EventIcon sx={{ fontSize: 80, color: colors.grey[400], mb: 2 }} />
          <Typography variant="h4" color={colors.grey[400]} textAlign="center">
            No hay citas en este rango
          </Typography>
          <Typography
            variant="body1"
            color={colors.grey[500]}
            textAlign="center"
            mt={1}
          >
            No hay citas entre {fechaInicio} y {fechaFin}
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
            Cargando citas...
          </Typography>
        </Box>
      )}

      {citas.length > 0 && !loading && (
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
            rows={citas}
            columns={columns}
            getRowId={(row) => row.id_cita}
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
          />
        </Box>
      )}

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#ffffff",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "600",
            fontSize: "1.25rem",
            pb: 2,
            backgroundColor: "#ffffff",
            color: "#000000",
          }}
        >
          {editMode ? "Editar Cita" : "Nueva Cita"}
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: "#ffffff",
          }}
        >
          <Box display="flex" flexDirection="column" gap={2.5} mt={2}>
            <FormControl
              fullWidth
              required
              error={!!errors.id_paciente}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#ffffff",
                  "&:hover fieldset": {
                    borderColor: "#000000",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: colors.greenAccent[500],
                    borderWidth: "2px",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#666666",
                  "&.Mui-focused": {
                    color: colors.greenAccent[500],
                  },
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#000000",
                },
              }}
            >
              <InputLabel>Paciente</InputLabel>
              <Select
                value={formData.id_paciente}
                label="Paciente"
                onChange={(e) => {
                  setFormData({ ...formData, id_paciente: e.target.value });
                  setErrors({ ...errors, id_paciente: "" });
                }}
              >
                {pacientes.map((paciente) => (
                  <MenuItem
                    key={paciente.id_paciente}
                    value={paciente.id_paciente}
                  >
                    {paciente.primer_nombre} {paciente.apellido_paterno}{" "}
                    {paciente.apellido_materno}
                  </MenuItem>
                ))}
              </Select>
              {errors.id_paciente && (
                <FormHelperText>{errors.id_paciente}</FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              required
              error={!!errors.id_usuario}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#ffffff",
                  "&:hover fieldset": {
                    borderColor: "#000000",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: colors.greenAccent[500],
                    borderWidth: "2px",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#666666",
                  "&.Mui-focused": {
                    color: colors.greenAccent[500],
                  },
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#000000",
                },
              }}
            >
              <InputLabel>Doctor</InputLabel>
              <Select
                value={formData.id_usuario}
                label="Doctor"
                onChange={(e) => {
                  setFormData({ ...formData, id_usuario: e.target.value });
                  setErrors({ ...errors, id_usuario: "" });
                }}
              >
                {doctores.map((doctor) => (
                  <MenuItem key={doctor.id_usuario} value={doctor.id_usuario}>
                    Dr. {doctor.primer_nombre} {doctor.apellido_paterno}{" "}
                  </MenuItem>
                ))}
              </Select>
              {errors.id_usuario && (
                <FormHelperText>{errors.id_usuario}</FormHelperText>
              )}
            </FormControl>

            <Box display="flex" gap={2}>
              <TextField
                label="Fecha"
                type="date"
                value={formData.fecha}
                onChange={(e) => {
                  setFormData({ ...formData, fecha: e.target.value });
                  setErrors({ ...errors, fecha: "" });
                }}
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  min: getFechaMinima(),
                }}
                onKeyDown={(e) => e.preventDefault()}
                required
                fullWidth
                error={!!errors.fecha}
                helperText={errors.fecha}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#ffffff",
                    "&:hover fieldset": {
                      borderColor: "#000000",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: colors.greenAccent[500],
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#666666",
                    "&.Mui-focused": {
                      color: colors.greenAccent[500],
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "#000000",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000000",
                  },
                }}
              />

              <TextField
                label="Hora"
                type="time"
                value={formData.hora}
                onChange={(e) => {
                  setFormData({ ...formData, hora: e.target.value });
                  setErrors({ ...errors, hora: "" });
                }}
                InputLabelProps={{ shrink: true }}
                onKeyDown={(e) => e.preventDefault()}
                required
                fullWidth
                error={!!errors.hora}
                helperText={errors.hora}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#ffffff",
                    "&:hover fieldset": {
                      borderColor: "#000000",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: colors.greenAccent[500],
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#666666",
                    "&.Mui-focused": {
                      color: colors.greenAccent[500],
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "#000000",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000000",
                  },
                }}
              />
            </Box>

            <TextField
              label="Motivo de la consulta"
              required
              value={formData.motivo}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 50) {
                  setFormData({ ...formData, motivo: value });
                  setErrors({ ...errors, motivo: "" });
                }
              }}
              multiline
              rows={3}
              fullWidth
              placeholder="Describa el motivo de la consulta"
              error={!!errors.motivo}
              helperText={
                errors.motivo || `${formData.motivo.length}/50 caracteres`
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#ffffff",
                  "&:hover fieldset": {
                    borderColor: "#000000",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: colors.greenAccent[500],
                    borderWidth: "2px",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#666666",
                  "&.Mui-focused": {
                    color: colors.greenAccent[500],
                  },
                },
                "& .MuiOutlinedInput-input": {
                  color: "#000000",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#000000",
                },
              }}
            />

            <FormControl
              fullWidth
              required
              error={!!errors.estado}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#ffffff",
                  "&:hover fieldset": {
                    borderColor: "#000000",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: colors.greenAccent[500],
                    borderWidth: "2px",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#666666",
                  "&.Mui-focused": {
                    color: colors.greenAccent[500],
                  },
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#000000",
                },
              }}
            >
              <InputLabel>Estado</InputLabel>
              <Select
                value={formData.estado || ""}
                label="Estado"
                onChange={(e) => {
                  setFormData({ ...formData, estado: e.target.value });
                  setErrors({ ...errors, estado: "" });
                }}
              >
                <MenuItem value="Pendiente">Pendiente</MenuItem>
                <MenuItem value="Confirmada">Confirmada</MenuItem>
                {editMode && <MenuItem value="Completada">Completada</MenuItem>}
                {editMode && <MenuItem value="Cancelada">Cancelada</MenuItem>}
              </Select>
              {errors.estado && (
                <FormHelperText>{errors.estado}</FormHelperText>
              )}
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            px: 3,
            py: 2,
            gap: 1,
            backgroundColor: "#ffffff",
          }}
        >
          <Button
            onClick={() => setOpenDialog(false)}
            variant="outlined"
            color="inherit"
            sx={{
              color: "#666666",
              borderColor: "#cccccc",
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleGuardarCita}
            color="secondary"
            variant="contained"
          >
            {editMode ? "Actualizar" : "Crear"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Calendar;
