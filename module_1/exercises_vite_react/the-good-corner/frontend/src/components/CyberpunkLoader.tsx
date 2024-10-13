export default function CyberpunkLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background bg-opacity-80 z-50">
      <div className="relative">
        <div className="w-40 h-40 border-4 border-neon-purple border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-40 h-40 border-4 border-neon-green border-b-transparent rounded-full animate-spin animation-delay-500"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-28 h-28 bg-card bg-opacity-50 rounded-lg transform rotate-45 flex items-center justify-center overflow-hidden">
            <span className="text-neon-blue font-bold text-xl tracking-wider animate-pulse transform -rotate-45">
              LOAD
              <span className="animate-glitch">ING</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}