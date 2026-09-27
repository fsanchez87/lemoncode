import React from "react";

interface FilterContextProps {
  filter: string;
  setFilter: (value: string) => void;
}

export const FilterContext = React.createContext<FilterContextProps>({
  filter: "",
  setFilter: (value) => {},
});

export const FilterProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [filter, setFilter] = React.useState<string>("lemoncode");

  return (
    <FilterContext value={{ filter, setFilter }}>{children}</FilterContext>
  );
};

export const useFilterContext = () => {
  const context = React.useContext(FilterContext);

  if (!context) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
};
