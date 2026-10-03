import React from "react";
import { useDebounce } from "@/common/hooks";
import { useGithubFilterContext } from "@/core/filters";
import { GithubListComponent } from "./github-list.component";
import { getMemberCollection } from "./github-list.repository";
import {
  createEmptyMemberCollection,
  MemberCollection,
} from "./github-list.vm";

export const GithubListContainer: React.FC = () => {
  const { filter, setFilter } = useGithubFilterContext();
  const [collection, setCollection] = React.useState<MemberCollection>(
    createEmptyMemberCollection()
  );
  // Página actual y tamaño del bloque que se pide a GitHub.
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(5);
  const [loading, setLoading] = React.useState(false);
  const [notFound, setNotFound] = React.useState(false);

  const debouncedFilter = useDebounce(filter, 500);

  React.useEffect(() => {
    let ignore = false;

    setLoading(true);

    getMemberCollection(debouncedFilter, perPage, page)
      .then((memberCollection) => {
        if (ignore) {
          return;
        }

        setCollection(memberCollection);
        setNotFound(false);
        setLoading(false);
      })
      .catch(() => {
        if (ignore) {
          return;
        }

        // Sin una respuesta válida no hay miembros ni enlaces por los que navegar.
        setCollection(createEmptyMemberCollection());
        setNotFound(true);
        setLoading(false);
      });

    return () => {
      // Evita que una respuesta anterior sobrescriba el resultado más reciente.
      ignore = true;
    };
  }, [debouncedFilter, perPage, page]);

  const handleFilterChange = (value: string) => {
    setFilter(value.toLowerCase());
    // Un filtro nuevo siempre empieza por la primera página.
    setPage(1);
  };

  const handlePerPageChange = (value: number) => {
    setPerPage(value);
    // Al cambiar el tamaño de página se reinicia para evitar páginas inexistentes.
    setPage(1);
  };

  return (
    <GithubListComponent
      collection={collection}
      filter={filter}
      onFilterChange={handleFilterChange}
      page={page}
      perPage={perPage}
      onPerPageChange={handlePerPageChange}
      loading={loading}
      notFound={notFound}
      onGoToPage={setPage}
    />
  );
};
