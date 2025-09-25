import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import img1 from "../../assets/bodyfondos/grupo.jpg";
import img2 from "../../assets/bodyfondos/atencion.jpg";
import img3 from "../../assets/bodyfondos/espacio.jpg";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentSlide, setCurrentSlide] = useState(0);

  //Carrusle de Imagenes
  const carouselImages = [
    {
      src: img1,
      title: "Consultoria Dental Dra Sobeida",
      subtitle: "Sonrisas saludables con tecnología de vanguardia",
    },
    {
      src: img2,
      title: "Atención Profesional",
      subtitle: "Confianza y experiencia en cada consulta",
    },
    {
      src: img3,
      title: "Espacio Seguro",
      subtitle: "Nuestro consultorio, limpio y cómodo para ti",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );
  };

  return (
    <Box m="20px" sx={{ maxWidth: "100%", overflowX: "hidden" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Bienvenido al Menu Principal" />
      </Box>

      <Box
        position="relative"
        height="500px"
        borderRadius="12px"
        overflow="hidden"
        mt="20px"
        sx={{
          background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${carouselImages[currentSlide].src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "all 0.8s ease-in-out",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        <Box
          position="absolute"
          top="50%"
          left="50%"
          sx={{ transform: "translate(-50%, -50%)" }}
          textAlign="center"
          color="white"
        >
          <Typography
            variant="h2"
            fontWeight="bold"
            mb="10px"
            sx={{
              textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
              animation: "fadeIn 1s ease-in",
            }}
          >
            {carouselImages[currentSlide].title}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
              animation: "fadeIn 1.5s ease-in",
            }}
          >
            {carouselImages[currentSlide].subtitle}
          </Typography>
        </Box>

        <IconButton
          onClick={prevSlide}
          sx={{
            position: "absolute",
            left: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(255,255,255,0.2)",
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.4)",
            },
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>

        <IconButton
          onClick={nextSlide}
          sx={{
            position: "absolute",
            right: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(255,255,255,0.2)",
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.4)",
            },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>

        <Box
          position="absolute"
          bottom="20px"
          left="50%"
          sx={{ transform: "translateX(-50%)" }}
          display="flex"
          gap="10px"
        >
          {carouselImages.map((_, index) => (
            <Box
              key={index}
              width="12px"
              height="12px"
              borderRadius="50%"
              backgroundColor={
                currentSlide === index ? "white" : "rgba(255,255,255,0.5)"
              }
              sx={{
                cursor: "pointer",
                transition: "all 0.3s ease",
                transform: currentSlide === index ? "scale(1.2)" : "scale(1)",
              }}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </Box>
      </Box>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Box>
  );
};

export default Dashboard;
