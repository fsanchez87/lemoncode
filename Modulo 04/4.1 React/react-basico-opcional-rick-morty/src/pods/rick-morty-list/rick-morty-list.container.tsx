import React from "react";
import { useDebounce } from "@/common/hooks";
import { useRickMortyFilterContext } from "@/core/filters";
import { RickMortyListComponent } from "./rick-morty-list.component";
import { getCharacterCollection } from "./rick-morty-list.repository";
import {
  CharacterCollection,
  createEmptyCharacterCollection,
} from "./rick-morty-list.vm";

export const RickMortyListContainer: React.FC = () => {
  const { filter, setFilter } = useRickMortyFilterContext();
  const [collection, setCollection] = React.useState<CharacterCollection>(
    createEmptyCharacterCollection()
  );
  // La API de Rick & Morty siempre devuelve 20 personajes por página.
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [notFound, setNotFound] = React.useState(false);

  const debouncedFilter = useDebounce(filter, 500);

  React.useEffect(() => {
    let ignore = false;

    setLoading(true);

    getCharacterCollection(debouncedFilter, page)
      .then((characterCollection) => {
        if (ignore) {
          return;
        }

        setCollection(characterCollection);
        setNotFound(false);
        setLoading(false);
      })
      .catch(() => {
        if (ignore) {
          return;
        }

        setCollection(createEmptyCharacterCollection());
        setNotFound(true);
        setLoading(false);
      });

    return () => {
      // Evita que una respuesta anterior sobrescriba el resultado más reciente.
      ignore = true;
    };
  }, [debouncedFilter, page]);

  const handleFilterChange = (value: string) => {
    setFilter(value.toLowerCase());
    // Un filtro nuevo siempre empieza por la primera página.
    setPage(1);
  };

  const handleGoToPage = (targetPage: number) => {
    // Solo se permite navegar dentro del rango de páginas disponibles.
    if (targetPage >= 1 && targetPage <= collection.totalPages) {
      setPage(targetPage);
    }
  };

  return (
    <RickMortyListComponent
      collection={collection}
      filter={filter}
      onFilterChange={handleFilterChange}
      page={page}
      loading={loading}
      notFound={notFound}
      onGoToPage={handleGoToPage}
    />
  );
};
