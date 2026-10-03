import * as api from "./rick-morty-detail.api-model";
import * as vm from "./rick-morty-detail.vm";

export const mapCharacterDetailFromApiToVm = (
  character: api.CharacterDetailApi
): vm.CharacterDetail => ({
  id: character.id.toString(),
  name: character.name,
  status: character.status,
  species: character.species,
  type: character.type,
  gender: character.gender,
  // El view model aplana los objetos anidados y cuenta los episodios.
  origin: character.origin.name,
  location: character.location.name,
  image: character.image,
  episodeCount: character.episode.length,
});
