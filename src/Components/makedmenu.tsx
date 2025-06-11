import React, { useState, useRef, useMemo } from "react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { SparklesCore } from "@/Components/ui/sparkles";
import { ArrowLeft, Download, Plus, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const MakedMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background || "bg-gradient-to-br from-gray-900 to-indigo-900";
  const [title, setTitle] = useState("Your Cosmic Menu");
  const [description, setDescription] = useState("Explore our stellar dishes!");
  const [font, setFont] = useState("font-sans");
  const [fontColor, setFontColor] = useState("text-white");
  type MenuItem = { name: string; desc: string; price: number; dietary?: string };
  const [items, setItems] = useState<MenuItem[]>([]);
  const [newItem, setNewItem] = useState({ name: "", desc: "", price: "", dietary: "" });
  const [error, setError] = useState("");
  const qrRef = useRef(null);

  const isImageUrl = background.startsWith("blob:") || background.startsWith("https") || background.startsWith("data:image");

  const addItem = () => {
    if (!newItem.name || !newItem.price || isNaN(parseFloat(newItem.price))) {
      setError("Please enter a valid dish name and price.");
      return;
    }
    setItems([...items, { ...newItem, price: parseFloat(newItem.price) }]);
    setNewItem({ name: "", desc: "", price: "", dietary: "" });
    setError("");
  };

  const encodeMenuData = () => {
    try {
      const menuData = { title, description, items, font, fontColor, background };
      if (!title || !description || items.length === 0) {
        throw new Error("Please add a title, description, and at least one dish before generating the QR code.");
      }
      const jsonString = JSON.stringify(menuData);
      const base64String = btoa(jsonString);
      console.log("Encoded menu data:", base64String); // Debug log
      const tempUrl = `${window.location.origin}/menu?data=${base64String}`;
      if (tempUrl.length > 2000) {
        throw new Error("Menu data too large for QR code. Reduce the number of items or shorten descriptions.");
      }
      return base64String;
    } catch (err) {
      console.error("Error encoding menu data:", err);
      setError(
        typeof err === "object" && err !== null && "message" in err
          ? String((err as { message: string }).message)
          : "Failed to encode menu data."
      );
      return "";
    }
  };

  const encodedData = encodeMenuData();
  const publicUrl = encodedData ? `${window.location.origin}/menu?data=${encodedData}` : "";
  console.log("Generated QR Code URL:", publicUrl); // Debug log

  const downloadQRCode = () => {
    if (!publicUrl) {
      setError("Cannot generate QR code: Invalid menu data.");
      return;
    }
    const canvas = document.getElementById("qrCode") as HTMLCanvasElement | null;
    if (!canvas) {
      setError("QR code canvas not found.");
      return;
    }
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${title.replace(/\s+/g, "-")}-menu-qr.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const backgroundStyles = useMemo(() => {
    return isImageUrl
      ? {
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }
      : {};
  }, [background, isImageUrl]);

  return (
    <div
      className={cn(
        "min-h-screen flex flex-col md:flex-row relative overflow-hidden",
        isImageUrl ? "" : background
      )}
      style={backgroundStyles}
    >
      {/* Sparkles Background */}
      <SparklesCore
        className="absolute inset-0 z-0"
        particleDensity={150}
        minSize={0.5}
        maxSize={2.5}
        particleColor="#ffffff"
      />

      {/* Left Panel: Controls */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/2 p-6 sm:p-8 bg-gray-900/80 backdrop-blur-xl text-white z-10 flex flex-col space-y-6 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
            Craft Your Menu
          </h2>
          <Button
            variant="ghost"
            onClick={() => navigate("/templates")}
            className="text-gray-400 hover:bg-violet-600 hover:text-white"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Templates
          </Button>
        </div>

        {/* Heading & Style */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Heading & Style</h3>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Menu Heading"
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
          />
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Menu Description"
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
          />
        </div>

        {/* Font & Color */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Font & Color</h3>
          <select
            onChange={(e) => setFont(e.target.value)}
            className="w-full bg-gray-800 border-gray-700 text-white rounded-md px-3 py-2"
          >
            <option value="font-sans">Sans</option>
            <option value="font-serif">Serif</option>
            <option value="font-mono">Monospace</option>
            <option value="font-display">Display</option>
          </select>
          <select
            onChange={(e) => setFontColor(e.target.value)}
            className="w-full bg-gray-800 border-gray-700 text-white rounded-md px-3 py-2"
          >
            <option value="text-white">White</option>
            <option value="text-gray-300">Light Gray</option>
            <option value="text-cyan-400">Cyan</option>
            <option value="text-purple-400">Purple</option>
            <option value="text-pink-400">Pink</option>
          </select>
        </div>

        {/* Add Dish */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Add Stellar Dish</h3>
          <Input
            placeholder="Dish Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
          />
          <Input
            placeholder="Description"
            value={newItem.desc}
            onChange={(e) => setNewItem({ ...newItem, desc: e.target.value })}
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
          />
          <Input
            placeholder="Price"
            type="number"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
          />
          <select
            value={newItem.dietary}
            onChange={(e) => setNewItem({ ...newItem, dietary: e.target.value })}
            className="w-full bg-gray-800 border-gray-700 text-white rounded-md px-3 py-2"
          >
            <option value="">Select Dietary Info (Optional)</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="spicy">Spicy</option>
          </select>
          {error && (
            <p className="text-red-400 text-sm flex items-center">
              <AlertCircle size={16} className="mr-2" />
              {error}
            </p>
          )}
          <Button
            onClick={addItem}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
          >
            <Plus size={20} className="mr-2" />
            Add Dish
          </Button>
        </div>
      </motion.div>

      {/* Right Panel: Live Preview */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col items-center justify-start bg-gray-900/50 backdrop-blur-xl z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={cn(
            "w-full max-w-md p-6 rounded-xl shadow-2xl bg-white/10 backdrop-blur-md border border-white/20",
            font,
            fontColor
          )}
        >
          <h1 className="text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            {title}
          </h1>
          <p className="text-center text-sm mb-6 opacity-80">{description}</p>

          <div className="space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-white/20 py-3 flex flex-col"
              >
                <div className="flex justify-between font-medium">
                  <span>
                    {item.name}{" "}
                    {item.dietary && (
                      <span className="text-xs bg-gray-700 px-2 py-1 rounded-full">
                        {item.dietary}
                      </span>
                    )}
                  </span>
                  <span>₹{item.price.toFixed(2)}</span>
                </div>
                <span className="text-xs opacity-70">{item.desc}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col items-center mt-8">
            {publicUrl ? (
              <>
                <QRCodeCanvas
                  id="qrCode"
                  value={publicUrl}
                  size={256}
                  level="H"
                  includeMargin={true}
                  fgColor="#000000"
                  bgColor="#ffffff"
                  ref={qrRef}
                  className="rounded-md p-4 bg-white shadow-lg"
                />
                <Button
                  onClick={downloadQRCode}
                  className="mt-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                >
                  <Download size={20} className="mr-2" />
                  Download QR Code
                </Button>
                <p className="text-sm text-gray-400 mt-2 text-center">
                  Customers can scan this QR code to view your menu. Place it in your restaurant!
                </p>
                <p className="text-sm text-gray-400 mt-2 text-center flex items-center">
                  <Info size={16} className="mr-2" />
                  QR code link (public):{" "}
                  <a href={publicUrl} className="text-cyan-400 underline ml-1" target="_blank" rel="noopener noreferrer">
                    {publicUrl}
                  </a>
                </p>
              </>
            ) : (
              <p className="text-red-400 text-sm flex items-center">
                <AlertCircle size={16} className="mr-2" />
                Failed to generate QR code. Please check your menu data.
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MakedMenu;