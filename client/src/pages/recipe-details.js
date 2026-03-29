import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useGetUserID } from "../hooks/useGetUserID";
import { FALLBACK_RECIPES } from "../data/fallbackRecipes";
import {
  ChevronLeft, Heart, Clock, Star, Share2,
  Flame, Utensils, BookOpen, CheckCircle2
} from "lucide-react";

export const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const userID = useGetUserID();
  const [cookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/recipes/${id}`);
        setRecipe(data);
      } catch {
        const fallback = FALLBACK_RECIPES.find(r => r._id === id);
        setRecipe(fallback || FALLBACK_RECIPES[0]);
      }
    };
    const fetchSaved = async () => {
      if (!userID) return;
      try {
        const { data } = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`);
        if (data.savedRecipes?.includes(id)) setSaved(true);
      } catch {}
    };
    Promise.all([fetchRecipe(), fetchSaved()]).finally(() => setLoading(false));
  }, [id, userID]);

  const saveRecipe = async () => {
    if (!cookies.access_token) { navigate("/auth"); return; }
    try {
      await axios.put("http://localhost:3001/recipes", { recipeID: id, userID });
      setSaved(true);
    } catch (e) { console.error(e); }
  };

  if (loading) {
    return (
      <div className="bg-background min-h-screen pb-32 animate-pulse">
        <div className="h-72 skeleton rounded-b-[32px]" />
        <div className="p-5 space-y-4">
          <div className="h-7 skeleton rounded-xl w-2/3" />
          <div className="h-4 skeleton rounded-lg w-1/2" />
          <div className="h-24 skeleton rounded-2xl" />
          <div className="h-4 skeleton rounded-lg w-full" />
          <div className="h-4 skeleton rounded-lg w-5/6" />
        </div>
      </div>
    );
  }

  if (!recipe) return null;

  const steps = recipe.instructions
    .split(/\d+\.\s+/)
    .map(s => s.trim())
    .filter(Boolean);

  return (
    <div className="bg-background min-h-screen pb-36">
      {/* Hero image */}
      <div className="relative h-72 md:h-[450px] overflow-hidden md:rounded-b-[48px] shadow-lg max-w-7xl mx-auto">
        <img
          src={recipe.imageUrl}
          alt={recipe.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/fallback.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 md:top-10 left-4 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center press hover:bg-white/40 transition-colors"
        >
          <ChevronLeft size={22} className="text-white" />
        </button>

        {/* Share */}
        <button className="absolute top-6 md:top-10 right-4 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center press hover:bg-white/40 transition-colors">
          <Share2 size={18} className="text-white" />
        </button>

        {/* Badges */}
        <div className="absolute bottom-6 left-6 z-20 flex gap-2">
          <span className="bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">{recipe.category}</span>
          {recipe.isVeg && <span className="bg-green-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">Vegetarian</span>}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8 md:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT COLUMN: Title & Stats */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-[#1A1A1A] leading-tight mb-4">{recipe.name}</h1>
              <p className="text-base text-gray-500 font-medium leading-relaxed">{recipe.description}</p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: <Star size={24} className="text-amber-400 fill-amber-400" />, value: recipe.rating || "4.7", label: "Rating" },
                { icon: <Clock size={24} className="text-primary" />, value: `${recipe.cookingTime}m`, label: "Cook Time" },
                { icon: <Flame size={24} className={recipe.difficulty === "Easy" ? "text-green-500" : recipe.difficulty === "Hard" ? "text-red-500" : "text-orange-400"} />, value: recipe.difficulty || "Medium", label: "Level" },
              ].map(({ icon, value, label }) => (
                <div key={label} className="bg-white rounded-3xl p-5 flex flex-col items-center shadow-sm border border-gray-50">
                  {icon}
                  <p className="text-lg font-extrabold text-[#1A1A1A] mt-2">{value}</p>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{label}</p>
                </div>
              ))}
            </div>

            {/* Ingredients (Visible on Mobile here, or stays left) */}
            <div className="bg-white rounded-[32px] shadow-md p-6 md:p-8 border border-gray-50">
              <h2 className="text-xl font-black text-[#1A1A1A] flex items-center gap-3 mb-6">
                <Utensils size={24} className="text-primary" /> Ingredients
              </h2>
              <ul className="space-y-4">
                {recipe.ingredients.map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-base font-semibold text-gray-700">
                    <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN: Instructions */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white rounded-[32px] shadow-md p-6 md:p-8 border border-gray-50 h-full">
              <h2 className="text-xl font-black text-[#1A1A1A] flex items-center gap-3 mb-6">
                <BookOpen size={24} className="text-primary" /> Instructions
              </h2>
              <div className="space-y-6">
                {steps.length > 0 ? steps.map((step, i) => (
                  <div key={i} className="flex gap-5 p-5 rounded-[24px] bg-gray-50 border border-gray-100 hover:border-primary/20 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-primary text-white text-lg font-black flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
                      {i + 1}
                    </div>
                    <p className="text-base md:text-lg font-medium text-gray-700 leading-relaxed flex-1">{step}</p>
                  </div>
                )) : (
                  <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-wrap px-2">{recipe.instructions}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating save button */}
      <div className="fixed bottom-8 md:bottom-12 left-0 w-full px-4 z-50 flex justify-center">
        <button
          onClick={saveRecipe}
          disabled={saved}
          className={`w-full max-w-md py-5 rounded-[24px] font-black text-white text-lg flex items-center justify-center gap-3 shadow-2xl press transition-all
            ${saved
              ? "bg-green-500 shadow-green-500/40"
              : "bg-gradient-to-r from-primary to-[#FF3D00] shadow-primary/40 hover:scale-[1.02]"}`}
        >
          {saved ? (
            <><CheckCircle2 size={24} /> Saved to Cookbook</>
          ) : (
            <><Heart size={24} /> Save this Recipe</>
          )}
        </button>
      </div>
    </div>
  );
};
