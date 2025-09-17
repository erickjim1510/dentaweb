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

const NuevoUsuario = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  // Estados para opciones de select
  const [roles, setRoles] = useState([]);
  const [estados, setEstados] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar roles y estados al montar el componente
  useEffect(() => {
    cargarOpcionesSelect();
  }, []);

  const cargarOpcionesSelect = async () => {
    try {
      setLoading(true);

      // Cargar roles desde la API
      const rolesResponse = await api.get("/roles");
      if (rolesResponse.data.success) {
        setRoles(rolesResponse.data.data);
      }

      // Cargar estados desde la API
      const estadosResponse = await api.get("/estados");
      if (estadosResponse.data.success) {
        setEstados(estadosResponse.data.data);
      }
    } catch (error) {
      console.error("Error al cargar opciones:", error);
      // En caso de error, puedes mostrar un mensaje o usar datos por defecto
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

        // Opcional: redirigir después de crear
        setTimeout(() => {
          navigate("/usuarios"); // Ajusta esta ruta según tu aplicación
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

  // Mostrar loading mientras se cargan los datos
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
              {/* Primer Nombre */}
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Primer Nombre"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.primer_nombre}
                name="primer_nombre"
                error={!!touched.primer_nombre && !!errors.primer_nombre}
                helperText={touched.primer_nombre && errors.primer_nombre}
                sx={{ gridColumn: "span 2" }}
              />

              {/* Segundo Nombre */}
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Segundo Nombre (Opcional)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.segundo_nombre}
                name="segundo_nombre"
                error={!!touched.segundo_nombre && !!errors.segundo_nombre}
                helperText={touched.segundo_nombre && errors.segundo_nombre}
                sx={{ gridColumn: "span 2" }}
              />

              {/* Apellido Paterno */}
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Apellido Paterno"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.apellido_paterno}
                name="apellido_paterno"
                error={!!touched.apellido_paterno && !!errors.apellido_paterno}
                helperText={touched.apellido_paterno && errors.apellido_paterno}
                sx={{ gridColumn: "span 2" }}
              />

              {/* Apellido Materno */}
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Apellido Materno"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.apellido_materno}
                name="apellido_materno"
                error={!!touched.apellido_materno && !!errors.apellido_materno}
                helperText={touched.apellido_materno && errors.apellido_materno}
                sx={{ gridColumn: "span 2" }}
              />

              {/* Email */}
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
              />

              {/* Teléfono */}
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Teléfono"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.telefono}
                name="telefono"
                error={!!touched.telefono && !!errors.telefono}
                helperText={touched.telefono && errors.telefono}
                sx={{ gridColumn: "span 2" }}
              />

              {/* Nombre de Usuario */}
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Nombre de Usuario"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nombre_usuario}
                name="nombre_usuario"
                error={!!touched.nombre_usuario && !!errors.nombre_usuario}
                helperText={touched.nombre_usuario && errors.nombre_usuario}
                sx={{ gridColumn: "span 2" }}
              />

              {/* Fecha de Nacimiento */}
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

              {/* Contraseña */}
              <TextField
                fullWidth
                variant="outlined"
                type="password"
                label="Contraseña"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contrasena_hash}
                name="contrasena_hash"
                error={!!touched.contrasena_hash && !!errors.contrasena_hash}
                helperText={touched.contrasena_hash && errors.contrasena_hash}
                sx={{ gridColumn: "span 4" }}
              />

              {/* Rol */}
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

              {/* Estado */}
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

            {/* Botones */}
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

// Expresión regular para validar teléfono
const phoneRegExp = /^[0-9]{10,}$/;

// Schema de validación con Yup
const checkoutSchema = yup.object().shape({
  primer_nombre: yup.string().required("El primer nombre es requerido"),
  segundo_nombre: yup.string(),
  apellido_paterno: yup.string().required("El apellido paterno es requerido"),
  apellido_materno: yup.string().required("El apellido materno es requerido"),
  email: yup.string().email("Email inválido").required("El email es requerido"),
  telefono: yup
    .string()
    .matches(phoneRegExp, "El teléfono debe tener al menos 10 dígitos")
    .required("El teléfono es requerido"),
  nombre_usuario: yup.string().required("El nombre de usuario es requerido"),
  fecha_nacimiento: yup.date().required("La fecha de nacimiento es requerida"),
  contrasena_hash: yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
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
