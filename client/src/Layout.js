import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./components/navbar";

export const Layout = () => {
  return (
    <div className="bg-background min-h-screen font-inter antialiased">
      {/* GLOBAL NAVBAR (Sticky) */}
      <Navbar />
      
      {/* MAIN CONTENT AREA */}
      <main className="w-full max-w-7xl mx-auto relative min-h-screen pt-20 pb-32 md:pb-12">
        <Outlet />
      </main>

      {/* Background blobs for premium feel */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/3 blur-[120px] rounded-full -z-10 pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-400/3 blur-[120px] rounded-full -z-10 pointer-events-none" />
    </div>
  );
};