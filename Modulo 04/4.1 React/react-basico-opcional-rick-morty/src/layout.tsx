import React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

/**
 * Estructura visual común a todas las páginas
 */
export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            React Básico · Material UI
          </Typography>
          {/* Enlaces para alternar entre las dos secciones de la aplicación. */}
          <Stack direction="row" sx={{ gap: 1 }}>
            <Button color="inherit" component={RouterLink} to="/list">
              GitHub
            </Button>
            <Button color="inherit" component={RouterLink} to="/rick-morty">
              Rick & Morty
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ py: 4 }}>
        {children}
      </Container>
    </>
  );
};
