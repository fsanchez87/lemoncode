import React from "react";
import { AppLayout } from "@/layouts";
import { RickMortyListContainer } from "@/pods/rick-morty-list";

export const RickMortyListPage: React.FC = () => (
  <AppLayout>
    <RickMortyListContainer />
  </AppLayout>
);
