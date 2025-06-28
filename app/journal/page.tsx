"use client";

import React, { useState, useEffect } from "react";
import { Header } from "../components/header";
import { Sidebar } from "../components/sidebar";
import { PinLock } from "../components/lockScreen";

type Entry = {
  title: string;
  content: string;
  createdAt: string;
};

export default function JournalPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Save journal entry
  const saveEntry = () => {
    if (title.trim() === "" || content.trim() === "") return;

    const newEntry: Entry = { 
      title, 
      content, 
      createdAt: new Date().toISOString(), 
    };

    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
    setTitle("");
    setContent("");
  };

  // Load journal entries from storage
  useEffect(() => {
    const stored = localStorage.getItem("journalEntries");
    try {
      const parsed = stored ? JSON.parse(stored) : [];
      if (Array.isArray(parsed)) {
        setEntries(parsed);
      }
    } catch (error) {
      console.error("Failed to parse saved entries:", error);
    }
  }, []);

  // Set current date on mount
  useEffect(() => {
    setMounted(true);
    const formattedDate = new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
    setCurrentDate(formattedDate);
  }, []);


  useEffect(() => {
    const unlocked = sessionStorage.getItem('isUnlocked');
    if (unlocked === 'true'){
      setIsUnlocked(true);
    }
  }, []);


  const handleUnlock = () => {
    sessionStorage.setItem('isUnlocked', 'true');
    setIsUnlocked(true);
  }

  if(!isUnlocked) return <PinLock onUnlock={handleUnlock} />;

  return (
    <div className="min-h-screen flex flex-col bg-animated">
      <Header />
      <Sidebar entries={entries} />

      <main className="flex-1 flex flex-col items-center justify-start px-4 py-12 sm:p-6">
        <h2 className="text-lg font-love italic tracking-wide text-center text-black mb-8">
          𝒲𝒽𝑒𝓇𝑒 𝓉𝒽𝑒 𝓂𝒶𝑔𝒾𝒸 𝒽𝒶𝓅𝓅𝑒𝓃𝓈! 🌟
          <br />
          𝒮𝓉𝒶𝓇𝓉 𝓌𝓇𝒾𝓉𝒾𝓃𝑔 𝓎𝑜𝓊𝓇 𝒿ℴ𝓊𝓇𝓃𝒶𝓁 𝓃ℴ𝓌!🖋️
        </h2>

        <div className="bg-white/50 backdrop-blur-md rounded-2xl shadow-lg p-6 w-full max-w-2xl flex flex-col gap-4">
          {mounted && currentDate && (
            <p className="text-sm text-pink-700 text-right">{currentDate}</p>
          )}

          <input
            type="text"
            placeholder="Title of your journal entry"
            className="w-full p-3 border border-pink-300 rounded-xl bg-pink-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full h-64 p-4 border border-pink-300 rounded-xl shadow-md bg-pink-100 text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Write your thoughts here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            onClick={saveEntry}
            className="bg-pink-500 text-white font-bold py-2 px-6 rounded-xl hover:bg-pink-600 transition-colors duration-300 self-center hover:cursor-pointer"
          >
            Save Entry 📝
          </button>
        </div>
      </main>
    </div>
  );
}
