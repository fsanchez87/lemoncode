import React from "react";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
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
import { useFilterContext } from "./filter.context";
import {
  getPageFromUrl,
  parseLinkHeader,
  PageLinks,
} from "./pagination";

interface MemberEntity {
  id: string;
  login: string;
  avatar_url: string;
}

// Valores permitidos para `per_page`, el parámetro que limita los miembros por respuesta.
const PER_PAGE_OPTIONS = [5, 10, 25, 50];

export const ListPage: React.FC = () => {
  const { filter, setFilter } = useFilterContext();
  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  // Página actual y tamaño del bloque que se pide a GitHub.
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(5);
  // URLs de navegación que GitHub expone en la cabecera HTTP `Link`.
  const [links, setLinks] = React.useState<PageLinks>({});
  const [loading, setLoading] = React.useState(false);
  const [notFound, setNotFound] = React.useState(false);

  const debouncedFilter = useDebounce(filter, 500);

  React.useEffect(() => {
    let ignore = false;

    setLoading(true);

    // `per_page` y `page` son parámetros propios de la  API REST de GitHub para paginar resultados.
    fetch(
      `https://api.github.com/orgs/${debouncedFilter}/members?per_page=${perPage}&page=${page}`
    )
      .then((response) => {
        if (!response.ok) {
          // Sin una respuesta válida no hay miembros ni enlaces por los que navegar.
          return { ok: false, data: [], links: {} };
        }

        return {
          ok: true,
          // El cuerpo contiene solo los miembros de la página solicitada.
          data: response.json(),
          // La cabecera indica si existen páginas antes o después de la actual.
          links: parseLinkHeader(response.headers.get("link")),
        };
      })
      .then(async ({ ok, data, links }) => {
        if (ignore) {
          return;
        }

        setMembers(ok ? await data : []);
        // Se guardan los enlaces de esta respuesta para habilitar sus botones.
        setLinks(links);
        setNotFound(!ok);
        setLoading(false);
      })
      .catch(() => {
        if (ignore) {
          return;
        }

        setMembers([]);
        setLinks({});
        setNotFound(true);
        setLoading(false);
      });

    return () => {
      // Evita que una respuesta anterior sobrescriba el resultado más reciente.
      ignore = true;
    };
  }, [debouncedFilter, perPage, page]);

  const goTo = (url?: string) => {
    // Los botones usan las URLs que devuelve GitHub; solo extraemos su parámetro `page`.
    const targetPage = getPageFromUrl(url);

    if (targetPage) {
      setPage(targetPage);
    }
  };

  // `last` puede no existir: por ejemplo, si GitHub no puede calcularla.
  const lastPage = getPageFromUrl(links.last);

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Hello from List page
      </Typography>
      <TextField
        label="Search members"
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
      {members.length > 0 ? (
        <>
          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{ maxHeight: { xs: "40vh", sm: "50vh" } }}
          >
            <Table
              size="small"
              stickyHeader
              aria-label="Miembros de la organización"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Avatar</TableCell>
                  <TableCell>Id</TableCell>
                  <TableCell>Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <Avatar
                        src={member.avatar_url}
                        alt={member.login}
                        sx={{ width: 48, height: 48 }}
                      />
                    </TableCell>
                    <TableCell>{member.id}</TableCell>
                    <TableCell>
                      <Link component={RouterLink} to={`/detail/${member.login}`}>
                        {member.login}
                      </Link>
                    </TableCell>
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
              {/* Si GitHub no entrega el enlace, ya estamos en la primera página. */}
              <Button
                variant="outlined"
                size="small"
                disabled={loading || !links.first}
                onClick={() => goTo(links.first)}
              >
                « First
              </Button>
              {/* `prev` falta en la primera página. */}
              <Button
                variant="outlined"
                size="small"
                disabled={loading || !links.prev}
                onClick={() => goTo(links.prev)}
              >
                ‹ Prev
              </Button>
              <Typography sx={{ minWidth: 110, textAlign: "center" }}>
                Page {page}
                {lastPage ? ` of ${lastPage}` : ""}
              </Typography>
              {/* `next` falta en la última página. */}
              <Button
                variant="outlined"
                size="small"
                disabled={loading || !links.next}
                onClick={() => goTo(links.next)}
              >
                Next ›
              </Button>
              {/* `last` permite saltar directamente al final cuando está disponible. */}
              <Button
                variant="outlined"
                size="small"
                disabled={loading || !links.last}
                onClick={() => goTo(links.last)}
              >
                Last »
              </Button>
            </Stack>
            <TextField
              select
              size="small"
              label="Per page"
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                // Al cambiar el tamaño de página se reinicia para evitar páginas inexistentes.
                setPage(1);
              }}
              sx={{
                ml: { sm: "auto" },
                minWidth: 120,
                width: { xs: "100%", sm: 150 },
              }}
            >
              {PER_PAGE_OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </>
      ) : (
        !loading && notFound && (
          <Alert severity="warning">No se encuentra la organización</Alert>
        )
      )}
      <Stack direction="row" sx={{ mt: 3 }}>
        <Button component={RouterLink} to="/detail" nativeButton={false}>
          Navigate to detail page
        </Button>
      </Stack>
    </>
  );
};
