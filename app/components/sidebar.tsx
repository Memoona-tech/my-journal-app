/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import slugify from "slugify";
import { Menu, Settings, X } from "lucide-react";

type JournalEntry = {
  title: string;
  content: string;
  createdAt: string;
};

function groupEntries(entries: JournalEntry[]){
  const today: JournalEntry[] = [];
  const yesterday: JournalEntry[] = [];
  const older: JournalEntry[] = [];

  const now = new Date();
  const todayDate= now.toDateString();
  const yesterdayDate = new Date(now.setDate(now.getDate() - 1)).toDateString();
  
  entries.forEach(entry => {
    const entryDate = new Date(entry.createdAt).toDateString();

    if(entryDate === todayDate){
      today.push(entry);
    } else if(entryDate === yesterdayDate) {
      yesterday.push(entry)
    } else {
      older.push(entry);
    }
  });

  return { today, yesterday, older};
}

export const Sidebar = ({ entries }: { entries: JournalEntry[] }) => {
  const [open, setOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const handleStorageChnage = (event: StorageEvent) => {
      if (event.key === "journalUpdate") {
        window.location.reload();
      }
    };

    window.addEventListener("storage", handleStorageChnage);
    return () => window.removeEventListener("storage", handleStorageChnage);
  }, []);

  {
    /* sidebar returns back when I comment the line below */
  }
  //if(!hasMounted) return null;

const { today, yesterday, older } = groupEntries(entries);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-25 left-4 z-50 bg-pink-500 text-white p-2 rounded-full shadow hover:cursor-pointer hover:bg-pink-600 transition"
      >
        {open ? <X /> : <Menu />}
      </button>

      <aside
        className={`fixed top-0 left-0 h-full bg-animated shadow-lg border-r border-r-pink-200 z-40 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } w-64 `}
      >
        <div className="p-6 border-b border-b-pink-300">
          <Link href="/">
            <h2 className="text-pink-500 text-2xl font-bold hover:text-pink-700 hover:cursor-pointer transition-colors duration-300">
              SkyCarly🌷.
            </h2>
          </Link>
        </div>

        <ul className="p-4 flex flex-col gap-1 overflow-y-auto">
          {entries.length === 0 ? (
            <li className="text-gray-500 text-center">
              No entries yet! Start writing your journal.✨
            </li>
          ) : (
            <>
              {today.length > 0 && (
        <div>
          <h3 className="text-pink-600 font-bold mb-2">Today</h3>
          <ul className="p-4 flex flex-col gap-1 overflow-y-auto">
            {/* <ul className="space-y-2">  for simple older style*/}
            {today.map((entry, idx) => (
              <Link key={idx} href={`/journal/${slugify(entry.title)}`}>
                <li className="p-2 rounded-full text-pink-500 hover:text-white bg-pink-100 shadow-md hover:bg-pink-400 transition-colors duration-300 hover:cursor-pointer">
                  {entry.title.length > 30
                    ? entry.title.slice(0, 30)
                    : entry.title}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}

      {yesterday.length > 0 && (
        <div>
          <h3 className="text-pink-600 font-bold mb-2">Yesterday</h3>
          <ul className="p-4 flex flex-col gap-1 overflow-y-auto">
            {yesterday.map((entry, idx) => (
              <Link key={idx} href={`/journal/${slugify(entry.title)}`}>
                <li className="p-2 rounded-full text-pink-500 hover:text-white bg-pink-100 shadow-md hover:bg-pink-400 transition-colors duration-300 hover:cursor-pointer">
                  {entry.title.length > 30
                    ? entry.title.slice(0, 30)
                    : entry.title}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}

      {older.length > 0 && (
        <div>
          <h3 className="text-pink-600 font-bold mb-2">Older</h3>
          <ul className="p-4 flex flex-col gap-1 overflow-y-auto">
            {older.map((entry, idx) => (
              <Link key={idx} href={`/journal/${slugify(entry.title)}`}>
                <li className="p-2 rounded-full text-pink-500 hover:text-white bg-pink-100 shadow-md hover:bg-pink-400 transition-colors duration-300 hover:cursor-pointer">
                  {entry.title.length > 30
                    ? entry.title.slice(0, 30)
                    : entry.title}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </>
  )}
</ul>


        <div className="p-4 border-t border-t-pink-300">
          <button
            onClick={() => alert("Feature coming soon!")}
            className="flex items-center gap-2 text-pink-700 hover:text-pink-800 hover:cursor-pointer text-left transition p-2"
          >
            <Settings />
            Settings
          </button>

          {/* <button
              onClick={() => localStorage.removeItem("app_pin")}
              className="text-sm text-red-500 underline"
              >
              Reset PIN
              </button>
          */}
        </div>
      </aside>
    </>
  );
};
