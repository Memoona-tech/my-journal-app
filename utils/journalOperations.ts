import slugify from "slugify";

export type Entry = {
    title: string;
    content: string;
};

export function getAllEntries(): Entry[] {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("journalEntries");
    try{
        return stored ? JSON.parse(stored) : [];
    } catch {
        console.error("Error parsing journal entries from localStorage");
        return [];
    }
}


export function saveEntries(entry: Entry[]):void {
    if (typeof window != "undefined"){
        localStorage.setItem("journalEntries", JSON.stringify(entry));
    }
}

export function getEntryBySlug(slug: string): Entry | null {
    const entries = getAllEntries();
    return entries.find((e) => slugify(e.title) === slug) || null;
}

export function deleteEntryBySlug(slug: string): void {
  const stored = localStorage.getItem("journalEntries");
  if (!stored) return;

  const entries: Entry[] = JSON.parse(stored);

  const updatedEntries = entries.filter((entry) => {
    if (typeof entry.title !== "string") return true; // Keep it if invalid
    return slugify(entry.title) !== slug;
  });

  localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
}

export function editEntryBySlug(slug: string, newTitle: string, newContent: string): void {
  const stored = localStorage.getItem("journalEntries");
  if (!stored) return;

  const entries: Entry[] = JSON.parse(stored);

  const updatedEntries = entries.map((entry) => {
    // Prevent crash if title is missing or not a string
    if (typeof entry.title !== "string") return entry;

    const currentSlug = slugify(entry.title);
    if (currentSlug === slug) {
      return { title: newTitle, content: newContent };
    }
    return entry;
  });

  localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
}