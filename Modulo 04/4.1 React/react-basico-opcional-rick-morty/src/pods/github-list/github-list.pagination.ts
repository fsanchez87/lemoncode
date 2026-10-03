import { PageLinksApi } from "./github-list.api-model";

/**
 * Convierte la cabecera `Link` de GitHub en las URLs de primera, anterior,
 * siguiente y última página. GitHub indica qué botones deben estar disponibles.
 *
 * Ejemplo de cabecera:
 *   <https://api.github.com/...?page=2>; rel="next", <https://...?page=3>; rel="last"
 */
export const parseLinkHeader = (header: string | null): PageLinksApi => {
  const links: PageLinksApi = {};

  if (!header) {
    // Una única página no suele incluir cabecera `Link`.
    return links;
  }

  // La cabecera separa cada relación (`next`, `last`, etc.) con una coma.
  header.split(",").forEach((part) => {
    // Extrae la URL entre `<...>` y el tipo de enlace de `rel="..."`.
    const match = part.match(/<([^>]+)>;\s*rel="([^"]+)"/);

    if (!match) {
      return;
    }

    const [, url, rel] = match;

    if (rel === "first" || rel === "prev" || rel === "next" || rel === "last") {
      // Solo se guardan las relaciones que usa la interfaz de paginación.
      links[rel] = url;
    }
  });

  return links;
};

/** Obtiene el número de página de una URL procedente de la cabecera `Link`. */
export const getPageFromUrl = (url?: string): number | undefined => {
  if (!url) {
    return undefined;
  }

  const page = new URL(url).searchParams.get("page");

  // Se convierte de texto a número para poder calcular la última página.
  return page ? Number(page) : undefined;
};
