import mongoose from "mongoose";
import { RecipeModel } from "./models/Recipes.js";
import { UserModel } from "./models/Users.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const dbUri = process.env.DB_URI || "mongodb://127.0.0.1:27017/recipeappmobile";

const categories = ["Breakfast", "Lunch", "Dinner", "Snacks", "Desserts"];
const difficulties = ["Easy", "Medium", "Hard"];

const sampleRecipes = [
  // Breakfast
  { name: "Classic Pancakes", desc: "Fluffy and delicious pancakes with syrup.", cat: "Breakfast", img: "/images/recipes/classic-pancakes.jpg", time: 20, isVeg: true },
  { name: "Masala Dosa", desc: "Crispy crepe served with savory potato filling, sambar, and chutney.", cat: "Breakfast", img: "/images/recipes/masala-dosa.jpg", time: 40, isVeg: true },
  { name: "Egg & Cheese Sandwich", desc: "A simple, quick, protein-packed breakfast sandwich.", cat: "Breakfast", img: "/images/recipes/egg-cheese-sandwich.jpg", time: 10, isVeg: false },
  { name: "Avocado Toast", desc: "Healthy avocado spread over crispy whole wheat toast.", cat: "Breakfast", img: "/images/recipes/avocado-toast.jpg", time: 5, isVeg: true },
  { name: "Idli Sambar", desc: "Steamed rice cakes served with lentil soup.", cat: "Breakfast", img: "/images/recipes/idli-sambar.jpg", time: 30, isVeg: true },
  { name: "Aloo Paratha", desc: "Indian flatbread stuffed with spiced potatoes.", cat: "Breakfast", img: "/images/recipes/aloo-paratha.jpg", time: 35, isVeg: true },
  { name: "French Toast", desc: "Sweet, cinnamon-spiced toast with butter.", cat: "Breakfast", img: "/images/recipes/french-toast.jpg", time: 15, isVeg: true },

  // Lunch
  { name: "Chicken Biryani", desc: "Aromatic basmati rice cooked with incredibly fragrant spices and chicken.", cat: "Lunch", img: "/images/recipes/chicken-biryani.jpg", time: 60, isVeg: false },
  { name: "Butter Chicken", desc: "Tender chicken cooked in a rich, creamy tomato sauce.", cat: "Lunch", img: "/images/recipes/butter-chicken.jpg", time: 50, isVeg: false },
  { name: "Paneer Tikka Masala", desc: "Cottage cheese cubes cooked in a spiced tomato gravy.", cat: "Lunch", img: "/images/recipes/paneer-tikka-masala.jpg", time: 40, isVeg: true },
  { name: "Margherita Pizza", desc: "Classic Italian pizza with tomato sauce and fresh mozzarella.", cat: "Lunch", img: "/images/recipes/margherita-pizza.jpg", time: 45, isVeg: true },
  { name: "Fried Rice", desc: "Stir-fried rice with fresh vegetables and soy sauce.", cat: "Lunch", img: "/images/recipes/fried-rice.jpg", time: 20, isVeg: true },
  { name: "Grilled Salmon", desc: "Perfectly grilled salmon fillet with a side of asparagus.", cat: "Lunch", img: "/images/recipes/grilled-salmon.jpg", time: 25, isVeg: false },
  { name: "Caesar Salad", desc: "Crisp romaine lettuce with parmesan and Caesar dressing.", cat: "Lunch", img: "/images/recipes/caesar-salad.jpg", time: 10, isVeg: true },

  // Dinner
  { name: "Dal Makhani", desc: "Slow-cooked black lentils with butter and cream.", cat: "Dinner", img: "/images/recipes/dal-makhani.jpg", time: 120, isVeg: true },
  { name: "Mutton Curry", desc: "Spicy and tender mutton pieces simmered in a rich gravy.", cat: "Dinner", img: "/images/recipes/mutton-curry.jpg", time: 90, isVeg: false },
  { name: "Pasta Bolognese", desc: "Rich and meaty Italian pasta dish.", cat: "Dinner", img: "/images/recipes/pasta-bolognese.jpg", time: 50, isVeg: false },
  { name: "Palak Paneer", desc: "Spinach puree mixed with cottage cheese and spices.", cat: "Dinner", img: "/images/recipes/palak-paneer.jpg", time: 35, isVeg: true },
  { name: "Roti & Chicken Curry", desc: "Soft flatbreads served with a comforting chicken stew.", cat: "Dinner", img: "/images/recipes/roti-chicken-curry.jpg", time: 45, isVeg: false },
  { name: "Veggie Stir Fry", desc: "Simple, highly nutritious mix of greens.", cat: "Dinner", img: "/images/recipes/veggie-stir-fry.jpg", time: 15, isVeg: true },

  // Snacks
  { name: "Vegetable Samosa", desc: "Deep fried pastry with a spiced potato and pea filling.", cat: "Snacks", img: "/images/recipes/vegetable-samosa.jpg", time: 45, isVeg: true },
  { name: "Pani Puri", desc: "Crispy hollow spheres filled with spicy tangy water.", cat: "Snacks", img: "/images/recipes/pani-puri.jpg", time: 20, isVeg: true },
  { name: "French Fries", desc: "Crispy salted potato sticks.", cat: "Snacks", img: "/images/recipes/french-fries.jpg", time: 15, isVeg: true },
  { name: "Chicken Wings", desc: "Spicy buffalo wings served with a ranch dip.", cat: "Snacks", img: "/images/recipes/chicken-wings.jpg", time: 30, isVeg: false },
  { name: "Nachos with Salsa", desc: "Corn chips loaded with cheese, jalapenos, and salsa.", cat: "Snacks", img: "/images/recipes/nachos-salsa.jpg", time: 10, isVeg: true },

  // Desserts
  { name: "Gulab Jamun", desc: "Deep-fried dough balls soaked in a sweet sugar syrup.", cat: "Desserts", img: "/images/recipes/gulab-jamun.jpg", time: 40, isVeg: true },
  { name: "Chocolate Cake", desc: "Rich and moist multi-layer chocolate cake.", cat: "Desserts", img: "/images/recipes/chocolate-cake.jpg", time: 60, isVeg: true },
  { name: "Vanilla Ice Cream", desc: "Classic cold and creamy natural vanilla dessert.", cat: "Desserts", img: "/images/recipes/vanilla-ice-cream.jpg", time: 5, isVeg: true },
  { name: "Rasgulla", desc: "Spongy cottage cheese balls in light sugar syrup.", cat: "Desserts", img: "/images/recipes/rasgulla.jpg", time: 45, isVeg: true },
  { name: "Apple Pie", desc: "Warm cinnamon-spiced apple filling in a flaky crust.", cat: "Desserts", img: "/images/recipes/apple-pie.jpg", time: 60, isVeg: true }
];

const seedDB = async () => {
  try {
    await mongoose.connect(dbUri);
    console.log("Connected to MongoDB for seeding...");

    // Create an initial admin user to own all seeds
    await UserModel.deleteMany({});
    await RecipeModel.deleteMany({});

    const hashedPassword = await bcrypt.hash("admin123", 10);
    const adminUser = new UserModel({ username: "admin", password: hashedPassword });
    await adminUser.save();

    console.log("Admin user created.");

    // Format recipes for insertion
    const recipesToInsert = sampleRecipes.map((r, i) => ({
      name: r.name,
      description: r.desc,
      ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
      instructions: "1. Mix everything. 2. Cook perfectly. 3. Serve hot and enjoy!",
      imageUrl: r.img,
      cookingTime: r.time,
      category: r.cat,
      rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1), // Random rating 3.5 to 5.0
      difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
      isVeg: r.isVeg,
      userOwner: adminUser._id
    }));

    await RecipeModel.insertMany(recipesToInsert);
    console.log(`Successfully seeded ${recipesToInsert.length} recipes!`);

  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
