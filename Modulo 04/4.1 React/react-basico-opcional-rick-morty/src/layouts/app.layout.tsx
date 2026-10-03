import React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { routes } from "@/core";
import { ProfileContext } from "@/core/profile";
import css from "./app.layout.module.css";

/**
 * Estructura visual común a todas las páginas.
 */
export const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { userName } = React.useContext(ProfileContext);

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="h1" className={css.title}>
            React Básico · Material UI
          </Typography>
          {/* Enlaces para alternar entre las dos secciones de la aplicación. */}
          <Stack direction="row" className={css.nav}>
            <Button color="inherit" component={RouterLink} to={routes.list}>
              GitHub
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to={routes.rickMorty}
            >
              Rick & Morty
            </Button>
          </Stack>
          {userName ? (
            <Typography variant="body2" className={css.userName}>
              {userName}
            </Typography>
          ) : null}
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" className={css.content}>
        {children}
      </Container>
    </>
  );
};
