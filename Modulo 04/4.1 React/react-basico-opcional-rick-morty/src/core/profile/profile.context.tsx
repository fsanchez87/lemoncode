import React from "react";
import { createEmptyUserProfile, UserProfile } from "./profile.vm";

interface Context extends UserProfile {
  setUserProfile: (userProfile: UserProfile) => void;
}

const noUserLogin = "no user login";

export const ProfileContext = React.createContext<Context>({
  userName: noUserLogin,
  setUserProfile: () =>
    console.warn("Falta el provider de perfil en la parte superior de la app"),
});

export const ProfileProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [userProfile, setUserProfile] = React.useState<UserProfile>(
    createEmptyUserProfile()
  );

  // Se memoriza el valor para no recrear el objeto en cada render.
  const value = React.useMemo(
    () => ({ userName: userProfile.userName, setUserProfile }),
    [userProfile.userName]
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
