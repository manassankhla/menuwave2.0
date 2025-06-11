// src/pages/MenuDesigns.tsx

import { QRCodeCanvas } from "qrcode.react"; // ⬅️ Add this at top

// Inside the component, just before return, define a ref
import { useRef } from "react";


import React, { useState } from "react";

interface Template {
  name: string;
  className: string;
}

const templates: Template[] = [
  {
    name: "Minimal Cafe",
    className: "bg-white text-gray-800",
  },
  {
    name: "Dark Bar Theme",
    className: "bg-gray-900 text-white",
  },
  {
    name: "Street Food Vibes",
    className: "bg-yellow-100 text-red-700",
  },
  {
    name: "Elegant Fine Dining",
    className: "bg-gradient-to-br from-white to-gray-100 text-black",
  },
  {
    name: "Retro Diner",
    className: "bg-pink-100 text-blue-900",
  },
];

const MenuDesigns = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-10">Choose & Customize Menu</h1>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {templates.map((template, index) => (
          <MenuBlock key={index} template={template} />
        ))}
      </div>
    </div>
  );
};

const MenuBlock = ({ template }: { template: Template }) => {
  const [items, setItems] = useState<string[]>(["Sample Item 1", "Sample Item 2"]);
  const [inputValue, setInputValue] = useState("");

  const addItem = () => {
    if (inputValue.trim() === "") return;
    setItems([...items, inputValue]);
    setInputValue("");
  };

  return (
    <div
      className={`rounded-xl p-6 h-auto transition-all hover:scale-[1.02] shadow-md cursor-pointer flex flex-col justify-between ${template.className}`}
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">{template.name}</h2>

      <div className="flex flex-col gap-2 mb-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="border-b py-1 text-sm font-medium flex justify-between items-center"
          >
            <span>{item}</span>
            <span className="text-xs opacity-60">₹{(idx + 1) * 50}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="px-3 py-1 text-sm border rounded w-full text-black"
          placeholder="Add item..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          onClick={addItem}
          className="px-4 py-1 text-sm bg-black text-white rounded hover:opacity-90"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default MenuDesigns;
