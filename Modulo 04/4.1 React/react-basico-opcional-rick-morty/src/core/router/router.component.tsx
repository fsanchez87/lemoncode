import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import {
  GithubDetailPage,
  GithubListPage,
  LoginPage,
  RickMortyDetailPage,
  RickMortyListPage,
} from "@/scenes";
import { switchRoutes } from "./routes";

export const RouterComponent: React.FC = () => (
  <Router>
    <Routes>
      <Route path={switchRoutes.root} element={<LoginPage />} />
      <Route path={switchRoutes.list} element={<GithubListPage />} />
      <Route path={switchRoutes.details} element={<GithubDetailPage />} />
      <Route path={switchRoutes.rickMorty} element={<RickMortyListPage />} />
      <Route
        path={switchRoutes.rickMortyDetails}
        element={<RickMortyDetailPage />}
      />
      {/* Cualquier ruta desconocida vuelve al login. */}
      <Route path="*" element={<Navigate to={switchRoutes.root} />} />
    </Routes>
  </Router>
);
