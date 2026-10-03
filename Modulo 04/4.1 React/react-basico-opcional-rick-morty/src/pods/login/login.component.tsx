import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Login } from "./login.vm";
import css from "./login.module.css";

interface Props {
  login: Login;
  onChangeField: (field: keyof Login, value: string) => void;
  onSubmit: (login: Login) => void;
}

export const LoginComponent: React.FC<Props> = (props) => {
  const { login, onChangeField, onSubmit } = props;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(login);
  };

  return (
    <Box className={css.page}>
      <Card className={css.card}>
        <CardContent>
          <Stack component="form" onSubmit={handleSubmit} spacing={2}>
            <Typography variant="h5" component="h2" gutterBottom>
              Hello from login page
            </Typography>
            <TextField
              label="Username"
              value={login.username}
              onChange={(e) => onChangeField("username", e.target.value)}
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              value={login.password}
              onChange={(e) => onChangeField("password", e.target.value)}
              fullWidth
            />
            <Button type="submit" variant="contained" size="large" fullWidth>
              Login
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};
