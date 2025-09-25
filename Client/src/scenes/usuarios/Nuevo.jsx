import {
  Box,
  Button,
  TextField,
  MenuItem,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api.js";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const NuevoUsuario = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [roles, setRoles] = useState([]);
  const [estados, setEstados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarOpcionesSelect();
  }, []);

  const cargarOpcionesSelect = async () => {
    try {
      setLoading(true);

      const rolesResponse = await api.get("/roles");
      if (rolesResponse.data.success) {
        setRoles(rolesResponse.data.data);
      }

      const estadosResponse = await api.get("/estados");
      if (estadosResponse.data.success) {
        setEstados(estadosResponse.data.data);
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
      const response = await api.post("/usuarios", values);

      if (response.data && response.data.success) {
        alert("Usuario creado exitosamente");
        resetForm();

        setTimeout(() => {
          navigate("/usuarios");
        }, 1000);
      }
    } catch (error) {
      console.error("Error al crear usuario:", error);

      if (error.response && error.response.data) {
        if (error.response.data.mensaje) {
          alert(error.response.data.mensaje);
        } else {
          alert("Error al crear el usuario");
        }
      } else {
        alert("Error de conexión con el servidor");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpperCaseChange = (e, handleChange, maxLength = 30) => {
    const { name, value } = e.target;
    const upperValue = value.toUpperCase().slice(0, maxLength);
    handleChange({ target: { name, value: upperValue } });
  };

  const handleNumberChange = (e, handleChange) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/[^0-9]/g, "").slice(0, 10);
    handleChange({ target: { name, value: numericValue } });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (loading) {
    return (
      <Box m="20px">
        <Header title="CREAR USUARIO" subtitle="Cargando formulario..." />
        <Box display="flex" justifyContent="center" mt="50px">
          <p>Cargando opciones...</p>
        </Box>
      </Box>
    );
  }

  return (
    <Box m="20px">
      <Header
        title="CREAR USUARIO"
        subtitle="Crear un Nuevo Perfil de Usuario"
      />

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
                type="text"
                label="Primer Nombre"
                onBlur={handleBlur}
                onChange={(e) => handleUpperCaseChange(e, handleChange, 30)}
                value={values.primer_nombre}
                name="primer_nombre"
                error={!!touched.primer_nombre && !!errors.primer_nombre}
                helperText={touched.primer_nombre && errors.primer_nombre}
                sx={{ gridColumn: "span 2" }}
                inputProps={{ maxLength: 30 }}
              />

              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Segundo Nombre (Opcional)"
                onBlur={handleBlur}
                onChange={(e) => handleUpperCaseChange(e, handleChange, 30)}
                value={values.segundo_nombre}
                name="segundo_nombre"
                error={!!touched.segundo_nombre && !!errors.segundo_nombre}
                helperText={touched.segundo_nombre && errors.segundo_nombre}
                sx={{ gridColumn: "span 2" }}
                inputProps={{ maxLength: 30 }}
              />

              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Apellido Paterno"
                onBlur={handleBlur}
                onChange={(e) => handleUpperCaseChange(e, handleChange, 30)}
                value={values.apellido_paterno}
                name="apellido_paterno"
                error={!!touched.apellido_paterno && !!errors.apellido_paterno}
                helperText={touched.apellido_paterno && errors.apellido_paterno}
                sx={{ gridColumn: "span 2" }}
                inputProps={{ maxLength: 30 }}
              />

              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Apellido Materno"
                onBlur={handleBlur}
                onChange={(e) => handleUpperCaseChange(e, handleChange, 30)}
                value={values.apellido_materno}
                name="apellido_materno"
                error={!!touched.apellido_materno && !!errors.apellido_materno}
                helperText={touched.apellido_materno && errors.apellido_materno}
                sx={{ gridColumn: "span 2" }}
                inputProps={{ maxLength: 30 }}
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
                sx={{ gridColumn: "span 2" }}
                inputProps={{ maxLength: 30 }}
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
                inputProps={{ maxLength: 10 }}
              />

              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Nombre de Usuario"
                onBlur={handleBlur}
                onChange={(e) => handleUpperCaseChange(e, handleChange, 30)}
                value={values.nombre_usuario}
                name="nombre_usuario"
                error={!!touched.nombre_usuario && !!errors.nombre_usuario}
                helperText={touched.nombre_usuario && errors.nombre_usuario}
                sx={{ gridColumn: "span 2" }}
                inputProps={{ maxLength: 30 }}
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
                inputProps={{
                  min: "1900-01-01",
                  max: new Date().toISOString().split("T")[0],
                }}
              />

              <TextField
                fullWidth
                variant="outlined"
                type={showPassword ? "text" : "password"}
                label="Contraseña"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contrasena_hash}
                name="contrasena_hash"
                error={!!touched.contrasena_hash && !!errors.contrasena_hash}
                helperText={touched.contrasena_hash && errors.contrasena_hash}
                sx={{ gridColumn: "span 4" }}
                inputProps={{ maxLength: 30 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={togglePasswordVisibility}
                        edge="end"
                        sx={{ color: "black" }}
                      >
                        {showPassword ? (
                          <VisibilityOff sx={{ color: "black" }} />
                        ) : (
                          <Visibility sx={{ color: "black" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                variant="outlined"
                select
                label="Rol"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.id_rol}
                name="id_rol"
                error={!!touched.id_rol && !!errors.id_rol}
                helperText={touched.id_rol && errors.id_rol}
                sx={{ gridColumn: "span 2" }}
              >
                {roles.map((rol) => (
                  <MenuItem key={rol.id_rol} value={rol.id_rol}>
                    {rol.nombre_rol}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                fullWidth
                variant="outlined"
                select
                label="Estado"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.id_estado}
                name="id_estado"
                error={!!touched.id_estado && !!errors.id_estado}
                helperText={touched.id_estado && errors.id_estado}
                sx={{ gridColumn: "span 2" }}
              >
                {estados.map((estado) => (
                  <MenuItem key={estado.id_estado} value={estado.id_estado}>
                    {estado.nombre_estado}
                  </MenuItem>
                ))}
              </TextField>
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
                {isSubmitting ? "Creando..." : "Crear Usuario"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp = /^[0-9]{10}$/;
const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fechaMinima = new Date("1925-01-01");
const fechaMaxima = new Date();
fechaMaxima.setFullYear(fechaMaxima.getFullYear() - 18);

const checkoutSchema = yup.object().shape({
  primer_nombre: yup
    .string()
    .max(30, "Máximo 30 caracteres")
    .matches(/^[A-ZÑ\s]+$/, "Solo se permiten letras mayúsculas")
    .required("El primer nombre es requerido"),
  segundo_nombre: yup
    .string()
    .max(30, "Máximo 30 caracteres")
    .matches(/^[A-ZÑ\s]*$/, "Solo se permiten letras mayúsculas"),
  apellido_paterno: yup
    .string()
    .max(30, "Máximo 30 caracteres")
    .matches(/^[A-ZÑ\s]+$/, "Solo se permiten letras mayúsculas")
    .required("El apellido paterno es requerido"),
  apellido_materno: yup
    .string()
    .max(30, "Máximo 30 caracteres")
    .matches(/^[A-ZÑ\s]+$/, "Solo se permiten letras mayúsculas")
    .required("El apellido materno es requerido"),
  email: yup
    .string()
    .matches(emailRegExp, "Formato de email inválido")
    .email("Email inválido")
    .max(30, "Máximo 30 caracteres")
    .required("El email es requerido"),
  telefono: yup
    .string()
    .matches(phoneRegExp, "El teléfono debe tener exactamente 10 dígitos")
    .required("El teléfono es requerido"),
  nombre_usuario: yup
    .string()
    .max(30, "Máximo 30 caracteres")
    .matches(/^[A-ZÑ0-9\s]+$/, "Solo se permiten letras mayúsculas y números")
    .required("El nombre de usuario es requerido"),
  fecha_nacimiento: yup
    .date()
    .min(fechaMinima, "La fecha no puede ser anterior a 1925")
    .max(fechaMaxima, "El usuario debe ser mayor de 18 años")
    .required("La fecha de nacimiento es requerida"),
  contrasena_hash: yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(30, "Máximo 30 caracteres")
    .required("La contraseña es requerida"),
  id_rol: yup.string().required("Debe seleccionar un rol"),
  id_estado: yup.string().required("Debe seleccionar un estado"),
});

const initialValues = {
  primer_nombre: "",
  segundo_nombre: "",
  apellido_paterno: "",
  apellido_materno: "",
  email: "",
  telefono: "",
  nombre_usuario: "",
  fecha_nacimiento: "",
  contrasena_hash: "",
  id_rol: "",
  id_estado: "",
};

export default NuevoUsuario;
