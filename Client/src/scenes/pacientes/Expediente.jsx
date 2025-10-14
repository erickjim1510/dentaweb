import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Divider,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api.js";
import Swal from "sweetalert2";

const Expediente = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const { id } = useParams();

  const [sexos, setSexos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pacienteData, setPacienteData] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, [id]);

  const cargarDatos = async () => {
    try {
      setLoading(true);

      const sexosResponse = await api.get("/sexos");
      if (sexosResponse.data.success) {
        setSexos(sexosResponse.data.data);
      }

      const pacienteResponse = await api.get(`/pacientes/${id}`);
      if (pacienteResponse.data.success) {
        setPacienteData(pacienteResponse.data.data);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Paciente no encontrado",
          confirmButtonColor: "#d33",
        });
        navigate("/pacientes");
      }
    } catch (error) {
      console.error("Error al cargar datos:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al cargar los datos. Por favor, recarga la página.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await api.put(`/pacientes/${id}`, values);

      if (response.data && response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Expediente Actualizado!",
          text: "El Expediente ha sido Actualizado Exitosamente",
          confirmButtonColor: "#3085d6",
        }).then(() => {
          navigate("/pacientes");
        });
      }
    } catch (error) {
      console.error("Error al Actualizar el Expediente:", error);

      if (error.response && error.response.data) {
        if (error.response.data.mensaje) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response.data.mensaje,
            confirmButtonColor: "#d33",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al actualizar el expediente",
            confirmButtonColor: "#d33",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Error de conexión",
          text: "Error de conexión con el servidor",
          confirmButtonColor: "#d33",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpperCaseChange = (e, handleChange) => {
    const { name, value } = e.target;
    const upperValue = value.toUpperCase();
    handleChange({ target: { name, value: upperValue } });
  };

  const handleNumberChange = (e, handleChange) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/[^0-9]/g, "").slice(0, 15);
    handleChange({ target: { name, value: numericValue } });
  };

  if (loading) {
    return (
      <Box m="20px">
        <Header title="Expediente Medico" subtitle="Cargando datos..." />
        <Box display="flex" justifyContent="center" mt="50px">
          <p>Cargando...</p>
        </Box>
      </Box>
    );
  }

  if (!pacienteData) {
    return (
      <Box m="20px">
        <Header title="ERROR" subtitle="Expediente no encontrado" />
      </Box>
    );
  }

  return (
    <Box m="20px">
      <Header
        title="Expediente Medico"
        subtitle="Información del Expediente del Paciente"
      />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{
          //Datos personales
          id_sexo: pacienteData.id_sexo || "",
          primer_nombre: pacienteData.primer_nombre || "",
          segundo_nombre: pacienteData.segundo_nombre || "",
          apellido_paterno: pacienteData.apellido_paterno || "",
          apellido_materno: pacienteData.apellido_materno || "",
          fecha_nacimiento: pacienteData.fecha_nacimiento || "",
          lugar_nacimiento: pacienteData.lugar_nacimiento || "",
          direccion: pacienteData.direccion || "",
          ocupacion: pacienteData.ocupacion || "",
          telefono: pacienteData.telefono || "",
          email: pacienteData.email || "",

          //Info Meica
          recomendado_por: pacienteData.recomendado_por || "",
          medico_familiar: pacienteData.medico_familiar || "",
          hora_ultimo_alimento: pacienteData.hora_ultimo_alimento || "",
          glucosa: pacienteData.glucosa || "",
          presion_arterial: pacienteData.presion_arterial || "",

          //Motivo Consulta
          motivo_consulta: pacienteData.motivo_consulta || "",
          duracion_padecimiento: pacienteData.duracion_padecimiento || "",

          //Antecedentes Heredo-Familiares
          antecedentes_padres: pacienteData.antecedentes_padres || "",
          antecedentes_abuelos: pacienteData.antecedentes_abuelos || "",
          antecedentes_tios: pacienteData.antecedentes_tios || "",
          antecedentes_hermanos: pacienteData.antecedentes_hermanos || "",

          //Antecedentes Personales
          diabetes: pacienteData.diabetes || "NO",
          hipertension: pacienteData.hipertension || "NO",
          hepatitis: pacienteData.hepatitis || "NO",
          otras_enfermedades: pacienteData.otras_enfermedades || "",
        }}
        validationSchema={editSchema}
        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            {/*Datos Personales*/}
            <Box mb={3}>
              <Typography
                variant="h5"
                color={colors.greenAccent[400]}
                fontWeight="bold"
                mb={2}
              >
                DATOS PERSONALES
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box
                display="grid"
                gap="20px"
                gridTemplateColumns="repeat(12, 1fr)"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 12",
                  },
                }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Primer Nombre"
                  onBlur={handleBlur}
                  onChange={(e) => handleUpperCaseChange(e, handleChange)}
                  value={values.primer_nombre}
                  name="primer_nombre"
                  error={!!touched.primer_nombre && !!errors.primer_nombre}
                  helperText={touched.primer_nombre && errors.primer_nombre}
                  sx={{ gridColumn: "span 3" }}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Segundo Nombre"
                  onBlur={handleBlur}
                  onChange={(e) => handleUpperCaseChange(e, handleChange)}
                  value={values.segundo_nombre}
                  name="segundo_nombre"
                  error={!!touched.segundo_nombre && !!errors.segundo_nombre}
                  helperText={touched.segundo_nombre && errors.segundo_nombre}
                  sx={{ gridColumn: "span 3" }}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Apellido Paterno"
                  onBlur={handleBlur}
                  onChange={(e) => handleUpperCaseChange(e, handleChange)}
                  value={values.apellido_paterno}
                  name="apellido_paterno"
                  error={
                    !!touched.apellido_paterno && !!errors.apellido_paterno
                  }
                  helperText={
                    touched.apellido_paterno && errors.apellido_paterno
                  }
                  sx={{ gridColumn: "span 3" }}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Apellido Materno"
                  onBlur={handleBlur}
                  onChange={(e) => handleUpperCaseChange(e, handleChange)}
                  value={values.apellido_materno}
                  name="apellido_materno"
                  error={
                    !!touched.apellido_materno && !!errors.apellido_materno
                  }
                  helperText={
                    touched.apellido_materno && errors.apellido_materno
                  }
                  sx={{ gridColumn: "span 3" }}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  type="date"
                  label="Fecha de Nacimiento"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  value={values.fecha_nacimiento}
                  name="fecha_nacimiento"
                  error={
                    !!touched.fecha_nacimiento && !!errors.fecha_nacimiento
                  }
                  helperText={
                    touched.fecha_nacimiento && errors.fecha_nacimiento
                  }
                  sx={{ gridColumn: "span 3" }}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Edad"
                  value={
                    values.fecha_nacimiento
                      ? Math.floor(
                          (new Date() - new Date(values.fecha_nacimiento)) /
                            (365.25 * 24 * 60 * 60 * 1000)
                        )
                      : ""
                  }
                  name="edad"
                  InputProps={{ readOnly: true }}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Sexo"
                  value={
                    sexos.find((s) => s.id_sexo === values.id_sexo)
                      ?.nombre_sexo || ""
                  }
                  name="id_sexo"
                  InputProps={{ readOnly: true }}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Dirección"
                  onBlur={handleBlur}
                  onChange={(e) => handleUpperCaseChange(e, handleChange)}
                  value={values.direccion}
                  name="direccion"
                  error={!!touched.direccion && !!errors.direccion}
                  helperText={touched.direccion && errors.direccion}
                  sx={{ gridColumn: "span 12" }}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Lugar de Nacimiento"
                  onBlur={handleBlur}
                  onChange={(e) => handleUpperCaseChange(e, handleChange)}
                  value={values.lugar_nacimiento}
                  name="lugar_nacimiento"
                  error={
                    !!touched.lugar_nacimiento && !!errors.lugar_nacimiento
                  }
                  helperText={
                    touched.lugar_nacimiento && errors.lugar_nacimiento
                  }
                  sx={{ gridColumn: "span 6" }}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Ocupación"
                  onBlur={handleBlur}
                  onChange={(e) => handleUpperCaseChange(e, handleChange)}
                  value={values.ocupacion}
                  name="ocupacion"
                  error={!!touched.ocupacion && !!errors.ocupacion}
                  helperText={touched.ocupacion && errors.ocupacion}
                  sx={{ gridColumn: "span 6" }}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Teléfono"
                  onBlur={handleBlur}
                  onChange={(e) => handleNumberChange(e, handleChange)}
                  value={values.telefono}
                  name="telefono"
                  error={!!touched.telefono && !!errors.telefono}
                  helperText={touched.telefono && errors.telefono}
                  sx={{ gridColumn: "span 3" }}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  type="email"
                  label="E-mail"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 3" }}
                />
              </Box>
            </Box>

            {/*Info Medica*/}
            <Box mb={3}>
              <Typography
                variant="h5"
                color={colors.greenAccent[400]}
                fontWeight="bold"
                mb={2}
              >
                INFORMACION MEDICA
              </Typography>
              <Divider sx={{ mb: 1 }} />

              <Box
                display="grid"
                gap="20px"
                gridTemplateColumns="repeat(12, 1fr)"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 12",
                  },
                }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Recomendado por"
                  onBlur={handleBlur}
                  onChange={(e) => handleUpperCaseChange(e, handleChange)}
                  value={values.recomendado_por}
                  name="recomendado_por"
                  sx={{ gridColumn: "span 6" }}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Medico Familiar"
                  onBlur={handleBlur}
                  onChange={(e) => handleUpperCaseChange(e, handleChange)}
                  value={values.medico_familiar}
                  name="medico_familiar"
                  sx={{ gridColumn: "span 6" }}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  type="time"
                  label="Hora del Ultimo Alimento"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  value={values.hora_ultimo_alimento}
                  name="hora_ultimo_alimento"
                  sx={{ gridColumn: "span 4" }}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Glucosa"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.glucosa}
                  name="glucosa"
                  sx={{ gridColumn: "span 4" }}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Presion Arterial"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.presion_arterial}
                  name="presion_arterial"
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
            </Box>

            {/*Motico COnsulta*/}
            <Box mb={3}>
              <Typography
                variant="h5"
                color={colors.greenAccent[400]}
                fontWeight="bold"
                mb={2}
              >
                MOTIVO DE CONSULTA
              </Typography>
              <Divider sx={{ mb: 1 }} />

              <Box
                display="grid"
                gap="20px"
                gridTemplateColumns="repeat(12, 1fr)"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 12",
                  },
                }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Descripción"
                  onBlur={handleBlur}
                  onChange={(e) => handleUpperCaseChange(e, handleChange)}
                  value={values.motivo_consulta}
                  name="motivo_consulta"
                  multiline
                  rows={3}
                  sx={{ gridColumn: "span 8" }}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Duración"
                  onBlur={handleBlur}
                  onChange={(e) => handleUpperCaseChange(e, handleChange)}
                  value={values.duracion_padecimiento}
                  name="duracion_padecimiento"
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
            </Box>

            {/*Antecedentes Heredo*/}
            <Box mb={3}>
              <Typography
                variant="h5"
                color={colors.greenAccent[400]}
                fontWeight="bold"
                mb={2}
              >
                ANTECEDENTES HEREDO-FAMILIARES
              </Typography>
              <Divider sx={{ mb: 1 }} />

              <Box
                display="grid"
                gap="20px"
                gridTemplateColumns="repeat(12, 1fr)"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 12",
                  },
                }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Padres"
                  onBlur={handleBlur}
                  onChange={(e) => handleUpperCaseChange(e, handleChange)}
                  value={values.antecedentes_padres}
                  name="antecedentes_padres"
                  multiline
                  rows={2}
                  sx={{ gridColumn: "span 6" }}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Abuelos"
                  onBlur={handleBlur}
                  onChange={(e) => handleUpperCaseChange(e, handleChange)}
                  value={values.antecedentes_abuelos}
                  name="antecedentes_abuelos"
                  multiline
                  rows={2}
                  sx={{ gridColumn: "span 6" }}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Tios"
                  onBlur={handleBlur}
                  onChange={(e) => handleUpperCaseChange(e, handleChange)}
                  value={values.antecedentes_tios}
                  name="antecedentes_tios"
                  multiline
                  rows={2}
                  sx={{ gridColumn: "span 6" }}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Hermanos"
                  onBlur={handleBlur}
                  onChange={(e) => handleUpperCaseChange(e, handleChange)}
                  value={values.antecedentes_hermanos}
                  name="antecedentes_hermanos"
                  multiline
                  rows={2}
                  sx={{ gridColumn: "span 6" }}
                />
              </Box>
            </Box>

            {/*Antecedentes Personales*/}
            <Box mb={3}>
              <Typography
                variant="h5"
                color={colors.greenAccent[400]}
                fontWeight="bold"
                mb={1}
              >
                ANTECEDENTES PERSONALES Y/O PADECIMIENTO ACTUAL
              </Typography>

              <Typography variant="body1" mb={2}>
                Padece o ha padecido alguna de las sig. Enfermedades:
              </Typography>

              <Box
                display="grid"
                gap="20px"
                gridTemplateColumns="repeat(12, 1fr)"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 12",
                  },
                }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  select
                  label="Diabetes"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.diabetes}
                  name="diabetes"
                  sx={{ gridColumn: "span 3" }}
                >
                  <MenuItem value="SI">SI</MenuItem>
                  <MenuItem value="NO">NO</MenuItem>
                </TextField>

                <TextField
                  fullWidth
                  variant="outlined"
                  select
                  label="Hipertension Arterial"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.hipertension}
                  name="hipertension"
                  sx={{ gridColumn: "span 3" }}
                >
                  <MenuItem value="SI">SI</MenuItem>
                  <MenuItem value="NO">NO</MenuItem>
                </TextField>

                <TextField
                  fullWidth
                  variant="outlined"
                  select
                  label="Hepatitis"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.hepatitis}
                  name="hepatitis"
                  sx={{ gridColumn: "span 3" }}
                >
                  <MenuItem value="SI">SI</MenuItem>
                  <MenuItem value="NO">NO</MenuItem>
                </TextField>

                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Otras Enfermedades"
                  onBlur={handleBlur}
                  onChange={(e) => handleUpperCaseChange(e, handleChange)}
                  value={values.otras_enfermedades}
                  name="otras_enfermedades"
                  multiline
                  rows={3}
                  sx={{ gridColumn: "span 12" }}
                />
              </Box>
            </Box>

            <Box display="flex" justifyContent="end" mt="30px" gap="10px">
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => navigate("/pacientes")}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Actualizando..." : "Guardar Expediente"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp = /^[0-9]{10,15}$/;
const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const fechaMinima = new Date();
fechaMinima.setFullYear(fechaMinima.getFullYear() - 100);
const fechaMaxima = new Date();
fechaMaxima.setFullYear(fechaMaxima.getFullYear() - 1);

const editSchema = yup.object().shape({
  //Datos Perso
  id_sexo: yup.string().required("Debe seleccionar un sexo"),
  primer_nombre: yup
    .string()
    .matches(/^[A-Z\s]+$/, "Solo se permiten letras mayúsculas")
    .required("El primer nombre es requerido"),
  segundo_nombre: yup
    .string()
    .matches(/^[A-Z\s]*$/, "Solo se permiten letras mayúsculas"),
  apellido_paterno: yup
    .string()
    .matches(/^[A-Z\s]+$/, "Solo se permiten letras mayúsculas")
    .required("El apellido paterno es requerido"),
  apellido_materno: yup
    .string()
    .matches(/^[A-Z\s]*$/, "Solo se permiten letras mayúsculas"),
  fecha_nacimiento: yup
    .date()
    .min(fechaMinima, "La edad no puede ser mayor a 100 años")
    .max(fechaMaxima, "El paciente debe tener al menos 1 año")
    .required("La fecha de nacimiento es requerida"),
  lugar_nacimiento: yup
    .string()
    .matches(/^[A-Z\s]*$/, "Solo se permiten letras mayúsculas"),
  direccion: yup
    .string()
    .matches(/^[A-Z0-9\s,.#-]*$/, "Formato de dirección inválido")
    .required("La dirección es requerida"),
  ocupacion: yup
    .string()
    .matches(/^[A-Z\s]*$/, "Solo se permiten letras mayúsculas"),
  telefono: yup
    .string()
    .matches(phoneRegExp, "El teléfono debe tener entre 10 y 15 dígitos")
    .required("El teléfono es requerido"),
  email: yup
    .string()
    .matches(emailRegExp, "Formato de email inválido")
    .email("Email inválido"),

  //Info Medica
  recomendado_por: yup
    .string()
    .matches(/^[A-Z\s]*$/, "Solo se permiten letras mayúsculas"),
  medico_familiar: yup
    .string()
    .matches(/^[A-Z\s]*$/, "Solo se permiten letras mayúsculas"),
  hora_ultimo_alimento: yup.string(),
  glucosa: yup.string(),
  presion_arterial: yup.string(),

  //Motivo
  motivo_consulta: yup.string(),
  duracion_padecimiento: yup.string(),

  //Antecedentes Heredo-Familiares
  antecedentes_padres: yup.string(),
  antecedentes_abuelos: yup.string(),
  antecedentes_tios: yup.string(),
  antecedentes_hermanos: yup.string(),

  //Antecedentes Personales
  diabetes: yup.string().oneOf(["SI", "NO"]),
  hipertension: yup.string().oneOf(["SI", "NO"]),
  hepatitis: yup.string().oneOf(["SI", "NO"]),
  otras_enfermedades: yup.string(),
});

export default Expediente;
