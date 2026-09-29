import React from "react";

interface RickMortyFilterContextProps {
  filter: string;
  setFilter: (value: string) => void;
}

/**
 * Contexto propio de la sección de Rick & Morty. Se mantiene separado del
 * `FilterContext` de GitHub para no compartir estado entre ambas secciones.
 */
export const RickMortyFilterContext =
  React.createContext<RickMortyFilterContextProps>({
    filter: "",
    setFilter: (value) => {},
  });

export const RickMortyFilterProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  // A diferencia de GitHub, aquí empezamos sin filtro para ver todos los personajes.
  const [filter, setFilter] = React.useState<string>("");

  return (
    <RickMortyFilterContext value={{ filter, setFilter }}>
      {children}
    </RickMortyFilterContext>
  );
};

export const useRickMortyFilterContext = () => {
  const context = React.useContext(RickMortyFilterContext);

  if (!context) {
    throw new Error(
      "useRickMortyFilterContext must be used within a RickMortyFilterProvider"
    );
  }
  return context;
};
