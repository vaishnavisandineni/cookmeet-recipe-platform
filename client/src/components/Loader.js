import React from "react";
import { CardSkeleton } from "./RecipeCard";

export const Loader = ({ count = 8 }) => {
  return (
    <div className="w-full animate-in fade-in duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <CardSkeleton count={count} variant="grid" />
      </div>
      
      {/* Optional: Add a subtle loading bar at the top or bottom if needed */}
      <div className="mt-12 flex justify-center">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin shadow-xl shadow-primary/10" />
      </div>
    </div>
  );
};
