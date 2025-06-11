import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SparklesCoreProps {
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string; // New prop for particle color
}

export const SparklesCore: React.FC<SparklesCoreProps> = ({
  minSize = 0.4,
  maxSize = 1.2,
  particleDensity = 100,
  className,
  particleColor = "#000000", // default to black
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    let animationFrameId: number;
    const particles: {
      x: number;
      y: number;
      size: number;
      velocityX: number;
      velocityY: number;
      opacity: number;
    }[] = [];

    const createParticles = () => {
      if (!canvas) return;
      particles.length = 0;
      const { width, height } = canvas;

      for (let i = 0; i < particleDensity; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: minSize + Math.random() * (maxSize - minSize),
          velocityX: (Math.random() - 0.5) * 0.2,
          velocityY: (Math.random() - 0.5) * 0.2,
          opacity: Math.random(),
        });
      }
    };

    const draw = () => {
      if (!canvas || !context) return;

      // Clear canvas only — don’t paint background
      context.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.velocityX;
        p.y += p.velocityY;

        if (p.x < 0 || p.x > canvas.width) p.velocityX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.velocityY *= -1;

        context.beginPath();
        context.arc(p.x, p.y, p.size, 0, 2 * Math.PI);

        // Use provided particle color
        context.fillStyle = hexToRgba(particleColor, p.opacity);
        context.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, [minSize, maxSize, particleDensity, particleColor]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 h-full w-full", className)}
    />
  );
};

// Helper: convert HEX to rgba
function hexToRgba(hex: string, opacity: number) {
  const bigint = parseInt(hex.replace("#", ""), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
