import React from "react";
import { X, Check } from "lucide-react";
import { useFilters } from "../context/FilterContext";

const CATEGORIES = ["All", "Breakfast", "Lunch", "Dinner", "Snacks", "Desserts"];

export const FilterSidebar = ({ isOpen, onClose }) => {
  const { category, setCategory, dietaryFilter, setDietaryFilter, clearFilters } = useFilters();

  if (!isOpen) return null;

  const toggleDiet = (val) => {
    setDietaryFilter(dietaryFilter === val ? "All" : val);
  };

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Sidebar Content */}
      <div className="absolute top-0 left-0 w-[85%] max-w-[340px] h-full bg-white shadow-2xl p-8 flex flex-col animate-in slide-in-from-left duration-500">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-black text-[#1A1A1A]">Filters</h2>
          <button onClick={onClose} className="p-2 bg-gray-50 rounded-full text-gray-400 hover:bg-gray-100 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-12">
          {/* DIETARY PREFERENCE */}
          <div className="space-y-6">
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">Dietary Preference</p>
            <div className="grid grid-cols-1 gap-3">
              {[
                { id: "Veg", label: "Vegetarian Only", color: "green" },
                { id: "Non-Veg", label: "Non-Vegetarian Only", color: "red" }
              ].map(d => (
                <button
                  key={d.id}
                  onClick={() => toggleDiet(d.id)}
                  className={`flex items-center justify-between p-4 rounded-3xl border-2 transition-all group
                    ${dietaryFilter === d.id 
                      ? d.id === "Veg" ? "border-green-500 bg-green-50/50" : "border-red-500 bg-red-50/50"
                      : "border-gray-100 bg-white hover:border-gray-200"}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${dietaryFilter === d.id ? d.id === "Veg" ? "bg-green-500" : "bg-red-500" : "bg-gray-100"}`} />
                    <span className={`font-bold text-sm ${dietaryFilter === d.id ? d.id === "Veg" ? "text-green-700" : "text-red-700" : "text-gray-500"}`}>
                      {d.label}
                    </span>
                  </div>
                  {dietaryFilter === d.id && (
                    <div className={`w-5 h-5 ${d.id === "Veg" ? "bg-green-500" : "bg-red-500"} rounded-full flex items-center justify-center text-white`}>
                      <Check size={12} strokeWidth={4} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* CATEGORIES */}
          <div className="space-y-6">
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">Categories</p>
            <div className="grid grid-cols-1 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`flex items-center justify-between p-4 rounded-2xl transition-all group
                    ${category === cat 
                      ? "bg-primary/10 text-primary font-black scale-[1.02]" 
                      : "text-gray-500 font-bold hover:bg-gray-50"}`}
                >
                  <span>{cat}</span>
                  {category === cat && <div className="w-1.5 h-1.5 bg-primary rounded-full" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-auto pt-10">
          <button 
            onClick={() => {
              clearFilters();
              onClose();
            }}
            className="w-full py-4 rounded-2xl bg-gray-50 text-gray-400 font-black text-xs uppercase tracking-widest hover:bg-gray-100 hover:text-gray-600 transition-all"
          >
            Reset All Filters
          </button>
        </div>
      </div>
    </div>
  );
};
