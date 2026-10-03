import { getCharacterDetail as getCharacterDetailApi } from "./rick-morty-detail.api";
import { mapCharacterDetailFromApiToVm } from "./rick-morty-detail.mapper";
import { CharacterDetail } from "./rick-morty-detail.vm";

export const getCharacterDetail = (id: string): Promise<CharacterDetail> =>
  getCharacterDetailApi(id).then((result) =>
    mapCharacterDetailFromApiToVm(result)
  );
