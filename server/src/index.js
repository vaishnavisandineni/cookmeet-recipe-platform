import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

const PORT = process.env.PORT || 3001;

// Use a local database if none is provided via env var for quick testing
let dbUri = process.env.DB_URI || "mongodb://127.0.0.1:27017/recipeappmobile";

mongoose.connect(dbUri)
.then(() => console.log("Database connected successfully"))
.catch((err) => console.log("Database Connection Error:", err.message));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
