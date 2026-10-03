import React from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "@/core";
import { ProfileContext } from "@/core/profile";
import { doLogin } from "./login.api";
import { createEmptyLogin, Login } from "./login.vm";
import { LoginComponent } from "./login.component";

export const LoginContainer: React.FC = () => {
  const navigate = useNavigate();
  const { setUserProfile } = React.useContext(ProfileContext);
  // El estado del formulario vive en el contenedor; el componente solo pinta.
  const [login, setLogin] = React.useState<Login>(createEmptyLogin());

  const handleChangeField = (field: keyof Login, value: string) => {
    setLogin({ ...login, [field]: value });
  };

  const handleSubmit = (loginValues: Login) => {
    const { username, password } = loginValues;

    doLogin(username, password).then((result) => {
      if (result) {
        // El usuario queda disponible para el layout de toda la aplicación.
        setUserProfile({ userName: username });
        navigate(routes.list);
      } else {
        alert("User / password not valid, psst... admin / test");
      }
    });
  };

  return (
    <LoginComponent
      login={login}
      onChangeField={handleChangeField}
      onSubmit={handleSubmit}
    />
  );
};
