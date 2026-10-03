import { generatePath } from "react-router-dom";

interface SwitchRoutes {
  root: string;
  list: string;
  details: string;
  rickMorty: string;
  rickMortyDetails: string;
}

// Rutas tal cual se declaran en los `<Route path={...}>`.
export const switchRoutes: SwitchRoutes = {
  root: "/",
  list: "/list",
  details: "/detail/:id",
  rickMorty: "/rick-morty",
  rickMortyDetails: "/rick-morty/detail/:id",
};

interface Routes
  extends Omit<SwitchRoutes, "details" | "rickMortyDetails"> {
  details: (id: string) => string;
  rickMortyDetails: (id: string) => string;
}

// Rutas listas para navegar: las que llevan parámetros se generan con `generatePath`.
export const routes: Routes = {
  ...switchRoutes,
  details: (id) => generatePath(switchRoutes.details, { id }),
  rickMortyDetails: (id) =>
    generatePath(switchRoutes.rickMortyDetails, { id }),
};
