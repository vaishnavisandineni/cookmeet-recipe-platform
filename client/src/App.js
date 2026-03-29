import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "./pages/landing-page";
import { Layout } from "./Layout";
import { Home } from "./pages/home";
import { Explore } from "./pages/explore";
import { CreateRecipe } from "./pages/create-recipe";
import { SavedRecipes } from "./pages/saved-recipes";
import { Profile } from "./pages/profile";
import { RecipeDetails } from "./pages/recipe-details";
import { Auth } from "./pages/auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Landing page is now part of the unified layout */}
          <Route path="/" element={<Landing />} />
          
          <Route path="/home" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/auth" element={<Auth />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;