export interface GithubMemberDetail {
  id: string;
}

export const createGithubMemberDetail = (id: string): GithubMemberDetail => ({
  id,
});
