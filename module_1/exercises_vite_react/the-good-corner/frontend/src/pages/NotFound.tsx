import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


export default function NotFound() {
  const [glitch, setGlitch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
      navigate("/");
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, [navigate]);

  const handleReturnHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 relative overflow-hidden">
      {/* Background code effect */}
      <div className="absolute inset-0 opacity-10 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="text-xs sm:text-sm md:text-base whitespace-nowrap overflow-hidden"
            style={{ animation: `scrollText ${20 + i * 5}s linear infinite` }}
          >
            {`const cyber${i} = () => { return "404 Not Found" };`.repeat(10)}
          </div>
        ))}
      </div>

      <div className="text-center z-10">
        <motion.h1
          className={`text-6xl sm:text-8xl font-bold mb-4 ${
            glitch ? "animate-glitch" : ""
          }`}
          style={{ fontFamily: "'Orbitron', sans-serif" }}
          animate={{
            textShadow: glitch
              ? [
                  "0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff",
                  "0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff",
                  "0 0 10px #ffff00, 0 0 20px #ffff00, 0 0 30px #ffff00",
                ]
              : "0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff",
          }}
          transition={{ duration: 0.2, repeat: glitch ? 2 : 0 }}
        >
          404
        </motion.h1>
        <p className="text-xl sm:text-2xl mb-8 text-cyan-400">
          Signal perdu dans le cyberespace
        </p>
        <Button
          variant="outline"
          className="px-6 py-3 bg-transparent border-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-all duration-300 rounded-md font-semibold text-lg"
          onClick={handleReturnHome}
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Retour à la matrice
        </Button>
      </div>

      {/* Neon lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-50"></div>
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-purple-500 opacity-50"></div>
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-purple-500 to-cyan-500 opacity-50"></div>
      </div>
    </div>
  );
}
