import React from "react";
import { SearchX, RotateCcw } from "lucide-react";
import { useFilters } from "../context/FilterContext";

export const EmptyState = () => {
  const { clearFilters } = useFilters();

  return (
    <div className="flex flex-col items-center justify-center py-24 px-8 text-center bg-white rounded-[48px] border-2 border-dashed border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-8 transform hover:scale-110 transition-transform">
        <SearchX size={48} />
      </div>
      
      <h2 className="text-3xl font-black text-[#1A1A1A] mb-3 tracking-tight">No recipes matching your diet</h2>
      <p className="text-gray-400 font-medium text-lg max-w-sm mx-auto leading-relaxed mb-10">
        Try adjusting your filters or clearing your preferences to discover something new!
      </p>

      <button
        onClick={clearFilters}
        className="flex items-center gap-3 bg-[#1A1A1A] text-white px-10 py-5 rounded-[24px] font-black text-lg hover:bg-primary transition-all active:scale-95 shadow-xl shadow-black/10 hover:shadow-primary/30"
      >
        <RotateCcw size={20} /> Clear All Filters
      </button>

      <div className="mt-12 flex gap-6 grayscale opacity-20 pointer-events-none">
        {/* Placeholder icons representing the "missing" food */}
        <div className="w-10 h-1bg-gray-200 rounded-full" />
        <div className="w-10 h-1 bg-gray-200 rounded-full" />
        <div className="w-10 h-1 bg-gray-200 rounded-full" />
      </div>
    </div>
  );
};
