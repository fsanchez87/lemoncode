import * as api from "./github-list.api-model";
import * as vm from "./github-list.vm";
import { getPageFromUrl } from "./github-list.pagination";

export const mapMemberFromApiToVm = (
  member: api.MemberEntityApi
): vm.MemberEntity => ({
  id: member.id.toString(),
  login: member.login,
  avatar_url: member.avatar_url,
});

export const mapMemberCollectionFromApiToVm = (
  memberCollection: api.MemberCollectionApi
): vm.MemberCollection => ({
  members: memberCollection.members.map((member) =>
    mapMemberFromApiToVm(member)
  ),
  lastPage: getPageFromUrl(memberCollection.links.last),
  canGoPrev: Boolean(memberCollection.links.prev),
  canGoNext: Boolean(memberCollection.links.next),
});
