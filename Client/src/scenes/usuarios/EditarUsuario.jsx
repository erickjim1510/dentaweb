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
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api.js";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const EditarUsuario = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const { id } = useParams();
  const [showPassword, setShowPassword] = useState(false);

  const [roles, setRoles] = useState([]);
  const [estados, setEstados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usuarioData, setUsuarioData] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, [id]);

  const cargarDatos = async () => {
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

      const usuarioResponse = await api.get(`/usuarios/${id}`);
      if (usuarioResponse.data.success) {
        setUsuarioData(usuarioResponse.data.data);
      } else {
        alert("Usuario no encontrado");
        navigate("/usuarios");
      }
    } catch (error) {
      console.error("Error al cargar datos:", error);
      alert("Error al cargar los datos. Por favor, recarga la página.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await api.put(`/usuarios/${id}`, values);

      if (response.data && response.data.success) {
        alert("Usuario actualizado exitosamente");
        navigate("/usuarios");
      }
    } catch (error) {
      console.error("Error al actualizar usuario:", error);

      if (error.response && error.response.data) {
        if (error.response.data.mensaje) {
          alert(error.response.data.mensaje);
        } else {
          alert("Error al actualizar el usuario");
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
    const numericValue = value.replace(/[^0-9]/g, "").slice(0, 10);
    handleChange({ target: { name, value: numericValue } });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (loading) {
    return (
      <Box m="20px">
        <Header title="EDITAR USUARIO" subtitle="Cargando datos..." />
        <Box display="flex" justifyContent="center" mt="50px">
          <p>Cargando...</p>
        </Box>
      </Box>
    );
  }

  if (!usuarioData) {
    return (
      <Box m="20px">
        <Header title="ERROR" subtitle="Usuario no encontrado" />
      </Box>
    );
  }

  return (
    <Box m="20px">
      <Header
        title="EDITAR USUARIO"
        subtitle="Visualizar y Editar Perfil de Usuario"
      />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{
          primer_nombre: usuarioData.primer_nombre || "",
          segundo_nombre: usuarioData.segundo_nombre || "",
          apellido_paterno: usuarioData.apellido_paterno || "",
          apellido_materno: usuarioData.apellido_materno || "",
          email: usuarioData.email || "",
          telefono: usuarioData.telefono || "",
          nombre_usuario: usuarioData.nombre_usuario || "",
          fecha_nacimiento: usuarioData.fecha_nacimiento || "",
          contrasena_hash: usuarioData.contrasena_hash,
          id_rol: usuarioData.id_rol || "",
          id_estado: usuarioData.id_estado || "",
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
                type="text"
                label="Nombre de Usuario"
                onBlur={handleBlur}
                onChange={(e) => handleUpperCaseChange(e, handleChange)}
                value={values.nombre_usuario}
                name="nombre_usuario"
                error={!!touched.nombre_usuario && !!errors.nombre_usuario}
                helperText={touched.nombre_usuario && errors.nombre_usuario}
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
                InputProps={{ readOnly: true }}
              />

              <TextField
                fullWidth
                variant="outlined"
                type={showPassword ? "text" : "password"}
                label="Contraseña (dejar vacío para mantener actual)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contrasena_hash}
                name="contrasena_hash"
                error={!!touched.contrasena_hash && !!errors.contrasena_hash}
                helperText={touched.contrasena_hash && errors.contrasena_hash}
                sx={{ gridColumn: "span 4" }}
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
                onClick={() => navigate("/usuarios")}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Actualizando..." : "Actualizar Usuario"}
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
const mayoredad = new Date();
mayoredad.setFullYear(mayoredad.getFullYear() - 18);

const editSchema = yup.object().shape({
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
    .matches(/^[A-Z\s]+$/, "Solo se permiten letras mayúsculas")
    .required("El apellido materno es requerido"),
  email: yup
    .string()
    .matches(emailRegExp, "Formato de email inválido")
    .email("Email inválido")
    .required("El email es requerido"),
  telefono: yup
    .string()
    .matches(phoneRegExp, "El teléfono debe tener exactamente 10 dígitos")
    .required("El teléfono es requerido"),
  nombre_usuario: yup
    .string()
    .matches(/^[A-Z0-9\s]+$/, "Solo se permiten letras mayúsculas y números")
    .required("El nombre de usuario es requerido"),
  fecha_nacimiento: yup
    .date()
    .max(mayoredad, "El usuario debe ser mayor de 18 años")
    .required("La fecha de nacimiento es requerida"),
  contrasena_hash: yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  id_rol: yup.string().required("Debe seleccionar un rol"),
  id_estado: yup.string().required("Debe seleccionar un estado"),
});

export default EditarUsuario;
