import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { API_BASE_URL } from "../apiConfig";
import { Menu, ArrowRight, Sparkles, PlusCircle } from "lucide-react";
import { RecipeCard } from "../components/RecipeCard";
import { FilterSidebar } from "../components/FilterSidebar";
import { Loader } from "../components/Loader";
import { EmptyState } from "../components/EmptyState";
import { FALLBACK_RECIPES } from "../data/fallbackRecipes";
import { useFilters } from "../context/FilterContext";
import debounce from "lodash.debounce";

export const Explore = () => {
  const { search, category, dietaryFilter } = useFilters();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // --- BACKEND FETCH ---
  const fetchRecipes = useMemo(
    () =>
      debounce(async (q, cat) => {
        setLoading(true);

        try {
          const qs = new URLSearchParams();
          if (q) qs.append("search", q);
          if (cat !== "All") qs.append("category", cat);

          const { data } = await axios.get(
            `${API_BASE_URL}/recipes?${qs}`
          );
          setRecipes(data.length > 0 ? data : FALLBACK_RECIPES);
        } catch (err) {
          console.error("Fetch failed, using fallback:", err);
          setRecipes(FALLBACK_RECIPES);
        } finally {
          setLoading(false);
        }
      }, 400),
    []
  );

  useEffect(() => {
    fetchRecipes(search, category);
    return () => fetchRecipes.cancel();
  }, [search, category, fetchRecipes]);

  // --- COMBINED FILTERING (FRONTEND) ---
  const displayRecipes = useMemo(() => {
    return recipes.filter((r) => {
      const matchesSearch = !search || r.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || r.category === category;
      
      let matchesDietary = true;
      if (dietaryFilter === "Veg") matchesDietary = r.isVeg === true;
      if (dietaryFilter === "Non-Veg") matchesDietary = r.isVeg === false;
      
      return matchesSearch && matchesCategory && matchesDietary;
    });
  }, [recipes, search, category, dietaryFilter]);

  const dietaryLabel = dietaryFilter === "Veg" ? "Pure Veg Mode" : dietaryFilter === "Non-Veg" ? "Non-Veg Mode" : null;
  const dietaryColor = dietaryFilter === "Veg" ? "bg-green-50 text-green-600 border-green-100" : "bg-red-50 text-red-600 border-red-100";

  return (
    <div className="bg-white min-h-screen">
      
      {/* EXPLORE HEADER / QUICK CATS */}
      <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md px-6 py-6 border-b border-gray-100 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-4 md:gap-6 mb-8">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center justify-center bg-[#1A1A1A] text-white p-3.5 md:p-4 rounded-2xl font-black text-sm hover:bg-primary transition-all shadow-xl shadow-black/10 active:scale-95 group"
          >
            <Menu size={22} className="group-hover:rotate-6 transition-transform duration-300" />
          </button>

          <div className="space-y-1">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-[#1A1A1A]">Discover Recipes</h1>
            <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.2em] animate-pulse">
              <Sparkles size={12} /> Seasonal Picks for you
            </div>
          </div>
        </div>


      </div>

      <div className="max-w-7xl mx-auto flex gap-10 px-6 mt-12 mb-20">
        


        {/* MAIN GRID */}
        <div className="flex-1 space-y-10 min-h-[60vh]">
          
          <div className="flex items-center justify-between border-b border-gray-50 pb-4">
            <p className="text-sm font-black text-gray-400 uppercase tracking-widest">
              {loading ? "Searching..." : `${displayRecipes.length} premium results`}
            </p>
            {dietaryLabel && (
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${dietaryColor}`}>
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${dietaryFilter === "Veg" ? "bg-green-500" : "bg-red-500"}`} />
                {dietaryLabel}
              </div>
            )}
          </div>

          {loading ? (
            <Loader count={8} />
          ) : displayRecipes.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 pb-20 animate-in fade-in slide-in-from-bottom-6 duration-700">
              {displayRecipes.map((r) => (
                <div key={r._id} className="group transform transition hover:translate-y-[-4px]">
                  <RecipeCard recipe={r} variant="grid" className="w-full" />
                </div>
              ))}
              
              {/* PROMOTE CREATION if results are low */}
              {displayRecipes.length < 4 && displayRecipes.length > 0 && (
                <div 
                  onClick={() => window.location.href = "/create-recipe"}
                  className="bg-gray-50 rounded-[40px] border-4 border-dashed border-gray-200 flex flex-col items-center justify-center p-8 text-center gap-4 hover:border-primary/40 hover:bg-white transition-all cursor-pointer"
                >
                  <div className="w-16 h-16 bg-white rounded-[24px] shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <PlusCircle size={32} />
                  </div>
                  <h3 className="text-lg font-black tracking-tight">Got a recipe?</h3>
                  <p className="text-gray-400 text-xs font-bold px-4">Add your signature dish to the CookMeet global database.</p>
                  <ArrowRight className="text-primary mt-2" size={20} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* OVERLAY FILTER (Mobile & Desktop) */}
      <FilterSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
    </div>
  );
};