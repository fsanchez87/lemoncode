import React from "react";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { useDebounce } from "./useDebounce";
import { useRickMortyFilterContext } from "./rick-morty-filter.context";

interface CharacterEntity {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

interface CharacterResponse {
  info: {
    count: number;
    // La API calcula el total de páginas según el filtro aplicado.
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: CharacterEntity[];
}

export const RickMortyListPage: React.FC = () => {
  const { filter, setFilter } = useRickMortyFilterContext();
  const [characters, setCharacters] = React.useState<CharacterEntity[]>([]);
  // La API de Rick & Morty siempre devuelve 20 personajes por página.
  const [page, setPage] = React.useState(1);
  // Total de páginas que devuelve la API para el filtro actual.
  const [totalPages, setTotalPages] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [notFound, setNotFound] = React.useState(false);

  const debouncedFilter = useDebounce(filter, 500);

  React.useEffect(() => {
    let ignore = false;

    setLoading(true);

    // `page` y `name` son los parámetros de filtrado y paginación de la API.
    const params = new URLSearchParams({ page: String(page) });

    if (debouncedFilter) {
      params.set("name", debouncedFilter);
    }

    fetch(`https://rickandmortyapi.com/api/character/?${params.toString()}`)
      .then((response) => {
        if (!response.ok) {
          // La API responde 404 cuando el filtro no encuentra personajes.
          return { ok: false, data: null };
        }

        return {
          ok: true,
          // El cuerpo contiene los personajes de la página y sus metadatos.
          data: response.json(),
        };
      })
      .then(async ({ ok, data }) => {
        if (ignore) {
          return;
        }

        const payload: CharacterResponse | null = ok ? await data : null;

        setCharacters(payload?.results ?? []);
        // `pages` permite calcular primera, anterior, siguiente y última.
        setTotalPages(payload?.info.pages ?? 0);
        setNotFound(!ok);
        setLoading(false);
      })
      .catch(() => {
        if (ignore) {
          return;
        }

        setCharacters([]);
        setTotalPages(0);
        setNotFound(true);
        setLoading(false);
      });

    return () => {
      // Evita que una respuesta anterior sobrescriba el resultado más reciente.
      ignore = true;
    };
  }, [debouncedFilter, page]);

  const goToPage = (targetPage: number) => {
    // Solo se permite navegar dentro del rango de páginas disponibles.
    if (targetPage >= 1 && targetPage <= totalPages) {
      setPage(targetPage);
    }
  };

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Hello from Rick & Morty list page
      </Typography>
      <TextField
        label="Search characters"
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value.toLowerCase());
          // Un filtro nuevo siempre empieza por la primera página.
          setPage(1);
        }}
        fullWidth
        sx={{ maxWidth: 400 }}
      />
      <Divider sx={{ my: 3 }} />
      {characters.length > 0 ? (
        <>
          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{ maxHeight: { xs: "40vh", sm: "50vh" } }}
          >
            <Table size="small" stickyHeader aria-label="Personajes de la serie">
              <TableHead>
                <TableRow>
                  <TableCell>Avatar</TableCell>
                  <TableCell>Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Species</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {characters.map((character) => (
                  <TableRow key={character.id}>
                    <TableCell>
                      <Avatar
                        src={character.image}
                        alt={character.name}
                        sx={{ width: 48, height: 48 }}
                      />
                    </TableCell>
                    <TableCell>{character.id}</TableCell>
                    <TableCell>
                      <Link
                        component={RouterLink}
                        to={`/rick-morty/detail/${character.id}`}
                      >
                        {character.name}
                      </Link>
                    </TableCell>
                    <TableCell>{character.status}</TableCell>
                    <TableCell>{character.species}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack direction={{ xs: "column", sm: "row" }} sx={{ gap: 1, mt: 2 }}>
            <Stack
              direction="row"
              sx={{ alignItems: "center", flexWrap: "wrap", gap: 1 }}
            >
              <Button
                variant="outlined"
                size="small"
                disabled={loading || page <= 1}
                onClick={() => goToPage(1)}
              >
                « First
              </Button>
              <Button
                variant="outlined"
                size="small"
                disabled={loading || page <= 1}
                onClick={() => goToPage(page - 1)}
              >
                ‹ Prev
              </Button>
              <Typography sx={{ minWidth: 110, textAlign: "center" }}>
                Page {page} of {totalPages}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                disabled={loading || page >= totalPages}
                onClick={() => goToPage(page + 1)}
              >
                Next ›
              </Button>
              <Button
                variant="outlined"
                size="small"
                disabled={loading || page >= totalPages}
                onClick={() => goToPage(totalPages)}
              >
                Last »
              </Button>
            </Stack>
          </Stack>
        </>
      ) : (
        !loading && notFound && (
          <Alert severity="warning">No se encuentran personajes</Alert>
        )
      )}
    </>
  );
};
