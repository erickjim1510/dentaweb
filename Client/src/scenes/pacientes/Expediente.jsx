import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Divider,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  FormGroup,
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

  const CustomRadio = (props) => (
    <Radio
      {...props}
      sx={{
        color: "#1a1a1a",
        "&.Mui-checked": {
          color: colors.greenAccent[600],
        },
        "& .MuiSvgIcon-root": {
          fontSize: 20,
        },
      }}
    />
  );

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
          recomendado_por: pacienteData.recomendado_por || "",
          medico_familiar: pacienteData.medico_familiar || "",
          hora_ultimo_alimento: pacienteData.hora_ultimo_alimento || "",
          glucosa: pacienteData.glucosa || "",
          presion_arterial: pacienteData.presion_arterial || "",
          motivo_consulta: pacienteData.motivo_consulta || "",
          duracion_padecimiento: pacienteData.duracion_padecimiento || "",
          antecedentes_padres: pacienteData.antecedentes_padres || "",
          antecedentes_abuelos: pacienteData.antecedentes_abuelos || "",
          antecedentes_tios: pacienteData.antecedentes_tios || "",
          antecedentes_hermanos: pacienteData.antecedentes_hermanos || "",
          diabetes: pacienteData.diabetes || "NO",
          infartos: pacienteData.infartos || "NO",
          anemia: pacienteData.anemia || "NO",
          enf_rinon: pacienteData.enf_rinon || "NO",
          vih_sida: pacienteData.vih_sida || "NO",
          artritis_reumatica: pacienteData.artritis_reumatica || "NO",
          hipertension: pacienteData.hipertension || "NO",
          migrania: pacienteData.migrania || "NO",
          asma_bronquial: pacienteData.asma_bronquial || "NO",
          enf_tiroides: pacienteData.enf_tiroides || "NO",
          cancer: pacienteData.cancer || "NO",
          fiebre_reumatica: pacienteData.fiebre_reumatica || "NO",
          hepatitis: pacienteData.hepatitis || "NO",
          tuberculos: pacienteData.tuberculos || "NO",
          epilepsia: pacienteData.epilepsia || "NO",
          enf_respiratorias: pacienteData.enf_respiratorias || "NO",
          mareos: pacienteData.mareos || "NO",
          lupus: pacienteData.lupus || "NO",
          enfermedades_infancia: pacienteData.enfermedades_infancia || "NO",
          enfermedades_infancia_detalle:
            pacienteData.enfermedades_infancia_detalle || "",
          covid19: pacienteData.covid19 || "NO",
          covid19_tratamiento: pacienteData.covid19_tratamiento || "",
          otras_enfermedades: pacienteData.otras_enfermedades || "",
          consume_medicamento: pacienteData.consume_medicamento || "NO",
          medicamento_detalle: pacienteData.medicamento_detalle || "",
          dolores_cabeza: pacienteData.dolores_cabeza || "NO",
          alergico_sustancia: pacienteData.alergico_sustancia || "NO",
          alergico_sustancia_detalle:
            pacienteData.alergico_sustancia_detalle || "",
          intervencion_quirurgica: pacienteData.intervencion_quirurgica || "NO",
          intervencion_quirurgica_detalle:
            pacienteData.intervencion_quirurgica_detalle || "",
          sangra_excesivamente: pacienteData.sangra_excesivamente || "NO",
          embarazada: pacienteData.embarazada || "NO",
          enfermedad_grave_reciente:
            pacienteData.enfermedad_grave_reciente || "NO",
          enfermedad_grave_detalle: pacienteData.enfermedad_grave_detalle || "",
          consume_alcohol: pacienteData.consume_alcohol || "NO",
          fuma: pacienteData.fuma || "NO",
          fecha_ultima_visita_dental:
            pacienteData.fecha_ultima_visita_dental || "",
          motivo_visita_dental: pacienteData.motivo_visita_dental || "",
          cepillado_diario: pacienteData.cepillado_diario || "",
          usa_aditamento_dental: pacienteData.usa_aditamento_dental || "NO",
          aditamento_dental_detalle:
            pacienteData.aditamento_dental_detalle || "",
          reaccion_anestesia: pacienteData.reaccion_anestesia || "NO",
          molestia_boca: pacienteData.molestia_boca || "NO",
          mal_sabor_boca: pacienteData.mal_sabor_boca || "NO",
          sangrado_encias: pacienteData.sangrado_encias || "NO",
          dientes_moviles: pacienteData.dientes_moviles || "NO",
          ruido_boca: pacienteData.ruido_boca || "NO",
          habitos_orofaciales: pacienteData.habitos_orofaciales || "",
          respira_boca: pacienteData.respira_boca || "NO",
          consentimiento_informado:
            pacienteData.consentimiento_informado || "NO",
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
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
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
                  InputProps={{ readOnly: true }}
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
                  InputProps={{ readOnly: true }}
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
                  InputProps={{ readOnly: true }}
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
                  InputProps={{ readOnly: true }}
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
                  InputProps={{ readOnly: true }}
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
                  InputProps={{ readOnly: true }}
                  value={
                    values.fecha_nacimiento
                      ? Math.floor(
                          (new Date() - new Date(values.fecha_nacimiento)) /
                            (365.25 * 24 * 60 * 60 * 1000)
                        )
                      : ""
                  }
                  name="edad"
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
                  InputProps={{ readOnly: true }}
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
                  InputProps={{ readOnly: true }}
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
                  InputProps={{ readOnly: true }}
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
                  InputProps={{ readOnly: true }}
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
                  InputProps={{ readOnly: true }}
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
                  inputProps={{ maxLength: 30 }}
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
                  inputProps={{ maxLength: 30 }}
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
                  InputProps={{
                    endAdornment: (
                      <Typography
                        variant="body2"
                        sx={{
                          color: colors.grey[100],
                          fontWeight: "500",
                          ml: 1,
                        }}
                      >
                        mg/dL
                      </Typography>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Presión Arterial"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.presion_arterial}
                  name="presion_arterial"
                  sx={{ gridColumn: "span 4" }}
                  InputProps={{
                    endAdornment: (
                      <Typography
                        variant="body2"
                        sx={{
                          color: colors.grey[100],
                          fontWeight: "500",
                          ml: 1,
                        }}
                      >
                        mmHg
                      </Typography>
                    ),
                  }}
                />
              </Box>
            </Box>

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
                  inputProps={{ maxLength: 50 }}
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
                  inputProps={{ maxLength: 30 }}
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
                  inputProps={{ maxLength: 30 }}
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
                  inputProps={{ maxLength: 30 }}
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
                  inputProps={{ maxLength: 30 }}
                />
              </Box>
            </Box>

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
                gap="15px"
                gridTemplateColumns="repeat(12, 1fr)"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 12",
                  },
                }}
              >
                <Box
                  sx={{
                    gridColumn: "span 4",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ minWidth: "150px" }}>Diabetes</Typography>
                  <RadioGroup
                    row
                    name="diabetes"
                    value={values.diabetes}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="SI"
                      control={<CustomRadio size="small" />}
                      label="SI"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<CustomRadio size="small" />}
                      label="NO"
                    />
                  </RadioGroup>
                </Box>
                <Box
                  sx={{
                    gridColumn: "span 4",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ minWidth: "150px" }}>
                    Hipertensión Arterial
                  </Typography>
                  <RadioGroup
                    row
                    name="hipertension"
                    value={values.hipertension}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="SI"
                      control={<CustomRadio size="small" />}
                      label="SI"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<CustomRadio size="small" />}
                      label="NO"
                    />
                  </RadioGroup>
                </Box>
                <Box
                  sx={{
                    gridColumn: "span 4",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ minWidth: "150px" }}>Hepatitis</Typography>
                  <RadioGroup
                    row
                    name="hepatitis"
                    value={values.hepatitis}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="SI"
                      control={<CustomRadio size="small" />}
                      label="SI"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<CustomRadio size="small" />}
                      label="NO"
                    />
                  </RadioGroup>
                </Box>
                <Box
                  sx={{
                    gridColumn: "span 4",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ minWidth: "150px" }}>Infartos</Typography>
                  <RadioGroup
                    row
                    name="infartos"
                    value={values.infartos}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="SI"
                      control={<CustomRadio size="small" />}
                      label="SI"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<CustomRadio size="small" />}
                      label="NO"
                    />
                  </RadioGroup>
                </Box>
                <Box
                  sx={{
                    gridColumn: "span 4",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ minWidth: "150px" }}>Migraña</Typography>
                  <RadioGroup
                    row
                    name="migrania"
                    value={values.migrania}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="SI"
                      control={<CustomRadio size="small" />}
                      label="SI"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<CustomRadio size="small" />}
                      label="NO"
                    />
                  </RadioGroup>
                </Box>
                <Box
                  sx={{
                    gridColumn: "span 4",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ minWidth: "150px" }}>Tuberculos</Typography>
                  <RadioGroup
                    row
                    name="tuberculos"
                    value={values.tuberculos}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="SI"
                      control={<CustomRadio size="small" />}
                      label="SI"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<CustomRadio size="small" />}
                      label="NO"
                    />
                  </RadioGroup>
                </Box>
                <Box
                  sx={{
                    gridColumn: "span 4",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ minWidth: "150px" }}>Anemia</Typography>
                  <RadioGroup
                    row
                    name="anemia"
                    value={values.anemia}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="SI"
                      control={<CustomRadio size="small" />}
                      label="SI"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<CustomRadio size="small" />}
                      label="NO"
                    />
                  </RadioGroup>
                </Box>
                <Box
                  sx={{
                    gridColumn: "span 4",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ minWidth: "150px" }}>
                    Asma Bronquial
                  </Typography>
                  <RadioGroup
                    row
                    name="asma_bronquial"
                    value={values.asma_bronquial}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="SI"
                      control={<CustomRadio size="small" />}
                      label="SI"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<CustomRadio size="small" />}
                      label="NO"
                    />
                  </RadioGroup>
                </Box>
                <Box
                  sx={{
                    gridColumn: "span 4",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ minWidth: "150px" }}>Epilepsia</Typography>
                  <RadioGroup
                    row
                    name="epilepsia"
                    value={values.epilepsia}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="SI"
                      control={<CustomRadio size="small" />}
                      label="SI"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<CustomRadio size="small" />}
                      label="NO"
                    />
                  </RadioGroup>
                </Box>
                <Box
                  sx={{
                    gridColumn: "span 4",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ minWidth: "150px" }}>
                    Enf. De Riñón
                  </Typography>
                  <RadioGroup
                    row
                    name="enf_rinon"
                    value={values.enf_rinon}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="SI"
                      control={<CustomRadio size="small" />}
                      label="SI"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<CustomRadio size="small" />}
                      label="NO"
                    />
                  </RadioGroup>
                </Box>
                <Box
                  sx={{
                    gridColumn: "span 4",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ minWidth: "150px" }}>
                    Enf. De Tiroides
                  </Typography>
                  <RadioGroup
                    row
                    name="enf_tiroides"
                    value={values.enf_tiroides}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="SI"
                      control={<CustomRadio size="small" />}
                      label="SI"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<CustomRadio size="small" />}
                      label="NO"
                    />
                  </RadioGroup>
                </Box>
                <Box
                  sx={{
                    gridColumn: "span 4",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ minWidth: "150px" }}>
                    Enf. Respiratorias
                  </Typography>
                  <RadioGroup
                    row
                    name="enf_respiratorias"
                    value={values.enf_respiratorias}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="SI"
                      control={<CustomRadio size="small" />}
                      label="SI"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<CustomRadio size="small" />}
                      label="NO"
                    />
                  </RadioGroup>
                </Box>
                <Box
                  sx={{
                    gridColumn: "span 4",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ minWidth: "150px" }}>VIH/Sida</Typography>
                  <RadioGroup
                    row
                    name="vih_sida"
                    value={values.vih_sida}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="SI"
                      control={<CustomRadio size="small" />}
                      label="SI"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<CustomRadio size="small" />}
                      label="NO"
                    />
                  </RadioGroup>
                </Box>
                <Box
                  sx={{
                    gridColumn: "span 4",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ minWidth: "150px" }}>Cáncer</Typography>
                  <RadioGroup
                    row
                    name="cancer"
                    value={values.cancer}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="SI"
                      control={<CustomRadio size="small" />}
                      label="SI"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<CustomRadio size="small" />}
                      label="NO"
                    />
                  </RadioGroup>
                </Box>
                <Box
                  sx={{
                    gridColumn: "span 4",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ minWidth: "150px" }}>Mareos</Typography>
                  <RadioGroup
                    row
                    name="mareos"
                    value={values.mareos}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="SI"
                      control={<CustomRadio size="small" />}
                      label="SI"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<CustomRadio size="small" />}
                      label="NO"
                    />
                  </RadioGroup>
                </Box>
                <Box
                  sx={{
                    gridColumn: "span 4",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ minWidth: "150px" }}>
                    Artritis Reumática
                  </Typography>
                  <RadioGroup
                    row
                    name="artritis_reumatica"
                    value={values.artritis_reumatica}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="SI"
                      control={<CustomRadio size="small" />}
                      label="SI"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<CustomRadio size="small" />}
                      label="NO"
                    />
                  </RadioGroup>
                </Box>
                <Box
                  sx={{
                    gridColumn: "span 4",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ minWidth: "150px" }}>
                    Fiebre Reumática
                  </Typography>
                  <RadioGroup
                    row
                    name="fiebre_reumatica"
                    value={values.fiebre_reumatica}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="SI"
                      control={<CustomRadio size="small" />}
                      label="SI"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<CustomRadio size="small" />}
                      label="NO"
                    />
                  </RadioGroup>
                </Box>
                <Box
                  sx={{
                    gridColumn: "span 4",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ minWidth: "150px" }}>Lupus</Typography>
                  <RadioGroup
                    row
                    name="lupus"
                    value={values.lupus}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="SI"
                      control={<CustomRadio size="small" />}
                      label="SI"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<CustomRadio size="small" />}
                      label="NO"
                    />
                  </RadioGroup>
                </Box>

                <Box sx={{ gridColumn: "span 8" }}>
                  <Typography mb={1}>
                    Enfermedades de la infancia: ej: varicela, rubeola, paperas
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <RadioGroup
                      row
                      name="enfermedades_infancia"
                      value={values.enfermedades_infancia}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="SI"
                        control={<CustomRadio size="small" />}
                        label="SI"
                      />
                      <FormControlLabel
                        value="NO"
                        control={<CustomRadio size="small" />}
                        label="NO"
                      />
                    </RadioGroup>

                    {values.enfermedades_infancia === "SI" && (
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="text"
                        label="Explique"
                        onBlur={handleBlur}
                        onChange={(e) => handleUpperCaseChange(e, handleChange)}
                        value={values.enfermedades_infancia_detalle}
                        name="enfermedades_infancia_detalle"
                        inputProps={{ maxLength: 30 }}
                      />
                    )}
                  </Box>
                </Box>

                <Box sx={{ gridColumn: "span 8" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 1,
                    }}
                  >
                    <Typography sx={{ minWidth: "150px" }}>COVID-19</Typography>
                    <RadioGroup
                      row
                      name="covid19"
                      value={values.covid19}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="SI"
                        control={<CustomRadio size="small" />}
                        label="SI"
                      />
                      <FormControlLabel
                        value="NO"
                        control={<CustomRadio size="small" />}
                        label="NO"
                      />
                    </RadioGroup>
                  </Box>

                  {values.covid19 === "SI" && (
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      label="Tratamiento"
                      onBlur={handleBlur}
                      onChange={(e) => handleUpperCaseChange(e, handleChange)}
                      value={values.covid19_tratamiento}
                      name="covid19_tratamiento"
                      inputProps={{ maxLength: 30 }}
                    />
                  )}
                </Box>

                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Otras Enfermedades - Explique"
                  onBlur={handleBlur}
                  onChange={(e) => handleUpperCaseChange(e, handleChange)}
                  value={values.otras_enfermedades}
                  name="otras_enfermedades"
                  multiline
                  rows={2}
                  sx={{ gridColumn: "span 8" }}
                  inputProps={{ maxLength: 30 }}
                />

                <Box
                  sx={{
                    gridColumn: "span 8",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ minWidth: "250px" }}>
                    ¿Consume algún medicamento?:
                  </Typography>
                  <RadioGroup
                    row
                    name="consume_medicamento"
                    value={values.consume_medicamento}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="SI"
                      control={<CustomRadio size="small" />}
                      label="SI"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<CustomRadio size="small" />}
                      label="NO"
                    />
                  </RadioGroup>
                </Box>
                {values.consume_medicamento === "SI" && (
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="¿Cuál?"
                    onBlur={handleBlur}
                    onChange={(e) => handleUpperCaseChange(e, handleChange)}
                    value={values.medicamento_detalle}
                    name="medicamento_detalle"
                    sx={{ gridColumn: "span 8" }}
                    inputProps={{ maxLength: 30 }}
                  />
                )}

                <Box
                  sx={{
                    gridColumn: "span 8",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ minWidth: "350px" }}>
                    ¿Sufre con frecuencia dolores de cabeza?
                  </Typography>
                  <RadioGroup
                    row
                    name="dolores_cabeza"
                    value={values.dolores_cabeza}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="SI"
                      control={<CustomRadio size="small" />}
                      label="SI"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<CustomRadio size="small" />}
                      label="NO"
                    />
                  </RadioGroup>
                </Box>

                <Box
                  sx={{
                    gridColumn: "span 8",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ minWidth: "350px" }}>
                    ¿Es alérgico a alguna sustancia o medicamento? (Ej.
                    Penicilina)
                  </Typography>
                  <RadioGroup
                    row
                    name="alergico_sustancia"
                    value={values.alergico_sustancia}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="SI"
                      control={<CustomRadio size="small" />}
                      label="SI"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<CustomRadio size="small" />}
                      label="NO"
                    />
                  </RadioGroup>
                </Box>
                {values.alergico_sustancia === "SI" && (
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="¿Cuál?"
                    onBlur={handleBlur}
                    onChange={(e) => handleUpperCaseChange(e, handleChange)}
                    value={values.alergico_sustancia_detalle}
                    name="alergico_sustancia_detalle"
                    sx={{ gridColumn: "span 8" }}
                    inputProps={{ maxLength: 30 }}
                  />
                )}

                <Box
                  sx={{
                    gridColumn: "span 8",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ minWidth: "350px" }}>
                    ¿Ha sido intervenido quirúrgicamente alguna vez?
                  </Typography>
                  <RadioGroup
                    row
                    name="intervencion_quirurgica"
                    value={values.intervencion_quirurgica}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="SI"
                      control={<CustomRadio size="small" />}
                      label="SI"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<CustomRadio size="small" />}
                      label="NO"
                    />
                  </RadioGroup>
                </Box>
                {values.intervencion_quirurgica === "SI" && (
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="¿Cuándo y de qué?"
                    onBlur={handleBlur}
                    onChange={(e) => handleUpperCaseChange(e, handleChange)}
                    value={values.intervencion_quirurgica_detalle}
                    name="intervencion_quirurgica_detalle"
                    sx={{ gridColumn: "span 8" }}
                    inputProps={{ maxLength: 30 }}
                  />
                )}

                <Box
                  sx={{
                    gridColumn: "span 8",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ minWidth: "350px" }}>
                    ¿Sangra excesivamente cuando sufre un corte?:
                  </Typography>
                  <RadioGroup
                    row
                    name="sangra_excesivamente"
                    value={values.sangra_excesivamente}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="SI"
                      control={<CustomRadio size="small" />}
                      label="SI"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<CustomRadio size="small" />}
                      label="NO"
                    />
                  </RadioGroup>
                </Box>

                <Box
                  sx={{
                    gridColumn: "span 8",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ minWidth: "250px" }}>
                    ¿Está Ud. Embarazada?
                  </Typography>
                  <RadioGroup
                    row
                    name="embarazada"
                    value={values.embarazada}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="SI"
                      control={<CustomRadio size="small" />}
                      label="SI"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<CustomRadio size="small" />}
                      label="NO"
                    />
                  </RadioGroup>
                </Box>

                <Box
                  sx={{
                    gridColumn: "span 8",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ minWidth: "350px" }}>
                    ¿Padeció alguna enfermedad grave recientemente?
                  </Typography>
                  <RadioGroup
                    row
                    name="enfermedad_grave_reciente"
                    value={values.enfermedad_grave_reciente}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="SI"
                      control={<CustomRadio size="small" />}
                      label="SI"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<CustomRadio size="small" />}
                      label="NO"
                    />
                  </RadioGroup>
                </Box>
                {values.enfermedad_grave_reciente === "SI" && (
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="¿Cuál?"
                    onBlur={handleBlur}
                    onChange={(e) => handleUpperCaseChange(e, handleChange)}
                    value={values.enfermedad_grave_detalle}
                    name="enfermedad_grave_detalle"
                    sx={{ gridColumn: "span 8" }}
                    inputProps={{ maxLength: 30 }}
                  />
                )}

                <Box
                  sx={{
                    gridColumn: "span 6",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ minWidth: "200px" }}>
                    ¿Consume Ud. Alcohol?
                  </Typography>
                  <RadioGroup
                    row
                    name="consume_alcohol"
                    value={values.consume_alcohol}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="SI"
                      control={<CustomRadio size="small" />}
                      label="SI"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<CustomRadio size="small" />}
                      label="NO"
                    />
                  </RadioGroup>
                </Box>
                <Box
                  sx={{
                    gridColumn: "span 6",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ minWidth: "150px" }}>¿Fuma?</Typography>
                  <RadioGroup
                    row
                    name="fuma"
                    value={values.fuma}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="SI"
                      control={<CustomRadio size="small" />}
                      label="SI"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<CustomRadio size="small" />}
                      label="NO"
                    />
                  </RadioGroup>
                </Box>
              </Box>
            </Box>

            <Box mb={3}>
              <Typography
                variant="h5"
                color={colors.greenAccent[400]}
                fontWeight="bold"
                mb={2}
              >
                HISTORIA BUCAL Y DENTAL
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
                  type="date"
                  label="Fecha de la última visita dental"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  value={values.fecha_ultima_visita_dental || ""}
                  name="fecha_ultima_visita_dental"
                  sx={{ gridColumn: "span 6" }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="Motivo"
                  onBlur={handleBlur}
                  onChange={(e) => handleUpperCaseChange(e, handleChange)}
                  value={values.motivo_visita_dental || ""}
                  name="motivo_visita_dental"
                  sx={{ gridColumn: "span 6" }}
                  inputProps={{ maxLength: 30 }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  type="number"
                  label="¿Cuántas veces al día se cepilla sus dientes?"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cepillado_diario || ""}
                  name="cepillado_diario"
                  inputProps={{ min: 0, max: 10 }}
                  sx={{ gridColumn: "span 12" }}
                />

                <Box
                  sx={{
                    gridColumn: "span 8",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ minWidth: "550px" }}>
                    ¿Aparte del cepillo utiliza otro aditamento para limpiar sus
                    dientes?
                  </Typography>
                  <RadioGroup
                    row
                    name="usa_aditamento_dental"
                    value={values.usa_aditamento_dental || "NO"}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="SI"
                      control={<CustomRadio size="small" />}
                      label="SI"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<CustomRadio size="small" />}
                      label="NO"
                    />
                  </RadioGroup>
                </Box>
                {values.usa_aditamento_dental === "SI" && (
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="¿Cuáles?"
                    onBlur={handleBlur}
                    onChange={(e) => handleUpperCaseChange(e, handleChange)}
                    value={values.aditamento_dental_detalle || ""}
                    name="aditamento_dental_detalle"
                    sx={{ gridColumn: "span 8" }}
                    inputProps={{ maxLength: 30 }}
                  />
                )}

                <Box
                  sx={{
                    gridColumn: "span 12",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ minWidth: "550px" }}>
                    ¿Tuvo alguna vez reacción a la anestesia dental?
                  </Typography>
                  <RadioGroup
                    row
                    name="reaccion_anestesia"
                    value={values.reaccion_anestesia || "NO"}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="SI"
                      control={<CustomRadio size="small" />}
                      label="SI"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<CustomRadio size="small" />}
                      label="NO"
                    />
                  </RadioGroup>
                </Box>

                <Box
                  sx={{
                    gridColumn: "span 12",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ minWidth: "350px" }}>
                    ¿Molestia o dolor en boca?
                  </Typography>
                  <RadioGroup
                    row
                    name="molestia_boca"
                    value={values.molestia_boca || "NO"}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="SI"
                      control={<CustomRadio size="small" />}
                      label="SI"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<CustomRadio size="small" />}
                      label="NO"
                    />
                  </RadioGroup>
                </Box>

                <Box
                  sx={{
                    gridColumn: "span 12",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ minWidth: "350px" }}>
                    ¿Mal olor o mal sabor de boca?
                  </Typography>
                  <RadioGroup
                    row
                    name="mal_sabor_boca"
                    value={values.mal_sabor_boca || "NO"}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="SI"
                      control={<CustomRadio size="small" />}
                      label="SI"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<CustomRadio size="small" />}
                      label="NO"
                    />
                  </RadioGroup>
                </Box>

                <Box
                  sx={{
                    gridColumn: "span 12",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ minWidth: "350px" }}>
                    ¿Le sangran las encías?
                  </Typography>
                  <RadioGroup
                    row
                    name="sangrado_encias"
                    value={values.sangrado_encias || "NO"}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="SI"
                      control={<CustomRadio size="small" />}
                      label="SI"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<CustomRadio size="small" />}
                      label="NO"
                    />
                  </RadioGroup>
                </Box>

                <Box
                  sx={{
                    gridColumn: "span 12",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ minWidth: "550px" }}>
                    ¿Siente sus dientes móviles aprieta o rechina sus dientes?
                  </Typography>
                  <RadioGroup
                    row
                    name="dientes_moviles"
                    value={values.dientes_moviles || "NO"}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="SI"
                      control={<CustomRadio size="small" />}
                      label="SI"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<CustomRadio size="small" />}
                      label="NO"
                    />
                  </RadioGroup>
                </Box>

                <Box
                  sx={{
                    gridColumn: "span 8",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ minWidth: "350px" }}>
                    ¿Molestia o ruido al abrir y cerrar su boca?
                  </Typography>
                  <RadioGroup
                    row
                    name="ruido_boca"
                    value={values.ruido_boca || "NO"}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="SI"
                      control={<CustomRadio size="small" />}
                      label="SI"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<CustomRadio size="small" />}
                      label="NO"
                    />
                  </RadioGroup>
                </Box>

                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="¿Malos hábitos orofaciales? (morder las uñas, chupar los dedos, morder el lápiz)"
                  onBlur={handleBlur}
                  onChange={(e) => handleUpperCaseChange(e, handleChange)}
                  value={values.habitos_orofaciales || ""}
                  name="habitos_orofaciales"
                  sx={{ gridColumn: "span 8" }}
                  inputProps={{ maxLength: 30 }}
                />

                <Box
                  sx={{
                    gridColumn: "span 12",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ minWidth: "250px" }}>
                    ¿Respira con su boca?
                  </Typography>
                  <RadioGroup
                    row
                    name="respira_boca"
                    value={values.respira_boca || "NO"}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="SI"
                      control={<CustomRadio size="small" />}
                      label="SI"
                    />
                    <FormControlLabel
                      value="NO"
                      control={<CustomRadio size="small" />}
                      label="NO"
                    />
                  </RadioGroup>
                </Box>
              </Box>
            </Box>

            <Box mb={3}>
              <Typography
                variant="h5"
                color={colors.greenAccent[400]}
                fontWeight="bold"
                mb={2}
              >
                CONSENTIMIENTO INFORMADO
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body3" mb={3} sx={{ textAlign: "justify" }}>
                Doy mi consentimiento a la odontóloga para recetar y efectuar
                cualquier tratar ento dental, operación dental. anestesia y
                otros procedimientos dentales que considere necesarios y en los
                que estemos mutuamerte deacuerdo, responsabilizándome de la
                veracidad de la información confidencial arriba mencionada
                Comprometiéndome a asistir puntualmente a las citas programadas
                y en caso d no poder asistir avisar con 24 hrs. De anticipación
                y si la Doctora por alguna razón no puede atenderio a su ca se
                cancelará de igual manera.
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                <Typography variant="body4" sx={{ minWidth: "350px" }}>
                  Acepto los términos del consentimiento informado:
                </Typography>
                <RadioGroup
                  row
                  name="consentimiento_informado"
                  value={values.consentimiento_informado || "NO"}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="SI"
                    control={<CustomRadio size="small" />}
                    label="SI, ACEPTO"
                  />
                  <FormControlLabel
                    value="NO"
                    control={<CustomRadio size="small" />}
                    label="NO ACEPTO"
                  />
                </RadioGroup>
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
  id_sexo: yup.string().required("Debe seleccionar un sexo"),
  primer_nombre: yup.string(),
  segundo_nombre: yup.string(),
  apellido_paterno: yup.string(),
  apellido_materno: yup.string(),
  fecha_nacimiento: yup.date(),
  lugar_nacimiento: yup.string(),
  direccion: yup.string(),
  ocupacion: yup.string(),
  telefono: yup.string(),
  email: yup.string(),
  recomendado_por: yup
    .string()
    .max(30, "Máximo 30 caracteres")
    .matches(/^[A-Z\s]*$/, "Solo se permiten letras mayúsculas"),
  medico_familiar: yup
    .string()
    .max(30, "Máximo 30 caracteres")
    .matches(/^[A-Z\s]*$/, "Solo se permiten letras mayúsculas"),
  hora_ultimo_alimento: yup.string(),
  glucosa: yup
    .string()
    .matches(/^\d*$/, "Solo números")
    .test("range", "Valor fuera de rango (40-300)", function (value) {
      if (!value) return true;
      const num = parseInt(value);
      return num >= 40 && num <= 300;
    }),
  presion_arterial: yup
    .string()
    .matches(/^\d{2,3}\/\d{2,3}$/, "Formato incorrecto (Ej: 120/80)")
    .test("range", "Valores fuera de rango", function (value) {
      if (!value) return true;
      const [sistolica, diastolica] = value.split("/").map(Number);
      return (
        sistolica >= 70 &&
        sistolica <= 200 &&
        diastolica >= 40 &&
        diastolica <= 130 &&
        sistolica > diastolica
      );
    }),
  motivo_consulta: yup.string().max(30, "Máximo 30 caracteres"),
  duracion_padecimiento: yup.string().max(30, "Máximo 30 caracteres"),
  antecedentes_padres: yup.string().max(30, "Máximo 30 caracteres"),
  antecedentes_abuelos: yup.string().max(30, "Máximo 30 caracteres"),
  antecedentes_tios: yup.string().max(30, "Máximo 30 caracteres"),
  antecedentes_hermanos: yup.string().max(30, "Máximo 30 caracteres"),
  diabetes: yup.string().oneOf(["SI", "NO"]),
  infartos: yup.string().oneOf(["SI", "NO"]),
  anemia: yup.string().oneOf(["SI", "NO"]),
  enf_rinon: yup.string().oneOf(["SI", "NO"]),
  vih_sida: yup.string().oneOf(["SI", "NO"]),
  artritis_reumatica: yup.string().oneOf(["SI", "NO"]),
  hipertension: yup.string().oneOf(["SI", "NO"]),
  migrania: yup.string().oneOf(["SI", "NO"]),
  asma_bronquial: yup.string().oneOf(["SI", "NO"]),
  enf_tiroides: yup.string().oneOf(["SI", "NO"]),
  cancer: yup.string().oneOf(["SI", "NO"]),
  fiebre_reumatica: yup.string().oneOf(["SI", "NO"]),
  hepatitis: yup.string().oneOf(["SI", "NO"]),
  tuberculos: yup.string().oneOf(["SI", "NO"]),
  epilepsia: yup.string().oneOf(["SI", "NO"]),
  enf_respiratorias: yup.string().oneOf(["SI", "NO"]),
  mareos: yup.string().oneOf(["SI", "NO"]),
  lupus: yup.string().oneOf(["SI", "NO"]),
  enfermedades_infancia: yup.string().oneOf(["SI", "NO"]),
  enfermedades_infancia_detalle: yup.string().max(30, "Máximo 30 caracteres"),
  covid19: yup.string().oneOf(["SI", "NO"]),
  covid19_tratamiento: yup.string().max(30, "Máximo 30 caracteres"),
  otras_enfermedades: yup.string().max(30, "Máximo 30 caracteres"),
  consume_medicamento: yup.string().oneOf(["SI", "NO"]),
  medicamento_detalle: yup.string().max(30, "Máximo 30 caracteres"),
  dolores_cabeza: yup.string().oneOf(["SI", "NO"]),
  alergico_sustancia: yup.string().oneOf(["SI", "NO"]),
  alergico_sustancia_detalle: yup.string().max(30, "Máximo 30 caracteres"),
  intervencion_quirurgica: yup.string().oneOf(["SI", "NO"]),
  intervencion_quirurgica_detalle: yup.string().max(30, "Máximo 30 caracteres"),
  sangra_excesivamente: yup.string().oneOf(["SI", "NO"]),
  embarazada: yup.string().oneOf(["SI", "NO"]),
  enfermedad_grave_reciente: yup.string().oneOf(["SI", "NO"]),
  enfermedad_grave_detalle: yup.string().max(30, "Máximo 30 caracteres"),
  consume_alcohol: yup.string().oneOf(["SI", "NO"]),
  fuma: yup.string().oneOf(["SI", "NO"]),
  fecha_ultima_visita_dental: yup.date(),
  motivo_visita_dental: yup.string().max(30, "Máximo 30 caracteres"),
  cepillado_diario: yup
    .number()
    .min(0, "Debe ser un número positivo")
    .max(10, "Máximo 10 veces al día"),
  usa_aditamento_dental: yup.string().oneOf(["SI", "NO"]),
  aditamento_dental_detalle: yup.string().max(30, "Máximo 30 caracteres"),
  reaccion_anestesia: yup.string().oneOf(["SI", "NO"]),
  molestia_boca: yup.string().oneOf(["SI", "NO"]),
  mal_sabor_boca: yup.string().oneOf(["SI", "NO"]),
  sangrado_encias: yup.string().oneOf(["SI", "NO"]),
  dientes_moviles: yup.string().oneOf(["SI", "NO"]),
  ruido_boca: yup.string().oneOf(["SI", "NO"]),
  habitos_orofaciales: yup.string().max(30, "Máximo 30 caracteres"),
  respira_boca: yup.string().oneOf(["SI", "NO"]),
  consentimiento_informado: yup.string().oneOf(["SI", "NO"]),
});

export default Expediente;
