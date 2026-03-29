import React, { createContext, useContext, useState, useCallback } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [dietaryFilter, setDietaryFilter] = useState("All"); // All, Veg, Non-Veg

  const updateFilters = useCallback((filters) => {
    if (filters.search !== undefined) setSearch(filters.search);
    if (filters.category !== undefined) setCategory(filters.category);
    if (filters.dietaryFilter !== undefined) setDietaryFilter(filters.dietaryFilter);
  }, []);

  const clearFilters = useCallback(() => {
    setSearch("");
    setCategory("All");
    setDietaryFilter("All");
  }, []);

  return (
    <FilterContext.Provider
      value={{
        search,
        setSearch,
        category,
        setCategory,
        dietaryFilter,
        setDietaryFilter,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
};
