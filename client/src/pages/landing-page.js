import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Search,
  Heart,
  PlusCircle,
  BookOpen,
  ChefHat,
  Sparkles,
  CheckCircle,
  X,
} from "lucide-react";

export const Landing = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isJoined, setIsJoined] = React.useState(false);

  const features = [
    {
      title: "Discover Recipes",
      desc: "Instant access to thousands of gourmet recipes from across the globe.",
      icon: Search,
      path: "/explore",
      color: "bg-blue-50 text-blue-500",
    },
    {
      title: "Chef-Grade Tools",
      desc: "Advanced creation tools to document your culinary masterpieces.",
      icon: PlusCircle,
      path: "/create-recipe",
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Smart Collections",
      desc: "Organize your favorite plates into personalized digital cookbooks.",
      icon: Heart,
      path: "/saved-recipes",
      color: "bg-red-50 text-red-500",
    },
    {
      title: "Interactive Steps",
      desc: "Precision instructions with clear metrics for consistent results.",
      icon: BookOpen,
      path: "/explore",
      color: "bg-green-50 text-green-500",
    },
  ];

  // Removed: steps array

  return (
    <div className="bg-white min-h-screen text-[#1A1A1A] overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 md:pt-20 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* LEFT: TEXT */}
          <div className="flex-1 space-y-8 text-center lg:text-left relative z-10 animate-in fade-in slide-in-from-left duration-700">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-black text-[11px] uppercase tracking-widest">
              <Sparkles size={14} /> The Future of Home Cooking
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-[#1A1A1A]">
              Discover, Cook & <span className="text-primary italic">Personalize</span> Your Recipes
            </h1>
            
            <p className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              CookMeet brings professional culinary expertise to your kitchen. Explore, save, and create your digital cookbook with zero technical friction.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
              <button
                onClick={() => navigate("/explore")}
                className="group bg-[#1A1A1A] text-white px-10 py-5 rounded-[24px] font-black text-lg flex items-center justify-center gap-3 hover:bg-primary transition-all shadow-xl shadow-black/10 hover:shadow-primary/30 active:scale-95"
              >
                Start Exploring <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-white border-2 border-gray-100 px-10 py-5 rounded-[24px] font-black text-lg flex items-center justify-center gap-3 hover:border-primary hover:text-primary transition-all active:scale-95"
              >
                Join Community
              </button>
            </div>

            <div className="flex items-center gap-4 justify-center lg:justify-start pt-6">
              <p className="text-gray-400 text-sm font-bold">Loved by food enthusiasts</p>
            </div>
          </div>

          {/* RIGHT: IMAGE CARD */}
          <div className="flex-1 relative animate-in fade-in slide-in-from-right duration-700">
            <div className="relative group">
              {/* IMAGE WRAPPER */}
              <div className="aspect-[4/5] md:aspect-square relative rounded-[48px] overflow-hidden shadow-2xl z-10 border-8 border-white group-hover:rotate-1 transition-transform duration-500">
                <img 
                  src="/gourmet-dish.png" 
                  alt="Professional culinary gourmet dish" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  loading="lazy"
                />
                
                {/* FLOATING CARD 1 - REMOVED EXPERT TESTED */}

                {/* FLOATING CARD 2 */}
                <div className="absolute bottom-10 right-10 bg-white rounded-3xl p-5 shadow-2xl animate-float-slow invisible lg:visible">
                  <div className="flex items-center gap-2 mb-3">
                    <Heart size={20} className="fill-red-500 text-red-500" />
                    <span className="font-black">Top Picked</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-10 h-1 bg-gray-100 rounded-full" />
                    <div className="w-10 h-1 bg-primary rounded-full" />
                    <div className="w-4 h-1 bg-gray-100 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Decorative backgrounds */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-400/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* JOIN COMMUNITY MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white rounded-[40px] p-8 md:p-12 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>

            {!isJoined ? (
              <div className="space-y-6 text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-[32px] flex items-center justify-center text-primary mx-auto">
                  <ChefHat size={40} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-black tracking-tight">Join CookMeet Community</h2>
                  <p className="text-gray-500 font-medium">Get exclusive recipes and cooking tips straight to your inbox.</p>
                </div>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsJoined(true);
                  }}
                  className="space-y-4"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-center focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  />
                  <button className="w-full bg-[#1A1A1A] text-white py-4 rounded-2xl font-black text-lg hover:bg-primary transition-all active:scale-95 shadow-xl shadow-black/10">
                    Join Now
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-8 text-center animate-in fade-in zoom-in-95 duration-500">
                <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle size={48} />
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-black tracking-tight text-green-600">You're In! 🎉</h2>
                  <p className="text-gray-500 font-medium leading-relaxed">
                    Thanks for joining our culinary family! We've sent a welcome gift to your email.
                    <br />
                    <span className="text-gray-400 text-sm mt-4 block italic">Need help? Contact us at cookmeet@email.com</span>
                  </p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-full bg-gray-100 text-[#1A1A1A] py-4 rounded-2xl font-black text-lg hover:bg-gray-200 transition-all"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Restructured: removed 4-step process and Why Choose CookMeet */}

      {/* FEATURES GRID */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">How <span className="text-primary italic">CookMeet</span> Works</h2>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Four simple steps to culinary mastery</p>
          </div>
          <button 
            onClick={() => navigate("/explore")}
            className="group flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs hover:gap-4 transition-all"
          >
            Explore all features <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white p-10 rounded-[48px] border border-gray-50 shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all cursor-pointer group"
              onClick={() => navigate(f.path)}
            >
              <div className={`w-14 h-14 ${f.color} rounded-[20px] flex items-center justify-center mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                <f.icon size={24} />
              </div>
              <h3 className="text-xl font-black mb-4">{f.title}</h3>
              <p className="text-gray-400 text-sm font-medium leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="bg-[#1A1A1A] rounded-[64px] p-10 md:p-20 text-center space-y-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 to-transparent pointer-events-none" />
          <h2 className="text-4xl md:text-6xl text-white font-black tracking-tight relative z-10 leading-snug">
            Ready to Start Your<br />Culinary Journey?
          </h2>
          <p className="text-gray-400 text-lg md:text-xl font-medium max-w-xl mx-auto relative z-10">
            Elevate your home kitchen experience with precision recipes and expert guidance.
          </p>
          <div className="flex justify-center relative z-10 pt-4">
            <button
              onClick={() => navigate("/explore")}
              className="bg-white text-black px-12 py-5 rounded-[24px] font-black text-xl hover:bg-primary hover:text-white transition-all active:scale-95 shadow-xl shadow-black/40"
            >
              Explore Recipes
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-gray-100 mt-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <ChefHat size={18} />
            </div>
            <span className="text-lg font-black tracking-tight">CookMeet</span>
          </div>
          <p className="text-gray-400 text-[13px] font-bold">
            CookMeet © 2026 · Built for professional home chefs.
          </p>
          <div className="flex gap-6">
            {['Terms', 'Privacy', 'Contact'].map(item => (
              <button key={item} className="text-[13px] font-bold text-gray-400 hover:text-primary transition-colors">{item}</button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};