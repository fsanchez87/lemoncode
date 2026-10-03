import React from "react";

interface RickMortyFilterContextProps {
  filter: string;
  setFilter: (value: string) => void;
}

/**
 * Contexto propio de la sección de Rick & Morty. Se mantiene separado del
 * filtro de GitHub para no compartir estado entre ambas secciones.
 */
export const RickMortyFilterContext =
  React.createContext<RickMortyFilterContextProps>({
    filter: "",
    setFilter: () =>
      console.warn(
        "Falta el provider de filtro de Rick & Morty en la parte superior de la app"
      ),
  });

export const RickMortyFilterProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  // A diferencia de GitHub, aquí empezamos sin filtro para ver todos los personajes.
  const [filter, setFilter] = React.useState<string>("");

  // Se memoriza el valor para no recrear el objeto en cada render.
  const value = React.useMemo(() => ({ filter, setFilter }), [filter]);

  return (
    <RickMortyFilterContext.Provider value={value}>
      {children}
    </RickMortyFilterContext.Provider>
  );
};

export const useRickMortyFilterContext = () =>
  React.useContext(RickMortyFilterContext);
