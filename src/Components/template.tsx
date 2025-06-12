import React, { useState } from "react";
import { Upload, Sparkles } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { SparklesCore } from "@/Components/ui/sparkles";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Template {
  name: string;
  className: string;
}

const templates: Template[] = [
  { name: "Neon Grid", className: "bg-black text-cyan-400 border-2 border-cyan-500 shadow-lg shadow-cyan-500/20" },
  { name: "Starlight Zen", className: "bg-gray-900 text-white border border-gray-700 shadow-xl" },
  { name: "Cosmic Cafe", className: "bg-gradient-to-br from-amber-900 to-amber-700 text-amber-100 border border-amber-500" },
  { name: "Galactic Night", className: "bg-gradient-to-br from-indigo-950 to-gray-900 text-indigo-200 shadow-xl" },
  { name: "Nebula Glow", className: "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg" },
  { name: "Astro Mint", className: "bg-gradient-to-br from-green-900 to-teal-900 text-green-100 border border-teal-500" },
  { name: "Retro Nebula", className: "bg-gradient-to-r from-pink-700 to-purple-800 text-pink-200 shadow-md" },
  { name: "Ocean Cosmos", className: "bg-gradient-to-br from-blue-900 to-cyan-900 text-cyan-100 border border-cyan-500" },
  { name: "Purple Void", className: "bg-gradient-to-br from-purple-900 to-indigo-900 text-purple-200 shadow-lg" },
  { name: "Cyber Nebula", className: "bg-gradient-to-bl from-black to-gray-900 text-pink-400 border-2 border-pink-600 shadow-lg shadow-pink-600/20" },
];

const MenuBlock = ({ template, onSelect }: { template: Template; onSelect: () => void }) => {
  const [items, setItems] = useState<string[]>(["Stellar Burger", "Cosmic Fries"]);
  const [inputValue, setInputValue] = useState("");

  const addItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inputValue.trim() === "") return;
    setItems([...items, inputValue]);
    setInputValue("");
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={onSelect}
      className={cn(
        "rounded-xl p-6 transition-all shadow-md cursor-pointer flex flex-col justify-between hover:shadow-2xl",
        template.className
      )}
    >
      <h2 className="text-xl font-semibold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
        {template.name}
      </h2>

      <div className="flex flex-col gap-2 mb-4">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-b border-white/20 py-2 text-sm font-medium flex justify-between items-center"
          >
            <span>{item}</span>
            <span className="text-xs opacity-60">₹{(idx + 1) * 100}</span>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="px-3 py-1 text-sm bg-gray-800/50 border border-gray-700 rounded w-full text-white placeholder-gray-400"
          placeholder="Add item..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onClick={(e) => e.stopPropagation()}
        />
        <button
          onClick={addItem}
          className="px-4 py-1 text-sm bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded hover:from-cyan-600 hover:to-purple-600"
        >
          +
        </button>
      </div>
    </motion.div>
  );
};

const TemplatesPage = () => {
  const [uploadedBackground, setUploadedBackground] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileURL = URL.createObjectURL(e.target.files[0]);
      setUploadedBackground(fileURL);
      navigate("/makedmenu", { state: { background: fileURL } });
    }
  };

  const handleSelectTemplate = (bg: string) => {
    navigate("/makedmenu", { state: { background: bg } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-950 py-10 px-6 sm:px-12 relative overflow-hidden">
      <SparklesCore
        className="absolute inset-0 z-0"
        particleDensity={200}
        minSize={0.2}
        maxSize={1.0}
        particleColor="#ffffff"
      />
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 relative z-10"
      >
        Choose Your Menu Template
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {templates.map((template, index) => (
          <MenuBlock key={index} template={template} onSelect={() => handleSelectTemplate(template.className)} />
        ))}

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="border-2 border-dashed border-cyan-500/50 rounded-xl p-6 flex flex-col justify-center items-center text-center hover:bg-gray-900/30 cursor-pointer backdrop-blur-sm"
        >
          <Upload className="w-10 h-10 text-cyan-400 mb-3" />
          <p className="text-cyan-200 mb-3 font-medium">Upload Your Cosmic Background</p>
          <Input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
            id="bg-upload"
          />
          <label
            htmlFor="bg-upload"
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full hover:from-cyan-600 hover:to-purple-600"
          >
            Upload Background
          </label>
          {uploadedBackground && (
            <img
              src={uploadedBackground}
              alt="Uploaded Background"
              className="mt-4 w-full h-32 object-cover rounded-md border border-cyan-500/50"
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TemplatesPage;