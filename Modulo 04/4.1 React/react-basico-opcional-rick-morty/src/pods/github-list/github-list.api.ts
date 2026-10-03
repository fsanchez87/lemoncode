import { MemberCollectionApi } from "./github-list.api-model";
import { parseLinkHeader } from "./github-list.pagination";

/**
 * `per_page` y `page` son parámetros propios de la API REST de GitHub para
 * paginar resultados. Si la organización no existe, la petición falla.
 */
export const getMemberCollection = (
  org: string,
  perPage: number,
  page: number
): Promise<MemberCollectionApi> =>
  fetch(
    `https://api.github.com/orgs/${org}/members?per_page=${perPage}&page=${page}`
  ).then((response) => {
    if (!response.ok) {
      return Promise.reject(new Error("GitHub organization not found"));
    }

    // El cuerpo contiene solo los miembros de la página solicitada.
    return response.json().then((members) => ({
      members,
      // La cabecera indica si existen páginas antes o después de la actual.
      links: parseLinkHeader(response.headers.get("link")),
    }));
  });
