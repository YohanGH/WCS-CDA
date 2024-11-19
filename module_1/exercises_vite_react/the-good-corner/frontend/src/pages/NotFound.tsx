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
    <div className="min-h-screen flex items-center justify-center text-foreground relative overflow-hidden bg-background">
      {/* Background code effect */}
      <div className="absolute inset-0 opacity-30 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="text-xs sm:text-sm md:text-base whitespace-nowrap overflow-hidden"
            style={{ animation: `scrollText ${20 + i * 5}s linear infinite` }}
          >
            {`const _haker medusa${i} = () => { return "404 Not Found" };`.repeat(10)}
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
                  "0 0 10px #FF0000, 0 0 20px #FF0000, 0 0 30px #380818",
                  "0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff",
                  "0 0 10px #FF0000, 0 0 20px #FF0000, 0 0 30px #380818",
                ]
              : "0 0 10px #FF0000, 0 0 20px #FF0000, 0 0 30px #380818",
          }}
          transition={{ duration: 0.2, repeat: glitch ? 2 : 0 }}
        >
          404
        </motion.h1>
        <p className="text-xl sm:text-3xl mb-8 text-foreground">
          Signal perdu dans le cyberespace
        </p>
        <Button
          variant="outline"
          className="px-6 py-3 bg-transparent border-2 border-border text-foreground hover:bg-destructive transition-all duration-300 rounded-md font-semibold text-lg"
          onClick={handleReturnHome}
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Retour à la matrice
        </Button>
      </div>
    </div>
  );
}
