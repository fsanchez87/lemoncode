import React from "react";
import { useParams } from "react-router-dom";
import { AppLayout } from "@/layouts";
import { RickMortyDetailContainer } from "@/pods/rick-morty-detail";

export const RickMortyDetailPage: React.FC = () => {
  const { id } = useParams();

  return (
    <AppLayout>
      <RickMortyDetailContainer id={id} />
    </AppLayout>
  );
};
