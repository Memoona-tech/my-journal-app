"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Header } from "./components/header";
// import { Button } from "./components/button"; // We'll tweak the style separately
import './globals.css';

export default function Home() {
  const router = useRouter();

  const goToJournal = () => {
    router.push("/journal");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300 font-sans">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-rose-800">
        <div className="text-center space-y-4 max-w-xl">
          <h1 className="text-4xl sm:text-5xl font-love font-semibold leading-tight drop-shadow-md">
            Welcome to Your Softest Space 🌺
          </h1>
          <p className="text-lg sm:text-xl italic font-love tracking-wide text-rose-700">
            Whisper your heart onto the page. Let your stories bloom here.
          </p>

          <div className="mt-6">
            <button
              onClick={goToJournal}
              className="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:cursor-pointer"
            >
              Begin Journaling? 👀
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-rose-200 text-rose-800 py-4 px-6 text-center text-sm italic">
        © 2025 Your Journal Sanctuary. Crafted with love & softness 🌷
      </footer>
    </div>
  );
}
