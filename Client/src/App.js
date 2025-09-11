
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../src/theme";
import Routes from './routes';


function App() {
  const [theme, colorMode] = useMode();

  return (
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  </ColorModeContext.Provider> 
      
    
  );
}
export default App;
