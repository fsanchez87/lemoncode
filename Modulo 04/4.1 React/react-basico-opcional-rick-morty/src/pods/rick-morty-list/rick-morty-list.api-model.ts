export interface CharacterEntityApi {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

export interface CharacterCollectionApi {
  info: {
    count: number;
    // La API calcula el total de páginas según el filtro aplicado.
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: CharacterEntityApi[];
}
