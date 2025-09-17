import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

export const tokens = (mode) => ({
  ...(mode === "light"
    ? {
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        primary: {
          100: "#d0d1d5",
          200: "#a1a4ab",
          300: "#727681",
          400: "#1F2A40",
          500: "#141b2d",
          600: "#101624",
          700: "#0c101b",
          800: "#080b12",
          900: "#040509",
        },
        greenAccent: {
          100: "#dbf5ee",
          200: "#b7ebde",
          300: "#94e2cd",
          400: "#70d8bd",
          500: "#4cceac",
          600: "#3da58a",
          700: "#2e7c67",
          800: "#1e5245",
          900: "#0f2922",
        },
        redAccent: {
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f",
        },
        blueAccent: {
          100: "#e1e2fe",
          200: "#c3c6fd",
          300: "#a4a9fc",
          400: "#868dfb",
          500: "#6870fa",
          600: "#535ac8",
          700: "#3e4396",
          800: "#2a2d64",
          900: "#151632",
        },
      }
    : {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#040509",
          200: "#080b12",
          300: "#0c101b",
          400: "#f2f0f0", 
          500: "#141b2d",
          600: "#1F2A40",
          700: "#727681",
          800: "#a1a4ab",
          900: "#d0d1d5",
        },
        greenAccent: {
          100: "#0f2922",
          200: "#1e5245",
          300: "#2e7c67",
          400: "#3da58a",
          500: "#4cceac",
          600: "#70d8bd",
          700: "#94e2cd",
          800: "#b7ebde",
          900: "#dbf5ee",
        },
        redAccent: {
          100: "#2c100f",
          200: "#58201e",
          300: "#832f2c",
          400: "#af3f3b",
          500: "#db4f4a",
          600: "#e2726e",
          700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb",
        },
        blueAccent: {
          100: "#151632",
          200: "#2a2d64",
          300: "#3e4396",
          400: "#535ac8",
          500: "#6870fa",
          600: "#868dfb",
          700: "#a4a9fc",
          800: "#c3c6fd",
          900: "#e1e2fe",
        },
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#fdfdf7",
            },
            text: {
              primary: colors.grey[900], // TEXTO NEGRO para modo light
            },
          }
        : {
            // palette values for dark mode
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#fcfcfc",
            },
            text: {
              primary: colors.grey[100], // TEXTO BLANCO para modo dark
            },
          }),
    },
    components: {
      // Estilos globales para TextFields
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              // Fondo blanco hueso para ambos modos
              backgroundColor: mode === "light" ? "#fefefe" : "#fefefe",
              color: "#000000 !important", // Texto negro forzado
              borderRadius: "8px",
              transition: "all 0.2s ease-in-out",
              "& fieldset": {
                borderColor: mode === "light" ? colors.grey[300] : colors.grey[400],
                borderWidth: "1px",
              },
              "&:hover fieldset": {
                borderColor: mode === "light" ? colors.grey[400] : colors.grey[500],
              },
              "&.Mui-focused fieldset": {
                borderColor: colors.greenAccent[500],
                borderWidth: "2px",
              },
              "&.Mui-focused": {
                backgroundColor: "#ffffff", // Blanco puro al enfocar
                boxShadow: mode === "light" 
                  ? `0 0 0 3px ${colors.greenAccent[200]}40`  // Sombra verde suave
                  : `0 0 0 3px ${colors.greenAccent[300]}50`, // Sombra verde suave
              },
            },
            "& .MuiInputBase-input": {
              color: "#000000 !important", // Texto negro forzado
              "&::placeholder": {
                color: colors.grey[500],
                opacity: 0.7,
              },
            },
            // Asegurar texto negro en todos los elementos de input
            "& input": {
              color: "#000000 !important",
            },
            "& textarea": {
              color: "#000000 !important",
            },
            "& .MuiInputLabel-root": {
              color: mode === "light" ? colors.grey[600] : colors.grey[700],
              "&.Mui-focused": {
                color: colors.greenAccent[600],
                fontWeight: 500,
              },
            },
            // Estilos para campos select
            "& .MuiSelect-select": {
              color: "#000000 !important", // Texto negro en selects
            },
            "& .MuiSelect-icon": {
              color: colors.grey[600], // Icono de dropdown
            },
            // Estilos para helper text y errores
            "& .MuiFormHelperText-root": {
              marginLeft: "4px",
              "&.Mui-error": {
                color: colors.redAccent[500],
              },
            },
          },
        },
      },
      // Estilos para los MenuItems de los selects
      MuiMenuItem: {
        styleOverrides: {
          root: {
            backgroundColor: "#ffffff",
            color: colors.grey[900],
            "&:hover": {
              backgroundColor: colors.greenAccent[100],
            },
            "&.Mui-selected": {
              backgroundColor: colors.greenAccent[200],
              color: colors.greenAccent[800],
              "&:hover": {
                backgroundColor: colors.greenAccent[300],
              },
            },
          },
        },
      },
      // Estilos para el Paper del dropdown
      MuiPaper: {
        styleOverrides: {
          root: {
            "&.MuiMenu-paper": {
              backgroundColor: "#ffffff",
              border: `1px solid ${colors.grey[300]}`,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            },
          },
        },
      },
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};