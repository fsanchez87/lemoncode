import React from "react";
import { GithubDetailComponent } from "./github-detail.component";
import { createGithubMemberDetail } from "./github-detail.vm";

interface Props {
  id: string;
}

export const GithubDetailContainer: React.FC<Props> = (props) => {
  const { id } = props;

  // La escena aporta el parámetro de la URL; el pod no conoce el router.
  const detail = createGithubMemberDetail(id);

  return <GithubDetailComponent detail={detail} />;
};
