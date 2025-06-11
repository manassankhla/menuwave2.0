import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { SparklesCore } from "@/Components/ui/sparkles";
import { cn } from "@/lib/utils";

const MenuDisplay = () => {
  const location = useLocation();

  const menuData = useMemo(() => {
    try {
      const params = new URLSearchParams(location.search);
      const encodedData = params.get("data");
      if (!encodedData) {
        console.log("No 'data' parameter found in URL:", location.search);
        return null;
      }
      // Decode the base64 string directly
      const jsonString = atob(encodedData);
      const data = JSON.parse(jsonString);
      console.log("Decoded menu data:", data); // Debug log
      return data;
    } catch (error) {
      console.error("Failed to parse menu data:", error);
      return null;
    }
  }, [location.search]);

  if (!menuData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 flex items-center justify-center">
        <p className="text-white text-xl">
          No menu data found. Please ensure the QR code is valid or contact the restaurant.
        </p>
      </div>
    );
  }

  const { title, description, items, font, fontColor, background } = menuData;
  const isImageUrl = background.startsWith("blob:") || background.startsWith("https") || background.startsWith("data:image");

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
        "min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-6",
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={cn(
          "w-full max-w-md p-6 rounded-xl shadow-2xl bg-white/10 backdrop-blur-md border border-white/20 z-10",
          font,
          fontColor
        )}
      >
        <h1 className="text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
          {title}
        </h1>
        <p className="text-center text-sm mb-6 opacity-80">{description}</p>

        <div className="space-y-4">
          {items.map((item: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-white/20 py-3 flex flex-col"
            >
              <div className="flex justify-between font-medium">
                <span>{item.name}</span>
                <span>₹{item.price.toFixed(2)}</span>
              </div>
              <span className="text-xs opacity-70">{item.desc}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MenuDisplay;