import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  ingredients: [{ type: String, required: true }],
  instructions: { type: String, required: true },
  imageUrl: { type: String, required: true },
  cookingTime: { type: Number, required: true },
  category: { type: String, required: true }, // e.g., Breakfast, Lunch, Dinner, Snacks, Desserts
  rating: { type: Number, default: 4.5 },
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], default: "Medium" },
  isVeg: { type: Boolean, default: true },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

export const RecipeModel = mongoose.model("recipes", RecipeSchema);
