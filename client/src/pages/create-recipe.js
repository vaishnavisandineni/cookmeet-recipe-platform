import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../apiConfig";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  Plus, Trash2, ChefHat, AlignLeft
} from "lucide-react";

const CATEGORIES = ["Breakfast", "Lunch", "Dinner", "Snacks", "Desserts"];

const InputField = ({ label, icon: Icon, children }) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
      {Icon && <Icon size={14} className="text-primary" />} {label}
    </label>
    {children}
  </div>
);

export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);

  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [""],
    instructions: "",
    imageUrl: "",
    cookingTime: "",
    category: "Lunch",
    difficulty: "Medium",
    isVeg: true,
    userOwner: userID,
  });

  const set = (f, v) => setRecipe(r => ({ ...r, [f]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cookies.access_token) return navigate("/auth");

    setSubmitting(true);
    try {
      await axios.post(`${API_BASE_URL}/recipes`, recipe, {
        headers: { authorization: cookies.access_token },
      });
      navigate("/profile");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FFF7F2] min-h-screen pb-32">

      {/* HEADER */}
      <div className="sticky top-0 z-40 bg-white px-4 pt-10 pb-4 shadow-sm">
        <h1 className="text-xl font-extrabold flex items-center gap-2">
          <ChefHat className="text-primary" /> Create Recipe
        </h1>
        <p className="text-xs text-gray-500 mt-1">Share your food magic 🍳</p>
      </div>

      <form onSubmit={handleSubmit} className="px-4 py-8 space-y-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEFT COLUMN: BASIC INFO */}
          <div className="space-y-8">
            <div className="bg-white rounded-[32px] shadow-sm p-6 md:p-10 space-y-6 border border-gray-50">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-6 bg-primary rounded-full" />
                <p className="text-sm font-black text-gray-400 uppercase tracking-[0.2em]">Basic Information</p>
              </div>

              <InputField label="Recipe Name" icon={ChefHat}>
                <input
                  value={recipe.name}
                  onChange={e => set("name", e.target.value)}
                  className="input text-lg font-bold py-4 px-5 bg-gray-50/50 border-gray-100 rounded-2xl focus:bg-white focus:border-primary transition-all"
                  placeholder="e.g. Grandma's Famous Lasagna"
                  required
                />
              </InputField>

              <InputField label="Description" icon={AlignLeft}>
                <textarea
                  value={recipe.description}
                  onChange={e => set("description", e.target.value)}
                  className="input py-4 px-5 bg-gray-50/50 border-gray-100 rounded-2xl focus:bg-white focus:border-primary transition-all"
                  rows={4}
                  placeholder="Tell us about your dish..."
                  required
                />
              </InputField>

              <div className="grid grid-cols-2 gap-4">
                <InputField label="Category">
                  <select
                    value={recipe.category}
                    onChange={e => set("category", e.target.value)}
                    className="input py-4 px-5 bg-gray-50/50 border-gray-100 rounded-2xl appearance-none cursor-pointer"
                  >
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </InputField>

                <InputField label="Cooking Time (min)">
                  <input
                    type="number"
                    placeholder="e.g. 45"
                    value={recipe.cookingTime}
                    onChange={e => set("cookingTime", e.target.value)}
                    className="input py-4 px-5 bg-gray-50/50 border-gray-100 rounded-2xl"
                  />
                </InputField>
              </div>

              {/* Difficulty */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Difficulty Level</label>
                <div className="flex gap-3">
                  {["Easy", "Medium", "Hard"].map(d => (
                    <button
                      type="button"
                      key={d}
                      onClick={() => set("difficulty", d)}
                      className={`flex-1 py-3.5 rounded-2xl text-sm font-black transition-all border-2
                        ${recipe.difficulty === d
                          ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-[1.02]"
                          : "bg-white border-gray-100 text-gray-400 hover:border-gray-200"}`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Veg toggle */}
              <div className="flex justify-between items-center bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${recipe.isVeg ? "bg-green-500" : "bg-red-500"}`} />
                  <span className="text-sm font-bold text-gray-700">Vegetarian Recipe</span>
                </div>
                <button
                  type="button"
                  onClick={() => set("isVeg", !recipe.isVeg)}
                  className={`w-14 h-7 rounded-full p-1 transition-colors relative ${
                    recipe.isVeg ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 shadow-sm ${recipe.isVeg ? "translate-x-7" : "translate-x-0"}`} />
                </button>
              </div>
            </div>

            {/* IMAGE SECTION moved here for better desktop flow */}
            <div className="bg-white rounded-[32px] shadow-sm p-6 md:p-10 space-y-6 border border-gray-50">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-6 bg-orange-400 rounded-full" />
                <p className="text-sm font-black text-gray-400 uppercase tracking-[0.2em]">Visual Preview</p>
              </div>
              <InputField label="Recipe Image URL">
                <input
                  value={recipe.imageUrl}
                  onChange={e => set("imageUrl", e.target.value)}
                  className="input py-4 px-5 bg-gray-50/50 border-gray-100 rounded-2xl"
                  placeholder="Paste URL here..."
                />
              </InputField>

              {recipe.imageUrl ? (
                <div className="relative h-64 w-full rounded-[24px] overflow-hidden group shadow-inner">
                  <img
                    src={recipe.imageUrl}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt="Preview"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/fallback.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
              ) : (
                <div className="h-64 w-full rounded-[24px] bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 gap-2">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <Plus size={24} />
                  </div>
                  <p className="text-sm font-bold">Image preview will appear here</p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: INGREDIENTS & STEPS */}
          <div className="space-y-8">
            {/* INGREDIENTS */}
            <div className="bg-white rounded-[32px] shadow-sm p-6 md:p-10 space-y-6 border border-gray-50 h-fit">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-red-400 rounded-full" />
                  <p className="text-sm font-black text-gray-400 uppercase tracking-[0.2em]">Ingredients</p>
                </div>
              </div>

              <div className="space-y-4">
                {recipe.ingredients.map((ing, i) => (
                  <div key={i} className="flex gap-3 animate-fade-in">
                    <input
                      value={ing}
                      onChange={e => {
                        const arr = [...recipe.ingredients];
                        arr[i] = e.target.value;
                        set("ingredients", arr);
                      }}
                      className="input flex-1 py-4 px-5 bg-gray-50/50 border-gray-100 rounded-2xl focus:bg-white focus:border-primary transition-all"
                      placeholder={`Ingredient ${i + 1}`}
                    />
                    {i > 0 && (
                      <button 
                        type="button"
                        onClick={() => set("ingredients", recipe.ingredients.filter((_, x) => x !== i))}
                        className="w-14 h-14 rounded-2xl bg-red-50 text-red-400 flex items-center justify-center hover:bg-red-100 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => set("ingredients", [...recipe.ingredients, ""])}
                  className="w-full py-4 rounded-2xl border-2 border-dashed border-primary/20 text-primary font-bold flex items-center justify-center gap-2 hover:bg-primary/5 hover:border-primary/40 transition-all"
                >
                  <Plus size={18} /> Add New Ingredient
                </button>
              </div>
            </div>

            {/* INSTRUCTIONS */}
            <div className="bg-white rounded-[32px] shadow-sm p-6 md:p-10 space-y-6 border border-gray-50">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-6 bg-pink-500 rounded-full" />
                <p className="text-sm font-black text-gray-400 uppercase tracking-[0.2em]">Cooking Steps</p>
              </div>
              <textarea
                value={recipe.instructions}
                onChange={e => set("instructions", e.target.value)}
                className="input py-6 px-7 bg-gray-50/50 border-gray-100 rounded-[28px] focus:bg-white focus:border-primary transition-all min-h-[300px]"
                placeholder="Step 1: Prep the veggies...\nStep 2: Heat the pan...\nStep 3: Enjoy!"
                required
              />
            </div>

            {/* SUBMIT BUTTON - Desktop position */}
            <button
              disabled={submitting}
              className="hidden lg:flex w-full py-6 rounded-[28px] text-white font-black text-xl bg-gradient-to-r from-primary to-red-500 shadow-xl shadow-primary/30 items-center justify-center gap-3 press disabled:opacity-60 transition-transform hover:scale-[1.02]"
            >
              {submitting ? "Publishing..." : "Publish Recipe 🚀"}
            </button>
          </div>
        </div>

        {/* SUBMIT BUTTON - Mobile position (fixed or at bottom) */}
        <div className="lg:hidden pb-10">
          <button
            disabled={submitting}
            className="w-full py-5 rounded-[24px] text-white font-black text-lg bg-gradient-to-r from-primary to-red-500 shadow-xl shadow-primary/30 items-center justify-center gap-3 press disabled:opacity-60"
          >
            {submitting ? "Publishing..." : "Publish Recipe 🚀"}
          </button>
        </div>

      </form>
    </div>
  );
};