import { CharacterCollectionApi } from "./rick-morty-list.api-model";

/**
 * `page` y `name` son los parámetros de paginación y filtrado de la API. La API
 * responde 404 cuando el filtro no encuentra personajes.
 */
export const getCharacterCollection = (
  name: string,
  page: number
): Promise<CharacterCollectionApi> => {
  const params = new URLSearchParams({ page: String(page) });

  if (name) {
    params.set("name", name);
  }

  return fetch(
    `https://rickandmortyapi.com/api/character/?${params.toString()}`
  ).then((response) => {
    if (!response.ok) {
      return Promise.reject(new Error("Rick & Morty characters not found"));
    }

    // El cuerpo contiene los personajes de la página y sus metadatos.
    return response.json();
  });
};
