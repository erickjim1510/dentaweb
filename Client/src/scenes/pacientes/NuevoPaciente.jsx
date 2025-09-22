import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api.js";

const NuevoPaciente = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const [sexos, setSexos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarOpcionesSelect();
  }, []);

  const cargarOpcionesSelect = async () => {
    try {
      setLoading(true);

      const sexosResponse = await api.get("/sexos");
      if (sexosResponse.data.success) {
        setSexos(sexosResponse.data.data);
      }
    } catch (error) {
      console.error("Error al cargar opciones:", error);
      alert("Error al cargar las opciones. Por favor, recarga la página.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (
    values,
    { setSubmitting, setFieldError, resetForm }
  ) => {
    try {
      const response = await api.post("/pacientes", values);

      if (response.data && response.data.success) {
        alert("Paciente creado exitosamente");
        resetForm();

        setTimeout(() => {
          navigate("/pacientes");
        }, 1000);
      }
    } catch (error) {
      console.error("Error al crear paciente:", error);

      if (error.response && error.response.data) {
        if (error.response.data.mensaje) {
          alert(error.response.data.mensaje);
        } else {
          alert("Error al crear el paciente");
        }
      } else {
        alert("Error de conexión con el servidor");
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
        <Header title="CREAR PACIENTE" subtitle="Cargando formulario..." />
        <Box display="flex" justifyContent="center" mt="50px">
          <p>Cargando opciones...</p>
        </Box>
      </Box>
    );
  }

  return (
    <Box m="20px">
      <Header title="CREAR PACIENTE" subtitle="Registrar un Nuevo Paciente" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
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
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                select
                label="Sexo"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.id_sexo}
                name="id_sexo"
                error={!!touched.id_sexo && !!errors.id_sexo}
                helperText={touched.id_sexo && errors.id_sexo}
                sx={{ gridColumn: "span 2" }}
              >
                {sexos.map((sexo) => (
                  <MenuItem key={sexo.id_sexo} value={sexo.id_sexo}>
                    {sexo.nombre_sexo}
                  </MenuItem>
                ))}
              </TextField>

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
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Segundo Nombre (Opcional)"
                onBlur={handleBlur}
                onChange={(e) => handleUpperCaseChange(e, handleChange)}
                value={values.segundo_nombre}
                name="segundo_nombre"
                error={!!touched.segundo_nombre && !!errors.segundo_nombre}
                helperText={touched.segundo_nombre && errors.segundo_nombre}
                sx={{ gridColumn: "span 2" }}
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
                error={!!touched.apellido_paterno && !!errors.apellido_paterno}
                helperText={touched.apellido_paterno && errors.apellido_paterno}
                sx={{ gridColumn: "span 2" }}
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
                error={!!touched.apellido_materno && !!errors.apellido_materno}
                helperText={touched.apellido_materno && errors.apellido_materno}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="outlined"
                type="date"
                label="Fecha de Nacimiento"
                InputLabelProps={{ shrink: true }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fecha_nacimiento}
                name="fecha_nacimiento"
                error={!!touched.fecha_nacimiento && !!errors.fecha_nacimiento}
                helperText={touched.fecha_nacimiento && errors.fecha_nacimiento}
                sx={{ gridColumn: "span 2" }}
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
                error={!!touched.lugar_nacimiento && !!errors.lugar_nacimiento}
                helperText={touched.lugar_nacimiento && errors.lugar_nacimiento}
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
                sx={{ gridColumn: "span 4" }}
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
                sx={{ gridColumn: "span 2" }}
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
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="outlined"
                type="email"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>

            <Box display="flex" justifyContent="end" mt="20px" gap="10px">
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => navigate(-1)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creando..." : "Crear Paciente"}
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

const checkoutSchema = yup.object().shape({
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
    .max(new Date(), "La fecha no puede ser futura")
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
});

const initialValues = {
  id_sexo: "",
  primer_nombre: "",
  segundo_nombre: "",
  apellido_paterno: "",
  apellido_materno: "",
  fecha_nacimiento: "",
  lugar_nacimiento: "",
  direccion: "",
  ocupacion: "",
  telefono: "",
  email: "",
};

export default NuevoPaciente;
