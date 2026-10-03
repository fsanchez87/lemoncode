import { getMemberCollection as getMemberCollectionApi } from "./github-list.api";
import { mapMemberCollectionFromApiToVm } from "./github-list.mapper";
import { MemberCollection } from "./github-list.vm";

export const getMemberCollection = (
  org: string,
  perPage: number,
  page: number
): Promise<MemberCollection> =>
  getMemberCollectionApi(org, perPage, page).then((result) =>
    mapMemberCollectionFromApiToVm(result)
  );
