import { getCharacterCollection as getCharacterCollectionApi } from "./rick-morty-list.api";
import { mapCharacterCollectionFromApiToVm } from "./rick-morty-list.mapper";
import { CharacterCollection } from "./rick-morty-list.vm";

export const getCharacterCollection = (
  name: string,
  page: number
): Promise<CharacterCollection> =>
  getCharacterCollectionApi(name, page).then((result) =>
    mapCharacterCollectionFromApiToVm(result)
  );
