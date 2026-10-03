import { CharacterDetailApi } from "./rick-morty-detail.api-model";

/**
 * El endpoint devuelve un único personaje a partir de su id. Un id inexistente
 * provoca un 404 en la API.
 */
export const getCharacterDetail = (id: string): Promise<CharacterDetailApi> =>
  fetch(`https://rickandmortyapi.com/api/character/${id}`).then((response) => {
    if (!response.ok) {
      return Promise.reject(new Error("Rick & Morty character not found"));
    }

    return response.json();
  });
