# 🍳 CookMeet — Recipe Discovery App

A full-stack recipe discovery web application built with **React.js** on the frontend and **Node.js + Express.js** on the backend, with **MongoDB** as the database.

---

##  Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React.js** | UI components and page rendering |
| **JavaScript (ES6+)** | Application logic throughout |
| **Tailwind CSS** | Styling and responsive design |
| **React Router DOM** | Client-side page navigation |
| **React Context API** | Global filter state management |
| **Axios** | HTTP requests to the backend API |
| **Lucide React** | Icons used across the UI |
| **Lodash Debounce** | Prevents excessive API calls while searching |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime for the server |
| **Express.js** | REST API framework |
| **MongoDB** | NoSQL database for storing recipes and users |
| **Mongoose** | MongoDB object modeling and schema validation |
| **JSON Web Tokens (JWT)** | Secure user authentication |
| **Bcrypt** | Hashing passwords before storing in the database |
| **CORS** | Allows the frontend (port 3000) to talk to the backend (port 3001) |
| **Dotenv** | Manages environment variables like DB connection strings |

---

##  Project Structure

```text
MERN-Recipe-App1-main/
│
├── client/                        # React frontend (port 3000)
│   ├── public/
│   │   └── images/recipes/        # Local recipe images
│   └── src/
│       ├── components/
│       │   ├── RecipeCard.js      # Displays a single recipe card
│       │   ├── FilterSidebar.js   # Left-side filter drawer
│       │   ├── Loader.js          # Skeleton loading states
│       │   └── EmptyState.js      # Shown when no results match
│       ├── context/
│       │   └── FilterContext.js   # Global state: search, category, dietary filter
│       ├── data/
│       │   └── fallbackRecipes.js # Static recipes used when backend is offline
│       ├── hooks/
│       │   └── useGetUserID.js    # Reads logged-in user ID from cookies
│       ├── pages/
│       │   ├── landing-page.js    # Marketing landing page with hero section
│       │   ├── home.js            # Logged-in home with trending/quick/healthy sections
│       │   ├── explore.js         # Full recipe browser with filtering
│       │   ├── recipe-details.js  # Individual recipe view with steps
│       │   ├── create-recipe.js   # Form to add a new recipe
│       │   ├── saved-recipes.js   # Lists user's saved/bookmarked recipes
│       │   ├── profile.js         # User profile page
│       │   └── auth.js            # Login and Registration page
│       ├── Layout.js              # Shared layout wrapper with nav bar
│       └── App.js                 # Root component with all routes
│
└── server/                        # Node.js + Express backend (port 3001)
    └── src/
        ├── models/
        │   ├── Recipes.js         # Mongoose schema for a Recipe
        │   └── Users.js           # Mongoose schema for a User
        ├── routes/
        │   ├── recipes.js         # All recipe API endpoints
        │   └── users.js           # Auth endpoints + JWT token verification
        ├── seeds.js               # Script to pre-populate the database with recipe data
        └── index.js               # Server entry point, connects to MongoDB
```

---

##  Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm

### 1. Start the Backend Server

```bash
cd server
npm install
npm start
```

> Server runs on `http://localhost:3001`

Create a `.env` file inside the `server/` folder:
```
DB_URI=mongodb://127.0.0.1:27017/recipeappmobile
JWT_SECRET=your_secret_key_here
```

### 2. Start the Frontend

```bash
cd client
npm install
npm start
```

> App runs on `http://localhost:3000`

---

##  How the App Works (End-to-End)

### 1. Landing Page (`/`)
- The user first sees the **Landing Page** — a marketing page with a hero image, a CTA button to start exploring recipes, and a "Join Community" modal where users can submit their email.
- There are 4 feature cards showing what CookMeet offers: Discover, Create, Save, and Interactive Steps.

### 2. Home Page (`/home`)
- After logging in, the user lands on the **Home Page** which fetches recipes from `GET /recipes` on the backend.
- Recipes are organized into 3 curated sections:
  - **Trending Recipes** — the latest 6 recipes
  - **Quick Meals** — recipes where `cookingTime <= 30` minutes
  -  **Healthy Choices** — recipes where `isVeg === true`
- If the backend is offline, **fallback recipe data** from a local JavaScript file is used automatically.

### 3. Discover Recipes / Explore Page (`/explore`)
- The **Explore page** is the main discovery hub. It has a **hamburger icon on the left** of the header.
- Clicking the hamburger opens a **left-side filter drawer** (sidebar) with:
  - **Dietary Preference**: Vegetarian Only / Non-Vegetarian Only (toggle)
  - **Categories**: All, Breakfast, Lunch, Dinner, Snacks, Desserts
- The page fetches recipes from `GET /recipes?search=...&category=...`
- Filtering is applied **on both the backend (API query params)** and **on the frontend (useMemo)** for instant response.
- Search uses **Lodash debounce** (400ms delay) to avoid hammering the API on every keystroke.
- If the server returns no results, fallback recipes are displayed.
- When results are fewer than 4, a **"Got a recipe?"** card appears prompting the user to create one.

### 4. Recipe Details (`/recipe/:id`)
- Clicking any recipe card navigates to its detail page.
- The page fetches the full recipe from `GET /recipes/:id` using the recipe's MongoDB `_id`.
- Shows: recipe image, name, description, cooking time, category, step-by-step instructions, and ingredients.
- A **"Save Recipe"** button is visible for logged-in users. It sends a `PUT /recipes` request to store the recipe ID in the user's `savedRecipes` array in MongoDB.

### 5. Create Recipe (`/create-recipe`)
- A form where logged-in users can submit a new recipe.
- On submit, sends a `POST /recipes` request with the JWT token in the header for authentication.
- The backend uses `verifyToken` middleware (JWT) to make sure only logged-in users can create recipes.

### 6. Saved Recipes (`/saved-recipes`)
- Shows the user's bookmarked recipes fetched from `GET /recipes/savedRecipes/:userID`.
- If the user is **not logged in**, a prompt is shown asking them to log in.
- Uses `useGetUserID` hook which reads the logged-in user's ID from a browser **cookie**.

### 7. Authentication (`/auth`)
- **Register**: Hashes the password using `bcrypt`, saves the user to MongoDB.
- **Login**: Compares the entered password against the hashed one in MongoDB. If correct, returns a **JWT token** which is stored in a cookie.
- This cookie is read on every subsequent request to identify the user (via the `useGetUserID` hook).

### 8. Fallback System
- The app has a built-in **offline fallback**: if the backend server (`localhost:3001`) is not running or returns an error, the app automatically uses a local `fallbackRecipes.js` dataset so the UI never shows blank.

---

## 🔌 API Endpoints

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `GET` | `/recipes` | No | Fetch all recipes (supports `?search=` and `?category=`) |
| `GET` | `/recipes/:id` | No | Fetch a single recipe by ID |
| `POST` | `/recipes` | ✅ JWT | Create a new recipe |
| `PUT` | `/recipes` | No | Save a recipe to a user's collection |
| `GET` | `/recipes/savedRecipes/:userID` | No | Get all saved recipes for a user |
| `GET` | `/recipes/savedRecipes/ids/:userID` | No | Get saved recipe IDs for a user |
| `POST` | `/auth/register` | No | Register a new user |
| `POST` | `/auth/login` | No | Login and receive a JWT token |

---

##  Key Frontend Features

| Feature | How It Works |
|---|---|
| **Left Filter Drawer** | Hamburger icon (left side of header) opens a slide-in sidebar with category and dietary filters |
| **Real-time Search** | Search input is debounced (400ms), triggers API call on change |
| **Skeleton Loading** | Cards show animated placeholder skeletons while data is fetching |
| **Offline Fallback** | Local `fallbackRecipes.js` data shown when API is unreachable |
| **JWT Auth** | Token stored in a cookie; read by `useGetUserID` hook across pages |
| **Context-based Filters** | `FilterContext` shares search/category/dietary state across pages without prop drilling |

---

Built by Vaishnavi
