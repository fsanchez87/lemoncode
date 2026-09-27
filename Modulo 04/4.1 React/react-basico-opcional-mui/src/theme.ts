import { createTheme } from "@mui/material/styles";

/**
 * Tema de Material UI de la aplicación.
 */
export const theme = createTheme({
  palette: {
    primary: {
      main: "#2f4858",
      light: "#5a7787",
      dark: "#1e2f3a",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f7f9fa",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
});
