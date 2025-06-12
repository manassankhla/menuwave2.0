import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/Components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/Components/ui/hover-card";
import { SparklesCore } from "@/Components/ui/sparkles";

const Hero = () => {
  const navigate = useNavigate();

  const handleChooseTemplate = () => {
    navigate("/templates");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Background Particles */}
      <SparklesCore
        className="absolute inset-0 z-0"
        particleDensity={200}
        minSize={0.3}
        maxSize={3.0}
        particleColor="#000000" // Make sparkles black
      />

      <motion.div
        className="relative z-20 flex flex-col justify-center min-h-screen px-4 sm:px-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left: 3D Logo */}
          <motion.div
            variants={itemVariants}
            className="w-full flex justify-center lg:justify-start"
          >
            <motion.div
              initial={{ rotateY: -10 }}
              whileHover={{ scale: 1.05, rotateY: 10 }}
              animate={{ rotateX: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              onMouseMove={(e) => {
                const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - left;
                const y = e.clientY - top;
                const rotateX = ((y - height / 2) / height) * -20;
                const rotateY = ((x - width / 2) / width) * 20;
                e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `perspective(1000px) rotateX(0deg) rotateY(-10deg)`;
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <img src="/menuhero.png" alt="Menu" width={700} height={700} />
            </motion.div>
          </motion.div>

          {/* Right: Text & CTA */}
          <motion.div
            className="text-right w-full max-w-xl"
            variants={itemVariants}
          >
   <div className="mt-2">
  {/* Subtitle */}
  <div className="flex justify-end gap-2 items-center mb-2">
    <span className="text-lg font-medium text-gray-800">
      Next-Gen Digital Menus
    </span>
  </div>

  {/* Title with logo */}
  <motion.h1
    className="flex items-center justify-end text-6xl sm:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-700 to-black"
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <img className="h-25 w-25 mr-4" src="/menuwaveimage.png" alt="Logo" />
    MenuWave
  </motion.h1>
</div>

            <p className="mt-6 text-xl sm:text-2xl text-gray-700 leading-relaxed">
              Transform your restaurant with stunning, interactive QR code menus
              that captivate customers, boost sales, and promote sustainability.
            </p>

            <p className="mt-4 text-base text-gray-600">
              Say goodbye to paper menus — go 100% digital, reduce waste, and
              enhance the dining experience with contactless convenience.
            </p>

            <div className="mt-10 text-right">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button
                    onClick={handleChooseTemplate}
                    size="lg"
                    className="group relative px-8 py-6 text-lg font-semibold bg-gradient-to-r from-[#5B274D] to-[#852F4C] hover:from-[#852F4C] hover:to-[#F7374F] border-0 rounded-2xl shadow-xl hover:shadow-[#F7374F]/40 transition-all duration-300 text-white"
                  >
                    <motion.span
                      className="flex items-center gap-3"
                      whileHover={{ x: 6 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Sparkles className="w-5 h-5" />
                      Choose Template
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.span>

                    {/* Animated Glow */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#5B274D] to-[#F7374F] blur-lg opacity-20"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.4, 0.2],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 bg-white border border-[#F7374F]/40 shadow-lg backdrop-blur-sm" sideOffset={10}>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-900">
                      🚀 Ready to Launch?
                    </h4>
                    <p className="text-sm text-gray-700">
                      Browse our collection of stunning menu templates designed for
                      restaurants, cafes, food trucks, and more!
                    </p>
                    <div className="flex items-center gap-2 text-xs text-[#F7374F]">
                      <Sparkles className="w-3 h-3" />
                      <span>Customizable • Mobile Ready • Interactive</span>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-gray-500"
        >
         
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
