import React from "react";
import { AppLayout } from "@/layouts";
import { GithubListContainer } from "@/pods/github-list";

export const GithubListPage: React.FC = () => (
  <AppLayout>
    <GithubListContainer />
  </AppLayout>
);
