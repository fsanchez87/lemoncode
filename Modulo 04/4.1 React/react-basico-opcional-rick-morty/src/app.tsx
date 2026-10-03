import React from "react";
import "@/global-css/styles.css";
import { RouterComponent } from "@/core";
import { GithubFilterProvider, RickMortyFilterProvider } from "@/core/filters";
import { ProfileProvider } from "@/core/profile";

export const App: React.FC = () => (
  <ProfileProvider>
    <GithubFilterProvider>
      <RickMortyFilterProvider>
        <RouterComponent />
      </RickMortyFilterProvider>
    </GithubFilterProvider>
  </ProfileProvider>
);
