import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ChefHat, Eye, EyeOff, User, Lock } from "lucide-react";

const TABS = ["Login", "Register"];

export const Auth = () => {
  const [tab, setTab] = useState(0);
  return (
    <div className="bg-background min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-[480px] bg-white rounded-[40px] shadow-2xl shadow-primary/10 overflow-hidden border border-gray-50">
        {/* Top branding */}
        <div className="bg-gradient-to-br from-primary to-[#FF3D00] pt-12 pb-10 px-6 text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 animate-pulse" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/10 animate-pulse" style={{ animationDelay: '1s' }} />
          
          <div className="w-20 h-20 rounded-[28px] bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-4 shadow-xl border border-white/30 transform hover:scale-110 transition-transform cursor-pointer">
            <ChefHat size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">CookMeet</h1>
          <p className="text-orange-100 text-sm font-bold mt-1 opacity-90">Your smart recipe companion</p>
        </div>

        <div className="px-8 py-10">
          {/* Tab switcher */}
          <div className="flex bg-gray-50 p-1.5 rounded-[24px] mb-8 border border-gray-100">
            {TABS.map((t, i) => (
              <button
                key={t}
                onClick={() => setTab(i)}
                className={`flex-1 py-3.5 text-sm font-black rounded-[20px] transition-all press
                  ${tab === i 
                    ? "bg-white shadow-lg shadow-gray-200/50 text-[#1A1A1A] scale-[1.02]" 
                    : "text-gray-400 hover:text-gray-600"}`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="min-h-[280px]">
            {tab === 0 ? <LoginForm /> : <RegisterForm onSuccess={() => setTab(0)} />}
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-400 text-sm font-medium">
          New here? <button onClick={() => setTab(1)} className="text-primary font-bold hover:underline">Create an account</button>
        </p>
      </div>
    </div>
  );
};

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-10 py-3 text-sm font-medium focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
      />
      <button
        type="button"
        onClick={() => setShow(s => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
};

const LoginForm = () => {
  const [, setCookies] = useCookies(["access_token"]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("https://cookmeet-recipe-backend.onrender.com/auth/login", { username, password });
      if (data.message) { alert(data.message); return; }
      setCookies("access_token", data.token);
      window.localStorage.setItem("userID", data.userID);
      navigate("/");
    } catch { alert("Login failed. Please try again."); }
    finally { setLoading(false); }
  };

  return (
    <form onSubmit={submit} className="space-y-4 animate-fade-in">
      <div className="relative">
        <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text" value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          required
          className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm font-medium focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>
      <PasswordInput value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />

      <button
        type="submit" disabled={loading}
        className="w-full py-4 bg-gradient-to-r from-primary to-[#FF3D00] text-white font-extrabold rounded-2xl shadow-lg shadow-primary/30 press disabled:opacity-60 mt-2"
      >
        {loading ? "Signing in..." : "Login →"}
      </button>

      <p className="text-center text-xs text-gray-500 font-medium">
        By continuing you agree to our Terms of Service
      </p>
    </form>
  );
};

const RegisterForm = ({ onSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("https://cookmeet-recipe-backend.onrender.com/auth/register", { username, password });
      alert(data.message || "Registered! Please login.");
      onSuccess();
    } catch { alert("Registration failed. Username may be taken."); }
    finally { setLoading(false); }
  };

  return (
    <form onSubmit={submit} className="space-y-4 animate-fade-in">
      <div className="relative">
        <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text" value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Choose a username"
          required minLength={3}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm font-medium focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>
      <PasswordInput value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a password" />

      <div className="bg-orange-50 rounded-xl p-3 border border-orange-100">
        <p className="text-xs text-orange-700 font-semibold">
          ✓ Make it at least 6 characters · ✓ Include numbers for extra security
        </p>
      </div>

      <button
        type="submit" disabled={loading}
        className="w-full py-4 bg-[#1A1A1A] text-white font-extrabold rounded-2xl shadow-lg press disabled:opacity-60 mt-2"
      >
        {loading ? "Creating account..." : "Create Account →"}
      </button>
    </form>
  );
};
