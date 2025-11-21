import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  FormControlLabel,
  RadioGroup,
  Radio,
  Tabs,
  Tab,
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
  const [expedienteData, setExpedienteData] = useState(null);
  const [tabValue, setTabValue] = useState(0);

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
        return;
      }

      try {
        const expedienteResponse = await api.get(`/expedientes/${id}`);
        if (expedienteResponse.data.success) {
          setExpedienteData(expedienteResponse.data.data);
        }
      } catch (error) {
        console.log("No se encontró expediente previo");
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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const preventNumbers = (e) => {
    if (/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      const formValues = { ...values };

      if (formValues.enfermedades_infancia === "NO") {
        formValues.enfermedades_infancia_detalle = "";
      }
      if (formValues.alergico_sustancia === "NO") {
        formValues.alergico_sustancia_detalle = "";
      }
      if (formValues.covid19 === "NO") {
        formValues.covid19_tratamiento = "";
      }
      if (formValues.consume_medicamento === "NO") {
        formValues.medicamento_detalle = "";
      }
      if (formValues.intervencion_quirurgica === "NO") {
        formValues.intervencion_quirurgica_detalle = "";
      }
      if (formValues.enfermedad_grave_reciente === "NO") {
        formValues.enfermedad_grave_detalle = "";
      }
      if (formValues.usa_aditamento_dental === "NO") {
        formValues.aditamento_dental_detalle = "";
      }

      const dataToSend = {
        id_paciente: parseInt(id),
        recomendado_por: formValues.recomendado_por,
        medico_familiar: formValues.medico_familiar,
        hora_ultimo_alimento: formValues.hora_ultimo_alimento || null,
        glucosa: formValues.glucosa || null,
        presion_arterial: formValues.presion_arterial,
        motivo_consulta: formValues.motivo_consulta,
        duracion_padecimiento: formValues.duracion_padecimiento,
        antecedentes_padres: formValues.antecedentes_padres,
        antecedentes_abuelos: formValues.antecedentes_abuelos,
        antecedentes_tios: formValues.antecedentes_tios,
        antecedentes_hermanos: formValues.antecedentes_hermanos,
        diabetes: formValues.diabetes,
        infartos: formValues.infartos,
        anemia: formValues.anemia,
        enf_rinon: formValues.enf_rinon,
        vih_sida: formValues.vih_sida,
        artritis_reumatica: formValues.artritis_reumatica,
        hipertension: formValues.hipertension,
        migrania: formValues.migrania,
        asma_bronquial: formValues.asma_bronquial,
        enf_tiroides: formValues.enf_tiroides,
        cancer: formValues.cancer,
        fiebre_reumatica: formValues.fiebre_reumatica,
        hepatitis: formValues.hepatitis,
        tuberculos: formValues.tuberculos,
        epilepsia: formValues.epilepsia,
        enf_respiratorias: formValues.enf_respiratorias,
        mareos: formValues.mareos,
        lupus: formValues.lupus,
        enfermedades_infancia_detalle: formValues.enfermedades_infancia_detalle,
        covid19: formValues.covid19,
        covid19_tratamiento: formValues.covid19_tratamiento,
        otras_enfermedades: formValues.otras_enfermedades,
        consume_medicamento: formValues.consume_medicamento,
        medicamento_detalle: formValues.medicamento_detalle,
        dolores_cabeza: formValues.dolores_cabeza,
        alergico_sustancia_detalle: formValues.alergico_sustancia_detalle,
        intervencion_quirurgica: formValues.intervencion_quirurgica,
        intervencion_quirurgica_detalle:
          formValues.intervencion_quirurgica_detalle,
        sangra_excesivamente: formValues.sangra_excesivamente,
        embarazada: formValues.embarazada,
        enfermedad_grave_reciente: formValues.enfermedad_grave_reciente,
        enfermedad_grave_detalle: formValues.enfermedad_grave_detalle,
        consume_alcohol: formValues.consume_alcohol,
        fuma: formValues.fuma,
        fecha_ultima_visita_dental:
          formValues.fecha_ultima_visita_dental || null,
        motivo_visita_dental: formValues.motivo_visita_dental,
        cepillado_diario: formValues.cepillado_diario || null,
        usa_aditamento_dental: formValues.usa_aditamento_dental,
        aditamento_dental_detalle: formValues.aditamento_dental_detalle,
        reaccion_anestesia: formValues.reaccion_anestesia,
        molestia_boca: formValues.molestia_boca,
        mal_sabor_boca: formValues.mal_sabor_boca,
        sangrado_encias: formValues.sangrado_encias,
        dientes_moviles: formValues.dientes_moviles,
        ruido_boca: formValues.ruido_boca,
        habitos_orofaciales: formValues.habitos_orofaciales,
        respira_boca: formValues.respira_boca,
        consentimiento_informado: formValues.consentimiento_informado,
      };

      let response;
      if (expedienteData) {
        response = await api.put(`/expedientes/${id}`, dataToSend);
      } else {
        response = await api.post("/expedientes", dataToSend);
      }

      if (response.data && response.data.success) {
        Swal.fire({
          icon: "success",
          title: expedienteData
            ? "Expediente Actualizado!"
            : "Expediente Creado!",
          text: expedienteData
            ? "El Expediente ha sido Actualizado Exitosamente"
            : "El Expediente ha sido Creado Exitosamente",
          confirmButtonColor: "#3085d6",
        }).then(() => {
          navigate("/pacientes");
        });
      }
    } catch (error) {
      console.error("Error al guardar el Expediente:", error);

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
            text: "Error al guardar el expediente",
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
        <Header title="ERROR" subtitle="Paciente no encontrado" />
      </Box>
    );
  }

  const initialValues = {
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
    recomendado_por: expedienteData?.recomendado_por || "",
    medico_familiar: expedienteData?.medico_familiar || "",
    hora_ultimo_alimento: expedienteData?.hora_ultimo_alimento || "",
    glucosa: expedienteData?.glucosa || "",
    presion_arterial: expedienteData?.presion_arterial || "",
    motivo_consulta: expedienteData?.motivo_consulta || "",
    duracion_padecimiento: expedienteData?.duracion_padecimiento || "",
    antecedentes_padres: expedienteData?.antecedentes_padres || "",
    antecedentes_abuelos: expedienteData?.antecedentes_abuelos || "",
    antecedentes_tios: expedienteData?.antecedentes_tios || "",
    antecedentes_hermanos: expedienteData?.antecedentes_hermanos || "",
    diabetes: expedienteData?.diabetes || "NO",
    infartos: expedienteData?.infartos || "NO",
    anemia: expedienteData?.anemia || "NO",
    enf_rinon: expedienteData?.enf_rinon || "NO",
    vih_sida: expedienteData?.vih_sida || "NO",
    artritis_reumatica: expedienteData?.artritis_reumatica || "NO",
    hipertension: expedienteData?.hipertension || "NO",
    migrania: expedienteData?.migrania || "NO",
    asma_bronquial: expedienteData?.asma_bronquial || "NO",
    enf_tiroides: expedienteData?.enf_tiroides || "NO",
    cancer: expedienteData?.cancer || "NO",
    fiebre_reumatica: expedienteData?.fiebre_reumatica || "NO",
    hepatitis: expedienteData?.hepatitis || "NO",
    tuberculos: expedienteData?.tuberculos || "NO",
    epilepsia: expedienteData?.epilepsia || "NO",
    enf_respiratorias: expedienteData?.enf_respiratorias || "NO",
    mareos: expedienteData?.mareos || "NO",
    lupus: expedienteData?.lupus || "NO",
    enfermedades_infancia:
      (expedienteData?.enfermedades_infancia_detalle ? "SI" : "NO") || "NO",
    enfermedades_infancia_detalle:
      expedienteData?.enfermedades_infancia_detalle || "",
    covid19: expedienteData?.covid19 || "NO",
    covid19_tratamiento: expedienteData?.covid19_tratamiento || "",
    otras_enfermedades: expedienteData?.otras_enfermedades || "",
    consume_medicamento: expedienteData?.consume_medicamento || "NO",
    medicamento_detalle: expedienteData?.medicamento_detalle || "",
    dolores_cabeza: expedienteData?.dolores_cabeza || "NO",
    alergico_sustancia:
      (expedienteData?.alergico_sustancia_detalle ? "SI" : "NO") || "NO",
    alergico_sustancia_detalle:
      expedienteData?.alergico_sustancia_detalle || "",
    intervencion_quirurgica: expedienteData?.intervencion_quirurgica || "NO",
    intervencion_quirurgica_detalle:
      expedienteData?.intervencion_quirurgica_detalle || "",
    sangra_excesivamente: expedienteData?.sangra_excesivamente || "NO",
    embarazada: expedienteData?.embarazada || "NO",
    enfermedad_grave_reciente:
      expedienteData?.enfermedad_grave_reciente || "NO",
    enfermedad_grave_detalle: expedienteData?.enfermedad_grave_detalle || "",
    consume_alcohol: expedienteData?.consume_alcohol || "NO",
    fuma: expedienteData?.fuma || "NO",
    fecha_ultima_visita_dental:
      expedienteData?.fecha_ultima_visita_dental || "",
    motivo_visita_dental: expedienteData?.motivo_visita_dental || "",
    cepillado_diario: expedienteData?.cepillado_diario || "",
    usa_aditamento_dental: expedienteData?.usa_aditamento_dental || "NO",
    aditamento_dental_detalle: expedienteData?.aditamento_dental_detalle || "",
    reaccion_anestesia: expedienteData?.reaccion_anestesia || "NO",
    molestia_boca: expedienteData?.molestia_boca || "NO",
    mal_sabor_boca: expedienteData?.mal_sabor_boca || "NO",
    sangrado_encias: expedienteData?.sangrado_encias || "NO",
    dientes_moviles: expedienteData?.dientes_moviles || "NO",
    ruido_boca: expedienteData?.ruido_boca || "NO",
    habitos_orofaciales: expedienteData?.habitos_orofaciales || "",
    respira_boca: expedienteData?.respira_boca || "NO",
    consentimiento_informado: expedienteData?.consentimiento_informado || "NO",
  };

  return (
    <Box m="20px">
      <Header
        title="Expediente Medico"
        subtitle="Información del Expediente del Paciente"
      />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
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
            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  "& .MuiTab-root": {
                    color: colors.grey[100],
                    "&.Mui-selected": {
                      color: colors.greenAccent[500],
                    },
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: colors.greenAccent[500],
                  },
                }}
              >
                <Tab label="Datos Personales" />
                <Tab label="Información Médica" />
                <Tab label="Motivo de Consulta" />
                <Tab label="Antecedentes Heredo-Familiares" />
                <Tab label="Antecedentes Personales" />
                <Tab label="Historia Bucal y Dental" />
                <Tab label="Consentimiento Informado" />
              </Tabs>
            </Box>

            {/* Tab 0: Datos Personales */}
            {tabValue === 0 && (
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
                    value={values.primer_nombre}
                    name="primer_nombre"
                    sx={{ gridColumn: "span 3" }}
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Segundo Nombre"
                    value={values.segundo_nombre}
                    name="segundo_nombre"
                    sx={{ gridColumn: "span 3" }}
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Apellido Paterno"
                    value={values.apellido_paterno}
                    name="apellido_paterno"
                    InputProps={{ readOnly: true }}
                    sx={{ gridColumn: "span 3" }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Apellido Materno"
                    InputProps={{ readOnly: true }}
                    value={values.apellido_materno}
                    name="apellido_materno"
                    sx={{ gridColumn: "span 3" }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="date"
                    label="Fecha de Nacimiento"
                    InputProps={{ readOnly: true }}
                    InputLabelProps={{ shrink: true }}
                    value={values.fecha_nacimiento}
                    name="fecha_nacimiento"
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
                    value={values.direccion}
                    name="direccion"
                    sx={{ gridColumn: "span 12" }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Lugar de Nacimiento"
                    InputProps={{ readOnly: true }}
                    value={values.lugar_nacimiento}
                    name="lugar_nacimiento"
                    sx={{ gridColumn: "span 6" }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Ocupación"
                    InputProps={{ readOnly: true }}
                    value={values.ocupacion}
                    name="ocupacion"
                    sx={{ gridColumn: "span 6" }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Teléfono"
                    InputProps={{ readOnly: true }}
                    value={values.telefono}
                    name="telefono"
                    sx={{ gridColumn: "span 3" }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="email"
                    InputProps={{ readOnly: true }}
                    label="E-mail"
                    value={values.email}
                    name="email"
                    sx={{ gridColumn: "span 3" }}
                  />
                </Box>
              </Box>
            )}

            {/* Tab 1: Información Médica */}
            {tabValue === 1 && (
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
                    onKeyPress={preventNumbers}
                    onChange={(e) => handleUpperCaseChange(e, handleChange)}
                    value={values.recomendado_por}
                    name="recomendado_por"
                    sx={{ gridColumn: "span 6" }}
                    inputProps={{ maxLength: 30 }}
                    error={
                      !!touched.recomendado_por && !!errors.recomendado_por
                    }
                    helperText={
                      touched.recomendado_por && errors.recomendado_por
                    }
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Medico Familiar"
                    onBlur={handleBlur}
                    onKeyPress={preventNumbers}
                    onChange={(e) => handleUpperCaseChange(e, handleChange)}
                    value={values.medico_familiar}
                    name="medico_familiar"
                    sx={{ gridColumn: "span 6" }}
                    inputProps={{ maxLength: 30 }}
                    error={
                      !!touched.medico_familiar && !!errors.medico_familiar
                    }
                    helperText={
                      touched.medico_familiar && errors.medico_familiar
                    }
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
                    error={
                      !!touched.hora_ultimo_alimento &&
                      !!errors.hora_ultimo_alimento
                    }
                    helperText={
                      touched.hora_ultimo_alimento &&
                      errors.hora_ultimo_alimento
                    }
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Glucosa"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^\d]/g, "");
                      if (value.length <= 3) {
                        handleChange({
                          target: {
                            name: "glucosa",
                            value: value,
                          },
                        });
                      }
                    }}
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
                    error={!!touched.glucosa && !!errors.glucosa}
                    helperText={touched.glucosa && errors.glucosa}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Presión Arterial"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      let value = e.target.value;
                      value = value.replace(/[^\d/]/g, "");
                      const parts = value.split("/");
                      if (parts[0] && parts[0].length > 3)
                        parts[0] = parts[0].substring(0, 3);
                      if (parts[1] && parts[1].length > 3)
                        parts[1] = parts[1].substring(0, 3);

                      if (parts.length > 2) {
                        value = `${parts[0]}/${parts[1]}`;
                      } else {
                        value = parts.join("/");
                      }

                      handleChange({
                        target: {
                          name: "presion_arterial",
                          value: value,
                        },
                      });
                    }}
                    value={values.presion_arterial}
                    name="presion_arterial"
                    sx={{ gridColumn: "span 4" }}
                    placeholder="120/80"
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
                    error={
                      !!touched.presion_arterial && !!errors.presion_arterial
                    }
                    helperText={
                      touched.presion_arterial && errors.presion_arterial
                    }
                  />
                </Box>
              </Box>
            )}

            {/* Tab 2: Motivo de Consulta */}
            {tabValue === 2 && (
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
                    onKeyPress={preventNumbers}
                    onChange={(e) => handleUpperCaseChange(e, handleChange)}
                    value={values.motivo_consulta}
                    name="motivo_consulta"
                    multiline
                    rows={3}
                    sx={{ gridColumn: "span 8" }}
                    inputProps={{ maxLength: 50 }}
                    error={
                      !!touched.motivo_consulta && !!errors.motivo_consulta
                    }
                    helperText={
                      touched.motivo_consulta && errors.motivo_consulta
                    }
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
                    inputProps={{ maxLength: 30 }}
                    error={
                      !!touched.duracion_padecimiento &&
                      !!errors.duracion_padecimiento
                    }
                    helperText={
                      touched.duracion_padecimiento &&
                      errors.duracion_padecimiento
                    }
                  />
                </Box>
              </Box>
            )}

            {/* Tab 3: Antecedentes Heredo-Familiares */}
            {tabValue === 3 && (
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
                    onKeyPress={preventNumbers}
                    onBlur={handleBlur}
                    onChange={(e) => handleUpperCaseChange(e, handleChange)}
                    value={values.antecedentes_padres}
                    name="antecedentes_padres"
                    multiline
                    rows={2}
                    sx={{ gridColumn: "span 6" }}
                    inputProps={{ maxLength: 30 }}
                    error={
                      !!touched.antecedentes_padres &&
                      !!errors.antecedentes_padres
                    }
                    helperText={
                      touched.antecedentes_padres && errors.antecedentes_padres
                    }
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Abuelos"
                    onBlur={handleBlur}
                    onKeyPress={preventNumbers}
                    onChange={(e) => handleUpperCaseChange(e, handleChange)}
                    value={values.antecedentes_abuelos}
                    name="antecedentes_abuelos"
                    multiline
                    rows={2}
                    sx={{ gridColumn: "span 6" }}
                    inputProps={{ maxLength: 30 }}
                    error={
                      !!touched.antecedentes_abuelos &&
                      !!errors.antecedentes_abuelos
                    }
                    helperText={
                      touched.antecedentes_abuelos &&
                      errors.antecedentes_abuelos
                    }
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Tios"
                    onBlur={handleBlur}
                    onKeyPress={preventNumbers}
                    onChange={(e) => handleUpperCaseChange(e, handleChange)}
                    value={values.antecedentes_tios}
                    name="antecedentes_tios"
                    multiline
                    rows={2}
                    sx={{ gridColumn: "span 6" }}
                    inputProps={{ maxLength: 30 }}
                    error={
                      !!touched.antecedentes_tios && !!errors.antecedentes_tios
                    }
                    helperText={
                      touched.antecedentes_tios && errors.antecedentes_tios
                    }
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Hermanos"
                    onBlur={handleBlur}
                    onKeyPress={preventNumbers}
                    onChange={(e) => handleUpperCaseChange(e, handleChange)}
                    value={values.antecedentes_hermanos}
                    name="antecedentes_hermanos"
                    multiline
                    rows={2}
                    sx={{ gridColumn: "span 6" }}
                    inputProps={{ maxLength: 30 }}
                    error={
                      !!touched.antecedentes_hermanos &&
                      !!errors.antecedentes_hermanos
                    }
                    helperText={
                      touched.antecedentes_hermanos &&
                      errors.antecedentes_hermanos
                    }
                  />
                </Box>
              </Box>
            )}

            {/* Tab 4: Antecedentes Personales */}
            {tabValue === 4 && (
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
                    <Typography sx={{ minWidth: "150px" }}>
                      Hepatitis
                    </Typography>
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
                    <Typography sx={{ minWidth: "150px" }}>
                      Tuberculos
                    </Typography>
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
                    <Typography sx={{ minWidth: "150px" }}>
                      Epilepsia
                    </Typography>
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

                  <Box sx={{ gridColumn: "span 8", mt: 2 }}>
                    <Typography sx={{ minWidth: "150px", mb: 1 }}>
                      Enfermedades de la infancia: ej: varicela, rubeola,
                      paperas
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
                          sx={{ flex: 1 }}
                          variant="outlined"
                          type="text"
                          label="Explique"
                          onBlur={handleBlur}
                          onKeyPress={preventNumbers}
                          onChange={(e) =>
                            handleUpperCaseChange(e, handleChange)
                          }
                          value={values.enfermedades_infancia_detalle}
                          name="enfermedades_infancia_detalle"
                          inputProps={{ maxLength: 30 }}
                          error={
                            !!touched.enfermedades_infancia_detalle &&
                            !!errors.enfermedades_infancia_detalle
                          }
                          helperText={
                            touched.enfermedades_infancia_detalle &&
                            errors.enfermedades_infancia_detalle
                          }
                        />
                      )}
                    </Box>
                  </Box>

                  <Box sx={{ gridColumn: "span 8", mt: 2 }}>
                    <Typography sx={{ minWidth: "150px", mb: 1 }}>
                      COVID-19
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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

                      {values.covid19 === "SI" && (
                        <TextField
                          sx={{ flex: 1 }}
                          variant="outlined"
                          type="text"
                          label="Tratamiento"
                          onBlur={handleBlur}
                          onKeyPress={preventNumbers}
                          onChange={(e) =>
                            handleUpperCaseChange(e, handleChange)
                          }
                          value={values.covid19_tratamiento}
                          name="covid19_tratamiento"
                          inputProps={{ maxLength: 30 }}
                          error={
                            !!touched.covid19_tratamiento &&
                            !!errors.covid19_tratamiento
                          }
                          helperText={
                            touched.covid19_tratamiento &&
                            errors.covid19_tratamiento
                          }
                        />
                      )}
                    </Box>
                  </Box>

                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Otras Enfermedades - Explique"
                    onBlur={handleBlur}
                    onKeyPress={preventNumbers}
                    onChange={(e) => handleUpperCaseChange(e, handleChange)}
                    value={values.otras_enfermedades}
                    name="otras_enfermedades"
                    multiline
                    rows={2}
                    sx={{ gridColumn: "span 8", mt: 2 }}
                    inputProps={{ maxLength: 30 }}
                    error={
                      !!touched.otras_enfermedades &&
                      !!errors.otras_enfermedades
                    }
                    helperText={
                      touched.otras_enfermedades && errors.otras_enfermedades
                    }
                  />

                  <Box sx={{ gridColumn: "span 8", mt: 2 }}>
                    <Typography sx={{ minWidth: "250px", mb: 1 }}>
                      ¿Consume algún medicamento?:
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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

                      {values.consume_medicamento === "SI" && (
                        <TextField
                          sx={{ flex: 1 }}
                          variant="outlined"
                          type="text"
                          label="¿Cuál?"
                          onKeyPress={preventNumbers}
                          onBlur={handleBlur}
                          onChange={(e) =>
                            handleUpperCaseChange(e, handleChange)
                          }
                          value={values.medicamento_detalle}
                          name="medicamento_detalle"
                          inputProps={{ maxLength: 30 }}
                          error={
                            !!touched.medicamento_detalle &&
                            !!errors.medicamento_detalle
                          }
                          helperText={
                            touched.medicamento_detalle &&
                            errors.medicamento_detalle
                          }
                        />
                      )}
                    </Box>
                  </Box>

                  <Box sx={{ gridColumn: "span 8", mt: 2 }}>
                    <Typography sx={{ minWidth: "350px", mb: 1 }}>
                      ¿Sufre con frecuencia dolores de cabeza?
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
                  </Box>

                  <Box sx={{ gridColumn: "span 8", mt: 2 }}>
                    <Typography sx={{ minWidth: "350px", mb: 1 }}>
                      ¿Es alérgico a alguna sustancia o medicamento? (Ej.
                      Penicilina)
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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

                      {values.alergico_sustancia === "SI" && (
                        <TextField
                          sx={{ flex: 1 }}
                          variant="outlined"
                          type="text"
                          label="¿Cuál?"
                          onBlur={handleBlur}
                          onKeyPress={preventNumbers}
                          onChange={(e) =>
                            handleUpperCaseChange(e, handleChange)
                          }
                          value={values.alergico_sustancia_detalle}
                          name="alergico_sustancia_detalle"
                          inputProps={{ maxLength: 30 }}
                          error={
                            !!touched.alergico_sustancia_detalle &&
                            !!errors.alergico_sustancia_detalle
                          }
                          helperText={
                            touched.alergico_sustancia_detalle &&
                            errors.alergico_sustancia_detalle
                          }
                        />
                      )}
                    </Box>
                  </Box>

                  <Box sx={{ gridColumn: "span 8", mt: 2 }}>
                    <Typography sx={{ minWidth: "350px", mb: 1 }}>
                      ¿Ha sido intervenido quirúrgicamente alguna vez?
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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

                      {values.intervencion_quirurgica === "SI" && (
                        <TextField
                          sx={{ flex: 1 }}
                          variant="outlined"
                          type="text"
                          label="¿Cuándo y de qué?"
                          onBlur={handleBlur}
                          onKeyPress={preventNumbers}
                          onChange={(e) =>
                            handleUpperCaseChange(e, handleChange)
                          }
                          value={values.intervencion_quirurgica_detalle}
                          name="intervencion_quirurgica_detalle"
                          inputProps={{ maxLength: 30 }}
                          error={
                            !!touched.intervencion_quirurgica_detalle &&
                            !!errors.intervencion_quirurgica_detalle
                          }
                          helperText={
                            touched.intervencion_quirurgica_detalle &&
                            errors.intervencion_quirurgica_detalle
                          }
                        />
                      )}
                    </Box>
                  </Box>

                  <Box sx={{ gridColumn: "span 8", mt: 2 }}>
                    <Typography sx={{ minWidth: "350px", mb: 1 }}>
                      ¿Sangra excesivamente cuando sufre un corte?:
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
                  </Box>

                  <Box sx={{ gridColumn: "span 8", mt: 2 }}>
                    <Typography sx={{ minWidth: "250px", mb: 1 }}>
                      ¿Está Ud. Embarazada?
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
                  </Box>

                  <Box sx={{ gridColumn: "span 8", mt: 2 }}>
                    <Typography sx={{ minWidth: "350px", mb: 1 }}>
                      ¿Padeció alguna enfermedad grave recientemente?
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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

                      {values.enfermedad_grave_reciente === "SI" && (
                        <TextField
                          sx={{ flex: 1 }}
                          variant="outlined"
                          type="text"
                          label="¿Cuál?"
                          onBlur={handleBlur}
                          onKeyPress={preventNumbers}
                          onChange={(e) =>
                            handleUpperCaseChange(e, handleChange)
                          }
                          value={values.enfermedad_grave_detalle}
                          name="enfermedad_grave_detalle"
                          inputProps={{ maxLength: 30 }}
                          error={
                            !!touched.enfermedad_grave_detalle &&
                            !!errors.enfermedad_grave_detalle
                          }
                          helperText={
                            touched.enfermedad_grave_detalle &&
                            errors.enfermedad_grave_detalle
                          }
                        />
                      )}
                    </Box>
                  </Box>

                  <Box sx={{ gridColumn: "span 6", mt: 2 }}>
                    <Typography sx={{ minWidth: "200px", mb: 1 }}>
                      ¿Consume Ud. Alcohol?
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
                  </Box>

                  <Box sx={{ gridColumn: "span 8", mt: 2 }}>
                    <Typography sx={{ minWidth: "150px", mb: 1 }}>
                      ¿Fuma?
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
              </Box>
            )}

            {/* Tab 5: Historia Bucal y Dental */}
            {tabValue === 5 && (
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
                    error={
                      !!touched.fecha_ultima_visita_dental &&
                      !!errors.fecha_ultima_visita_dental
                    }
                    helperText={
                      touched.fecha_ultima_visita_dental &&
                      errors.fecha_ultima_visita_dental
                    }
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
                    error={
                      !!touched.motivo_visita_dental &&
                      !!errors.motivo_visita_dental
                    }
                    helperText={
                      touched.motivo_visita_dental &&
                      errors.motivo_visita_dental
                    }
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
                    error={
                      !!touched.cepillado_diario && !!errors.cepillado_diario
                    }
                    helperText={
                      touched.cepillado_diario && errors.cepillado_diario
                    }
                  />

                  <Box sx={{ gridColumn: "span 8", mt: 2 }}>
                    <Typography sx={{ minWidth: "550px", mb: 1 }}>
                      ¿Aparte del cepillo utiliza otro aditamento para limpiar
                      sus dientes?
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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

                      {values.usa_aditamento_dental === "SI" && (
                        <TextField
                          sx={{ flex: 1 }}
                          variant="outlined"
                          type="text"
                          label="¿Cuáles?"
                          onBlur={handleBlur}
                          onChange={(e) =>
                            handleUpperCaseChange(e, handleChange)
                          }
                          value={values.aditamento_dental_detalle || ""}
                          name="aditamento_dental_detalle"
                          inputProps={{ maxLength: 30 }}
                          error={
                            !!touched.aditamento_dental_detalle &&
                            !!errors.aditamento_dental_detalle
                          }
                          helperText={
                            touched.aditamento_dental_detalle &&
                            errors.aditamento_dental_detalle
                          }
                        />
                      )}
                    </Box>
                  </Box>

                  <Box sx={{ gridColumn: "span 12", mt: 2 }}>
                    <Typography sx={{ minWidth: "550px", mb: 1 }}>
                      ¿Tuvo alguna vez reacción a la anestesia dental?
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
                  </Box>

                  <Box sx={{ gridColumn: "span 12", mt: 2 }}>
                    <Typography sx={{ minWidth: "350px", mb: 1 }}>
                      ¿Molestia o dolor en boca?
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
                  </Box>

                  <Box sx={{ gridColumn: "span 12", mt: 2 }}>
                    <Typography sx={{ minWidth: "350px", mb: 1 }}>
                      ¿Mal olor o mal sabor de boca?
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
                  </Box>

                  <Box sx={{ gridColumn: "span 12", mt: 2 }}>
                    <Typography sx={{ minWidth: "350px", mb: 1 }}>
                      ¿Le sangran las encías?
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
                  </Box>

                  <Box sx={{ gridColumn: "span 12", mt: 2 }}>
                    <Typography sx={{ minWidth: "550px", mb: 1 }}>
                      ¿Siente sus dientes móviles aprieta o rechina sus dientes?
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
                  </Box>

                  <Box sx={{ gridColumn: "span 8", mt: 2 }}>
                    <Typography sx={{ minWidth: "350px", mb: 1 }}>
                      ¿Molestia o ruido al abrir y cerrar su boca?
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
                    sx={{ gridColumn: "span 8", mt: 2 }}
                    inputProps={{ maxLength: 30 }}
                    error={
                      !!touched.habitos_orofaciales &&
                      !!errors.habitos_orofaciales
                    }
                    helperText={
                      touched.habitos_orofaciales && errors.habitos_orofaciales
                    }
                  />

                  <Box sx={{ gridColumn: "span 12", mt: 2 }}>
                    <Typography sx={{ minWidth: "250px", mb: 1 }}>
                      ¿Respira con su boca?
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
              </Box>
            )}

            {/* Tab 6: Consentimiento Informado */}
            {tabValue === 6 && (
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
                <Typography
                  variant="body2"
                  mb={3}
                  sx={{ textAlign: "justify" }}
                >
                  Doy mi consentimiento a la odontóloga para recetar y efectuar
                  cualquier tratamiento dental, operación dental, anestesia y
                  otros procedimientos dentales que considere necesarios y en
                  los que estemos mutuamente de acuerdo, responsabilizándome de
                  la veracidad de la información confidencial arriba mencionada.
                  Comprometiéndome a asistir puntualmente a las citas
                  programadas y en caso de no poder asistir avisar con 24 hrs.
                  de anticipación y si la Doctora por alguna razón no puede
                  atenderlo a su cita se cancelará de igual manera.
                </Typography>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                >
                  <Typography variant="body1" sx={{ minWidth: "350px" }}>
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
            )}

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
                disabled={
                  isSubmitting || values.consentimiento_informado !== "SI"
                }
              >
                {isSubmitting ? "Guardando..." : "Guardar Expediente"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const editSchema = yup.object().shape({
  id_sexo: yup.string(),
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
    .matches(/^[A-Z\s]*$/, "Solo se permiten letras mayúsculas")
    .nullable(),
  medico_familiar: yup
    .string()
    .max(30, "Máximo 30 caracteres")
    .matches(/^[A-Z\s]*$/, "Solo se permiten letras mayúsculas")
    .nullable(),
  hora_ultimo_alimento: yup.string().nullable(),
  glucosa: yup
    .string()
    .matches(/^\d*$/, "Solo números")
    .test("range", "Valor fuera de rango (40-300)", function (value) {
      if (!value || value.trim() === "") return true; // Permite vacío
      const num = parseInt(value);
      return num >= 40 && num <= 300;
    })
    .nullable(),
  presion_arterial: yup
    .string()
    .test("format", "Formato incorrecto (Ej: 120/80)", function (value) {
      if (!value || value.trim() === "") return true;
      return /^\d{2,3}\/\d{2,3}$/.test(value);
    })
    .test("range", "Valores fuera de rango", function (value) {
      if (!value || value.trim() === "") return true;
      const parts = value.split("/");
      if (parts.length !== 2) return true;
      const [sistolica, diastolica] = parts.map(Number);
      if (isNaN(sistolica) || isNaN(diastolica)) return false;
      return (
        sistolica >= 70 &&
        sistolica <= 200 &&
        diastolica >= 40 &&
        diastolica <= 130 &&
        sistolica > diastolica
      );
    })
    .nullable(),
  motivo_consulta: yup.string().max(50, "Máximo 50 caracteres").nullable(),
  duracion_padecimiento: yup
    .string()
    .max(30, "Máximo 30 caracteres")
    .nullable(),
  antecedentes_padres: yup.string().max(30, "Máximo 30 caracteres").nullable(),
  antecedentes_abuelos: yup.string().max(30, "Máximo 30 caracteres").nullable(),
  antecedentes_tios: yup.string().max(30, "Máximo 30 caracteres").nullable(),
  antecedentes_hermanos: yup
    .string()
    .max(30, "Máximo 30 caracteres")
    .nullable(),

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
  enfermedades_infancia_detalle: yup
    .string()
    .max(30, "Máximo 30 caracteres")
    .nullable(),
  covid19: yup.string().oneOf(["SI", "NO"]),
  covid19_tratamiento: yup.string().max(30, "Máximo 30 caracteres").nullable(),
  otras_enfermedades: yup.string().max(30, "Máximo 30 caracteres").nullable(),
  consume_medicamento: yup.string().oneOf(["SI", "NO"]),
  medicamento_detalle: yup.string().max(30, "Máximo 30 caracteres").nullable(),
  dolores_cabeza: yup.string().oneOf(["SI", "NO"]),
  alergico_sustancia: yup.string().oneOf(["SI", "NO"]),
  alergico_sustancia_detalle: yup
    .string()
    .max(30, "Máximo 30 caracteres")
    .nullable(),
  intervencion_quirurgica: yup.string().oneOf(["SI", "NO"]),
  intervencion_quirurgica_detalle: yup
    .string()
    .max(30, "Máximo 30 caracteres")
    .nullable(),
  sangra_excesivamente: yup.string().oneOf(["SI", "NO"]),
  embarazada: yup.string().oneOf(["SI", "NO"]),
  enfermedad_grave_reciente: yup.string().oneOf(["SI", "NO"]),
  enfermedad_grave_detalle: yup
    .string()
    .max(30, "Máximo 30 caracteres")
    .nullable(),
  consume_alcohol: yup.string().oneOf(["SI", "NO"]),
  fuma: yup.string().oneOf(["SI", "NO"]),

  fecha_ultima_visita_dental: yup.date().nullable(),
  motivo_visita_dental: yup.string().max(30, "Máximo 30 caracteres").nullable(),
  cepillado_diario: yup
    .number()
    .min(0, "Debe ser un número positivo")
    .max(10, "Máximo 10 veces al día")
    .nullable(),
  usa_aditamento_dental: yup.string().oneOf(["SI", "NO"]),
  aditamento_dental_detalle: yup
    .string()
    .max(30, "Máximo 30 caracteres")
    .nullable(),
  reaccion_anestesia: yup.string().oneOf(["SI", "NO"]),
  molestia_boca: yup.string().oneOf(["SI", "NO"]),
  mal_sabor_boca: yup.string().oneOf(["SI", "NO"]),
  sangrado_encias: yup.string().oneOf(["SI", "NO"]),
  dientes_moviles: yup.string().oneOf(["SI", "NO"]),
  ruido_boca: yup.string().oneOf(["SI", "NO"]),
  habitos_orofaciales: yup.string().max(30, "Máximo 30 caracteres").nullable(),
  respira_boca: yup.string().oneOf(["SI", "NO"]),
  consentimiento_informado: yup.string().oneOf(["SI", "NO"]),
});

export default Expediente;
