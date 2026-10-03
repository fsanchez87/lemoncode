import * as api from "./rick-morty-list.api-model";
import * as vm from "./rick-morty-list.vm";

export const mapCharacterFromApiToVm = (
  character: api.CharacterEntityApi
): vm.CharacterEntity => ({
  id: character.id.toString(),
  name: character.name,
  status: character.status,
  species: character.species,
  image: character.image,
});

export const mapCharacterCollectionFromApiToVm = (
  characterCollection: api.CharacterCollectionApi
): vm.CharacterCollection => ({
  characters: characterCollection.results.map((character) =>
    mapCharacterFromApiToVm(character)
  ),
  totalPages: characterCollection.info.pages,
});
