import React, { useState } from "react";
import { 
  Home, 
  Search, 
  PlusCircle, 
  Heart, 
  User, 
  ChefHat, 
  Menu, 
  X,
  LogOut
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useFilters } from "../context/FilterContext";

export const Navbar = () => {
  const location = useLocation();
  const { search, setSearch } = useFilters();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "Home", path: "/home", icon: Home },
    { name: "Explore", path: "/explore", icon: Search },
    { name: "Create", path: "/create-recipe", icon: PlusCircle },
    { name: "Saved", path: "/saved-recipes", icon: Heart },
    { name: "Profile", path: "/profile", icon: User },
  ];

  return (
    <>
      {/* --- MOBILE TOP BAR (BRANDING) --- */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100 px-6 h-16 flex items-center justify-between md:hidden shadow-sm">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-white shadow-sm">
            <ChefHat size={18} />
          </div>
          <span className="text-lg font-black tracking-tight text-[#1A1A1A]">
            Cook<span className="text-primary">Meet</span>
          </span>
        </Link>
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 active:scale-90 transition-transform"
        >
          <Menu size={20} />
        </button>
      </nav>

      {/* --- DESKTOP NAVBAR (TOP STICKY) --- */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm hidden md:block transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20 transform group-hover:rotate-12 transition-transform duration-300">
              <ChefHat size={26} />
            </div>
            <span className="text-2xl font-black tracking-tight text-[#1A1A1A]">
              Cook<span className="text-primary">Meet</span>
            </span>
          </Link>

          {/* SEARCH BAR (INTEGRATED) */}
          {location.pathname === "/explore" && (
            <div className="flex-1 max-w-md mx-10 relative animate-in fade-in slide-in-from-top-2 duration-500">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search premium recipes..."
                className="w-full bg-gray-50 border-none rounded-2xl pl-11 pr-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              />
            </div>
          )}

          {/* LINKS */}
          <div className="flex items-center gap-1">
            {navLinks.map(({ name, path, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all relative group
                  ${isActive(path) 
                    ? "text-primary bg-primary/5" 
                    : "text-gray-500 hover:text-[#1A1A1A] hover:bg-gray-50"}`}
              >
                <Icon size={18} strokeWidth={isActive(path) ? 2.5 : 2} />
                {name}
                {isActive(path) && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                )}
              </Link>
            ))}
            
            <div className="h-8 w-[1px] bg-gray-100 mx-4" />
            
            <button className="w-11 h-11 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all active:scale-90">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* --- MOBILE NAVBAR (BOTTOM) --- */}
      <nav className="fixed bottom-0 left-0 w-full z-50 bg-white/95 backdrop-blur-xl border-t border-gray-100 px-2 pt-2 pb-6 flex justify-around md:hidden shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
        {navLinks.slice(0, 5).map(({ name, path, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={`flex flex-col items-center gap-1.5 px-3 py-2 rounded-2xl transition-all duration-300
              ${isActive(path) ? "text-primary scale-110" : "text-gray-400"}`}
          >
            <div className={`p-1.5 rounded-xl transition-colors ${isActive(path) ? "bg-primary/10" : ""}`}>
              <Icon size={20} strokeWidth={isActive(path) ? 2.5 : 2} />
            </div>
            <span className={`text-[9px] font-black uppercase tracking-wider transition-opacity ${isActive(path) ? "opacity-100" : "opacity-0"}`}>
              {name}
            </span>
          </Link>
        ))}
      </nav>

      {/* --- MOBILE DRAWER (SIDEBAR) --- */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" 
            onClick={() => setIsDrawerOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="absolute top-0 right-0 w-[80%] h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 ease-out">
            <div className="p-6 flex items-center justify-between border-b border-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                  <ChefHat size={22} />
                </div>
                <span className="text-xl font-black tracking-tight">CookMeet</span>
              </div>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
              <p className="px-4 text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">Master Menu</p>
              {navLinks.map(({ name, path, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsDrawerOpen(false)}
                  className={`flex items-center gap-4 p-4 rounded-2xl font-bold transition-all active:scale-[0.98]
                    ${isActive(path) ? "bg-primary/5 text-primary" : "text-gray-600 hover:bg-gray-50"}`}
                >
                  <div className={`p-2 rounded-xl ${isActive(path) ? "bg-primary/10 text-primary" : "bg-gray-50 text-gray-400"}`}>
                    <Icon size={20} />
                  </div>
                  <span>{name}</span>
                </Link>
              ))}
              
              <div className="pt-8 px-4">
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">Personal</p>
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-[32px] p-6 border border-orange-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <p className="text-orange-800 font-black text-sm mb-1 relative z-10">CookMeet Premium</p>
                  <p className="text-orange-600/80 text-xs font-bold leading-relaxed relative z-10">Unlock 500+ premium recipes and ad-free experience.</p>
                  <button className="mt-5 w-full bg-white text-orange-600 py-3.5 rounded-2xl font-black text-xs shadow-sm shadow-orange-200 active:scale-95 transition-transform">
                    Upgrade Now
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-50">
              <button className="w-full py-4 rounded-2xl bg-red-50 text-red-500 font-black flex items-center justify-center gap-3 active:scale-95 transition-transform">
                <LogOut size={18} /> Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};