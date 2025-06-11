import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import * as React from "react";

export function LampContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0D0D0D]", className)}>
      <motion.div
        initial={{ width: 0, height: 0 }}
        animate={{
          width: 800,
          height: 800,
          transition: {
            duration: 1,
            ease: "easeInOut",
          },
        }}
        className="absolute z-0 rounded-full bg-[#CBACFF] blur-[150px]"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
