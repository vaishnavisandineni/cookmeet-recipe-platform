import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { RecipeCard, CardSkeleton } from "../components/RecipeCard";
import { FALLBACK_RECIPES } from "../data/fallbackRecipes";

export const SavedRecipes = () => {
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const userID = useGetUserID();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userID) {
      setSaved(FALLBACK_RECIPES);
      setLoading(false);
      return;
    }

    axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`)
      .then(r => setSaved(r.data.savedRecipes.length ? r.data.savedRecipes : FALLBACK_RECIPES))
      .catch(() => setSaved(FALLBACK_RECIPES))
      .finally(() => setLoading(false));
  }, [userID]);

  return (
    <div className="bg-[#FFF7F2] min-h-screen pb-32">

      {/* HEADER */}
      <div className="bg-white/80 backdrop-blur-md px-4 pt-4 md:pt-10 pb-4 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-xl md:text-3xl font-black flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Heart className="text-primary fill-primary" size={24} />
            </div>
            Saved Recipes
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        {!userID ? (
          <div className="flex flex-col items-center justify-center pt-24 pb-12 px-6 text-center bg-white rounded-[40px] shadow-sm border border-gray-50 max-w-lg mx-auto">
            <div className="w-24 h-24 bg-primary-light rounded-full flex items-center justify-center mb-6">
              <Heart size={48} className="text-primary" />
            </div>
            <h2 className="font-black text-2xl text-[#1A1A1A]">Login to save recipes</h2>
            <p className="text-gray-400 font-medium mt-2 max-w-xs mx-auto">Build your own personal cookbook and access your favorite recipes anywhere.</p>
            <button
              onClick={() => navigate("/auth")}
              className="mt-8 px-10 py-4 rounded-2xl bg-gradient-to-r from-primary to-red-500 text-white font-black text-lg shadow-xl shadow-primary/20 press hover:scale-[1.02] transition-transform"
            >
              Login Now
            </button>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <CardSkeleton count={8} variant="grid" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
            {saved.map(r => (
              <div key={r._id} className="relative group transform transition hover:translate-y-[-4px]">
                <RecipeCard recipe={r} variant="grid" className="w-full" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md rounded-full p-1.5 shadow-md z-10 opacity-100 group-hover:bg-primary transition-colors">
                  <Heart size={16} className="fill-primary text-primary group-hover:fill-white group-hover:text-white" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};