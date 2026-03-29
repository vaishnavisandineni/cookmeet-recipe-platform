import React from "react";
import { Clock, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const RecipeCard = ({ recipe, variant = "grid", className = "" }) => {
  const image =
    recipe.imageUrl ||
    "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400";

  if (variant === "horizontal") {
    return (
      <Link
        to={`/recipe/${recipe._id}`}
        className={`flex-shrink-0 w-52 transition-all duration-500 active:scale-95 relative group overflow-hidden rounded-[32px] block ${className}`}
      >
        {/* IMAGE CONTAINER WITH ASPECT RATIO */}
        <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100 relative">
          <img
            src={image}
            alt={recipe.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out"
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop if fallback also fails
              e.target.src = "/images/fallback.jpg";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        {/* CONTENT */}
        <div className="absolute bottom-0 p-5 w-full text-white space-y-2">
          <h3 className="text-sm font-black tracking-tight leading-snug line-clamp-2">
            {recipe.name}
          </h3>

          <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider">
            <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-xl px-2.5 py-1 rounded-lg">
              <Clock size={12} strokeWidth={3} /> {recipe.cookingTime}m
            </span>

            <span className="flex items-center gap-1 bg-primary/80 backdrop-blur-xl px-2.5 py-1 rounded-lg">
              <Star size={11} className="fill-white" strokeWidth={3} />
              {recipe.rating || "4.7"}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  // --- GRID CARD (PRODUCTION READY) ---
  return (
    <Link
      to={`/recipe/${recipe._id}`}
      className={`block bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-sm group transition-all duration-500 hover:shadow-2xl hover:border-primary/20 hover:-translate-y-1 ${className}`}
    >
      {/* IMAGE SECTION */}
      <div className="relative aspect-[16/11] overflow-hidden bg-gray-50">
        <img
          src={image}
          alt={recipe.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-in-out"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/fallback.jpg";
          }}
        />

        {/* OVERLAY BADGES */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute top-4 left-4 z-10">
          {recipe.isVeg !== undefined && (
            <div
              className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center backdrop-blur-md shadow-lg
              ${recipe.isVeg ? "border-green-500 bg-white" : "border-red-500 bg-white"}`}
            >
              <div
                className={`w-3 h-3 rounded-full ${
                  recipe.isVeg ? "bg-green-500 animate-pulse" : "bg-red-500"
                }`}
              />
            </div>
          )}
        </div>

        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-1.5 text-xs font-black shadow-lg transform group-hover:scale-110 transition-transform">
          <Star size={14} className="fill-primary text-primary" strokeWidth={3} />
          {recipe.rating || "4.7"}
        </div>

        <div className="absolute bottom-4 left-4 flex items-center gap-2">
           <div className="bg-black/60 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-white/10">
            <Clock size={14} strokeWidth={2.5} /> {recipe.cookingTime}m
          </div>
        </div>
      </div>

      {/* TEXT CONTENT */}
      <div className="p-6 space-y-1">
        <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
          {recipe.category || "General"}
        </p>
        <h3 className="text-xl font-black text-[#1A1A1A] tracking-tight leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {recipe.name}
        </h3>
        <div className="pt-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
          <span className="text-xs font-black text-primary uppercase tracking-widest">Full Recipe</span>
          <ArrowRight size={14} className="text-primary" />
        </div>
      </div>
    </Link>
  );
};

/* 🔥 SKELETON LOADER (PREMIUM) */
export const CardSkeleton = ({ count = 4, variant = "grid" }) => {
  if (variant === "horizontal") {
    return (
      <div className="flex gap-4 px-4 overflow-hidden">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="w-48 rounded-2xl overflow-hidden bg-white shadow-sm animate-pulse"
          >
            <div className="h-36 bg-gray-200" />
            <div className="p-3 space-y-2">
              <div className="h-3 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-[24px] overflow-hidden bg-white shadow-sm animate-pulse border border-gray-50"
        >
          <div className="h-48 bg-gray-200" />
          <div className="p-5 space-y-3">
            <div className="h-4 bg-gray-200 rounded-full w-3/4" />
            <div className="h-3 bg-gray-100 rounded-full w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};