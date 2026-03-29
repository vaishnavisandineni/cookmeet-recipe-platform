import React, { useState, useEffect } from "react";
import axios from "axios";
import { User, Heart, Book, Settings, LogOut, Loader2, ChevronRight, CheckCircle } from "lucide-react";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import { RecipeCard } from "../components/RecipeCard";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const userID = useGetUserID();
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const [myRecipes, setMyRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview"); // overview, my-recipes, saved-recipes, settings
  
  const [username, setUsername] = useState("Username");
  const [newUsername, setNewUsername] = useState("");
  const [updateMsg, setUpdateMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!userID) {
        setLoading(false);
        return;
      }
      try {
        // Fetch all recipes and filter by owner for count (or use specialized endpoint if available)
        const resAll = await axios.get("http://localhost:3001/recipes");
        const userRecipes = resAll.data.filter(r => r.userOwner === userID);
        setMyRecipes(userRecipes);

        // Fetch saved recipes
        const resSaved = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`);
        setSavedRecipes(resSaved.data.savedRecipes || []);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile data", err);
        setLoading(false);
      }
    };
    fetchData();
  }, [userID]);

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  if (loading) return (
    <div className="flex h-[60vh] items-center justify-center">
      <Loader2 className="animate-spin text-primary" size={48} />
    </div>
  );

  if (!userID) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          <User size={40} />
        </div>
        <h2 className="text-2xl font-black">Login to View Profile</h2>
        <button onClick={() => navigate("/auth")} className="bg-primary text-white px-8 py-3 rounded-2xl font-bold transition-transform active:scale-95">
          Go to Login
        </button>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "my-recipes":
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black">My Created Recipes</h3>
              <button onClick={() => setActiveTab("overview")} className="text-sm font-bold text-primary">Back</button>
            </div>
            {myRecipes.length === 0 ? (
              <p className="text-gray-400 py-10 text-center font-bold">You haven't created any recipes yet.</p>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {myRecipes.map(r => <RecipeCard key={r._id} recipe={r} />)}
              </div>
            )}
          </div>
        );
      case "saved-recipes":
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black">Saved for Later</h3>
              <button onClick={() => setActiveTab("overview")} className="text-sm font-bold text-primary">Back</button>
            </div>
            {savedRecipes.length === 0 ? (
              <p className="text-gray-400 py-10 text-center font-bold">Your cookbook is empty.</p>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {savedRecipes.map(r => <RecipeCard key={r._id} recipe={r} />)}
              </div>
            )}
          </div>
        );
      case "settings":
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black">Account Settings</h3>
              <button onClick={() => setActiveTab("overview")} className="text-sm font-bold text-primary">Back</button>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Update Username</label>
                <input 
                  value={newUsername}
                  onChange={e => setNewUsername(e.target.value)}
                  placeholder="New username"
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 font-bold outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <button 
                onClick={() => {
                  if (newUsername) {
                    setUsername(newUsername);
                    setNewUsername("");
                    setUpdateMsg("Username updated successfully!");
                    setTimeout(() => setUpdateMsg(""), 3000);
                  }
                }}
                className="w-full bg-primary text-white py-4 rounded-2xl font-black shadow-lg shadow-primary/20 active:scale-95 transition-all"
              >
                Save Changes
              </button>
              {updateMsg && (
                <p className="text-green-500 font-bold text-center flex items-center justify-center gap-2">
                  <CheckCircle size={16} /> {updateMsg}
                </p>
              )}
            </div>
          </div>
        );
      default:
        return (
          <>
            {/* USER CARD */}
            <div className="bg-white rounded-[40px] shadow-sm p-10 flex flex-col items-center text-center border border-gray-50 relative overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-primary/10 to-orange-100" />
              <div className="relative z-10 w-28 h-28 rounded-full bg-white p-1.5 shadow-xl border border-gray-100">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-red-500 flex items-center justify-center text-white text-4xl font-black">
                  {username.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="relative z-10 mt-6">
                <h2 className="text-2xl font-black text-[#1A1A1A]">{username}</h2>
                <p className="text-gray-400 font-bold mt-1 uppercase tracking-widest text-xs">Premium Member · Food Lover 🍜</p>
              </div>

              <div className="grid grid-cols-2 gap-8 mt-8 w-full border-t border-gray-50 pt-8">
                <div>
                  <p className="text-2xl font-black text-[#1A1A1A]">{myRecipes.length}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">My Recipes</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-[#1A1A1A]">{savedRecipes.length}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Saved</p>
                </div>
              </div>
            </div>

            {/* MENU */}
            <div className="space-y-4">
              {[
                { label: "My Recipes", icon: Book, color: "text-blue-500 bg-blue-50", tab: "my-recipes" },
                { label: "Saved Recipes", icon: Heart, color: "text-red-500 bg-red-50", tab: "saved-recipes" },
                { label: "Account Settings", icon: Settings, color: "text-gray-500 bg-gray-100", tab: "settings" },
              ].map(({ label, icon: Icon, color, tab }) => (
                <div
                  key={label}
                  onClick={() => setActiveTab(tab)}
                  className="bg-white rounded-[28px] shadow-sm p-5 flex justify-between items-center border border-gray-50 hover:border-primary/20 transition-all cursor-pointer group hover:shadow-md active:scale-[0.98]"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                      <Icon size={22} />
                    </div>
                    <span className="font-black text-[#1A1A1A]">{label}</span>
                  </div>
                  <div className="text-gray-300 group-hover:text-primary transition-colors">
                    <ChevronRight size={24} />
                  </div>
                </div>
              ))}
            </div>

            {/* LOGOUT */}
            <button 
              onClick={logout}
              className="w-full py-5 rounded-[28px] bg-white border-2 border-red-500/10 text-red-500 font-black text-lg flex items-center justify-center gap-3 hover:bg-red-50 transition-all press"
            >
              <LogOut size={22} /> Logout
            </button>
          </>
        );
    }
  };

  return (
    <div className="bg-[#FFFDFB] min-h-screen px-4 pt-10 pb-32 max-w-2xl mx-auto space-y-8">
      {renderContent()}
    </div>
  );
};