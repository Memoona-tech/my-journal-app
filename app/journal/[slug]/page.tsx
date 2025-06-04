"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import slugify from "slugify";
import {
  deleteEntryBySlug,
  editEntryBySlug,
} from "@/utils/journalOperations";

type Entry = {
  title: string;
  content: string;
};

export default function JournalEntryPage() {
  const { slug } = useParams(); // get the slug from the URL (e.g. journal/my-title)
  const router = useRouter();

  const [entry, setEntry] = useState<Entry | null>(null);

  const [isEditing, setIsEditing] = useState(false);

  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    if (!slug) return;

    const stored = localStorage.getItem("journalEntries");
    if (stored) {
      try {
        const parsed: Entry[] = JSON.parse(stored);
        const match = parsed.find(
          (e) => typeof e.title === "string" && slugify(e.title) === slug
        );
        if (match) {
          setEntry(match);
          setEditTitle(match.title);
          setEditContent(match.content);
        } else {
          setEntry(null);
        }
      } catch (e) {
        console.error("Failed to load entry:", e);
      }
    }
  }, [slug]);

  if (!entry) {
    return (
      <p className="p-4 font-bold text-center bg-pink-500">
        Journal not found Pookie 😭🎀
      </p>
    );
  }

  const handleDelete = () => {
    deleteEntryBySlug(slug as string);
    // trigger update for sidebar
  localStorage.setItem("journalUpdate", Date.now().toString());

    router.push("/journal");
  };

 const handleSave = () => {
  if (editTitle.trim() === "" || editContent.trim() === "") return;

  editEntryBySlug(slug as string, editTitle, editContent);
  localStorage.setItem("journalUpdate", Date.now().toString());
  router.push("/journal");
 };

  return (
    <div className="min-h-screen p-8 bg-animated">
      <button
        onClick={() => router.push("/journal")}
        className="mt-6 text-pink-600 hover:underline bg-white p-2 rounded shadow hover:bg-pink-100 transition hover:cursor-pointer"
      >
        ← Back to Journal List
      </button>

      <div className="mt-8 max-w-2xl mx-auto p-2 rounded border border-pink-300 shadow bg-pink-200">
        {isEditing ? (
          <div>
            <input
              type="text"
              className="w-full p-2 mb-4 rounded text-gray-800 border font-xl border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <textarea
              className="w-full h-40 p-2 mb-4 rounded text-gray-800 border font-xl border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded hover:cursor-pointer"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 px-4 py-2 rounded hover:cursor-pointer text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-pink-600 mb-4">{entry.title}</h1>
            <p className="text-gray-800 whitespace-pre-wrap">{entry.content}</p>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:cursor-pointer"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
