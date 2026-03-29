import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../apiConfig";
import { ArrowRight, Search } from "lucide-react";
import { RecipeCard, CardSkeleton } from "../components/RecipeCard";
import { FALLBACK_RECIPES } from "../data/fallbackRecipes";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/recipes`)
      .then((r) =>
        setRecipes(
          r.data.length >= 8
            ? r.data
            : [...r.data, ...FALLBACK_RECIPES].slice(0, 10)
        )
      )
      .catch(() => setRecipes(FALLBACK_RECIPES.slice(0, 10)))
      .finally(() => setLoading(false));
  }, []);

  const trending = recipes.slice(0, 6);
  const quick = recipes.filter((r) => r.cookingTime <= 30).slice(0, 6);
  const healthy = recipes.filter((r) => r.isVeg).slice(0, 6);

  const Section = ({ title, items }) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[#1A1A1A] text-2xl font-black tracking-tight">
          {title}
        </h2>
        <button 
          onClick={() => navigate("/explore")}
          className="text-primary text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all"
        >
          View all <ArrowRight size={16} />
        </button>
      </div>

      {loading ? (
        <CardSkeleton count={4} variant="horizontal" />
      ) : (
        <div className="flex gap-5 overflow-x-auto no-scrollbar px-2 pb-4 -mx-2 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 md:overflow-visible">
          {items.map((r) => (
            <div key={r._id} className="transform transition hover:scale-[1.03] md:w-full">
              <RecipeCard key={r._id} recipe={r} variant="horizontal" className="md:w-full md:h-full" />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-slate-900">

      {/* HERO SECTION (Premium) */}
      <div className="pt-20 md:pt-32 pb-16 md:pb-28 px-6 text-center relative overflow-hidden">

        {/* background glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-100 blur-[120px] opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-pink-100 blur-[100px] opacity-50"></div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight mb-6">
          Discover & Cook  
          <span className="block bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
            Delicious Recipes
          </span>
        </h1>

        <p className="max-w-xl mx-auto text-slate-600 text-base md:text-lg mb-8">
          Explore trending dishes, quick meals, and healthy recipes curated just for you. Cook smarter with CookMate.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate("/explore")}
            className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white font-bold rounded-2xl shadow-lg hover:scale-105 transition text-sm md:text-base"
          >
            Explore Recipes <ArrowRight className="inline ml-2" size={18} />
          </button>

          <button
            onClick={() => navigate("/explore")}
            className="px-6 md:px-8 py-3 md:py-4 bg-white border border-gray-200 rounded-2xl font-bold shadow-sm text-sm md:text-base hover:bg-gray-50 transition"
          >
            Search Recipes
          </button>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="px-6 mb-10 max-w-2xl mx-auto">
        <button
          onClick={() => navigate("/explore")}
          className="w-full flex items-center gap-3 bg-white rounded-2xl shadow-md px-5 py-4 border border-gray-50 hover:border-orange-200 transition-colors"
        >
          <Search size={18} className="text-orange-500" />
          <span className="text-gray-400">
            Search recipes, ingredients...
          </span>
        </button>
      </div>

      {/* CATEGORY PILLS */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar px-6 mb-12 scroll-smooth max-w-3xl mx-auto md:justify-center">
        {["All", "Breakfast", "Lunch", "Dinner", "Snacks", "Desserts"].map(
          (cat) => (
            <button
              key={cat}
              onClick={() => navigate(`/explore?category=${cat}`)}
              className="px-6 py-2.5 rounded-full bg-white border border-gray-100 text-sm font-bold text-slate-600 hover:text-orange-500 hover:border-orange-500 shadow-sm transition-all flex-shrink-0"
            >
              {cat}
            </button>
          )
        )}
      </div>

      {/* SECTIONS */}
      <div className="px-6 space-y-16 pb-32 max-w-7xl mx-auto">
        <Section title="🔥 Trending Recipes" items={trending} />
        <Section title="⚡ Quick Meals" items={quick} />
        <Section title="🥗 Healthy Choices" items={healthy} />
      </div>
    </div>
  );
};