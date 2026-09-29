import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LoginPage } from "./login";
import { ListPage } from "./list";
import { DetailPage } from "./detail";
import { FilterProvider } from "./filter.context";
import { RickMortyFilterProvider } from "./rick-morty-filter.context";
import { RickMortyListPage } from "./rick-morty-list";
import { RickMortyDetailPage } from "./rick-morty-detail";
import { Layout } from "./layout";

export const App = () => {
  return (
    <Router>
      <FilterProvider>
        <RickMortyFilterProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/list" element={<ListPage />} />
              <Route path="/detail/:id" element={<DetailPage />} />
              <Route path="/rick-morty" element={<RickMortyListPage />} />
              <Route
                path="/rick-morty/detail/:id"
                element={<RickMortyDetailPage />}
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Layout>
        </RickMortyFilterProvider>
      </FilterProvider>
    </Router>
  );
};
