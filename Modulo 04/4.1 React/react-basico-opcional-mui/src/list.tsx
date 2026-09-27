import React from "react";
import { Link } from "react-router-dom";
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
      <h2>Hello from List page</h2>
      <label>
        Search members:
        <input
          type="text"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value.toLowerCase());
            // Un filtro nuevo siempre empieza por la primera página.
            setPage(1);
          }}
        />
      </label>
      <hr />
      {members.length > 0 ? (
        <>
          <div className="list-user-list-container">
            <span className="list-header">Avatar</span>
            <span className="list-header">Id</span>
            <span className="list-header">Name</span>
            {members.map((member) => (
              <React.Fragment key={member.id}>
                <img src={member.avatar_url} />
                <span>{member.id}</span>
                <Link to={`/detail/${member.login}`}>{member.login}</Link>
              </React.Fragment>
            ))}
          </div>
          <div className="pagination">
            {/* Si GitHub no entrega el enlace, ya estamos en la primera página. */}
            <button
              disabled={loading || !links.first}
              onClick={() => goTo(links.first)}
            >
              « First
            </button>
            {/* `prev` falta en la primera página. */}
            <button
              disabled={loading || !links.prev}
              onClick={() => goTo(links.prev)}
            >
              ‹ Prev
            </button>
            <span>
              Page {page}
              {lastPage ? ` of ${lastPage}` : ""}
            </span>
            {/* `next` falta en la última página. */}
            <button
              disabled={loading || !links.next}
              onClick={() => goTo(links.next)}
            >
              Next ›
            </button>
            {/* `last` permite saltar directamente al final cuando está disponible. */}
            <button
              disabled={loading || !links.last}
              onClick={() => goTo(links.last)}
            >
              Last »
            </button>
            <label>
              Per page:
              <select
                value={perPage}
                onChange={(e) => {
                  setPerPage(Number(e.target.value));
                  // Al cambiar el tamaño de página se reinicia para evitar páginas inexistentes.
                  setPage(1);
                }}
              >
                {PER_PAGE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </>
      ) : (
        !loading && notFound && <p>No se encuentra la organización</p>
      )}
      <Link to="/detail">Navigate to detail page</Link>
    </>
  );
};
