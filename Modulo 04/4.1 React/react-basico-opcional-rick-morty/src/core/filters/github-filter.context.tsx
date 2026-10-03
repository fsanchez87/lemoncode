import React from "react";

interface GithubFilterContextProps {
  filter: string;
  setFilter: (value: string) => void;
}

// La sección de GitHub arranca buscando esta organización.
const defaultGithubFilter = "lemoncode";

export const GithubFilterContext =
  React.createContext<GithubFilterContextProps>({
    filter: defaultGithubFilter,
    setFilter: () =>
      console.warn(
        "Falta el provider de filtro de GitHub en la parte superior de la app"
      ),
  });

export const GithubFilterProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [filter, setFilter] = React.useState<string>(defaultGithubFilter);

  // Se memoriza el valor para no recrear el objeto en cada render.
  const value = React.useMemo(() => ({ filter, setFilter }), [filter]);

  return (
    <GithubFilterContext.Provider value={value}>
      {children}
    </GithubFilterContext.Provider>
  );
};

export const useGithubFilterContext = () =>
  React.useContext(GithubFilterContext);
