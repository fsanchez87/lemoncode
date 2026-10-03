export interface CharacterEntity {
  id: string;
  name: string;
  status: string;
  species: string;
  image: string;
}

export interface CharacterCollection {
  characters: CharacterEntity[];
  // Total de páginas que devuelve la API para el filtro actual.
  totalPages: number;
}

export const createEmptyCharacterCollection = (): CharacterCollection => ({
  characters: [],
  totalPages: 0,
});
