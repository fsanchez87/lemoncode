import React from "react";
import { useParams } from "react-router-dom";
import { AppLayout } from "@/layouts";
import { GithubDetailContainer } from "@/pods/github-detail";

export const GithubDetailPage: React.FC = () => {
  const { id } = useParams();

  return (
    <AppLayout>
      <GithubDetailContainer id={id} />
    </AppLayout>
  );
};
