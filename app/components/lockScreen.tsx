"use client";

import React, { useState, useEffect } from "react";

type PinLockProps = {
  onUnlock: () => void;
};

export function PinLock({ onUnlock }: PinLockProps) {
  const [pin, setPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [savedPin, setSavedPin] = useState("");

  useEffect(() => {
    const storedPin = localStorage.getItem("app_pin");
    if (storedPin) {
      setSavedPin(storedPin);
    }
  }, []);

  const handlePinSubmit = () => {
    if (pin === savedPin) {
      onUnlock();
    } else {
      alert("Incorrect PIN. Try again.");
    }
  };

  const handleNewPinSubmit = () => {
    if (newPin.length === 4) {
      localStorage.setItem("app_pin", newPin);
      setSavedPin(newPin);
      onUnlock();
    } else {
      alert("PIN must be 4 digits.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 via-red-200 to-yellow-100">
      <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center space-y-4 w-[300px]">
        <h2 className="text-xl font-bold text-pink-600 mb-4">
          {savedPin ? "Enter your 4-digit PIN" : "Set your 4-digit PIN"}
        </h2>

        {savedPin ? (
          <>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              maxLength={4}
              className="w-full p-3 border border-pink-300 rounded-xl bg-pink-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter PIN"
            />
            <button
              onClick={handlePinSubmit}
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors duration-300"
            >
              Unlock
            </button>
          </>
        ) : (
          <>
            <input
              type="password"
              value={newPin}
              onChange={(e) => setNewPin(e.target.value)}
              maxLength={4}
              className="w-full p-3 border border-pink-300 rounded-xl bg-pink-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-4000"
              placeholder="Set a 4-digit PIN"
            />
            <button
              onClick={handleNewPinSubmit}
              className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600 transition-colors duration-300"
            >
              Save PIN
            </button>
          </>
        )}
      </div>
    </div>
  );
}
