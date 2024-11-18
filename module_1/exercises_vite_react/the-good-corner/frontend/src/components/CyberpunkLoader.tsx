import React from 'react'

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-border rounded-full animate-spin"></div>
        
        {/* Inner ring */}
        <div className="absolute top-1 left-1 w-14 h-14 border-4 border-accent rounded-full animate-spin-reverse"></div>
        
        {/* Center dot */}
        <div className="absolute top-[18px] left-[18px] w-8 h-8 bg-red-500 rounded-full animate-pulse"></div>
        
        {/* Glowing effect */}
        <div className="absolute -inset-1 bg-destructive opacity-30 blur-md animate-pulse"></div>
      </div>
      
      {/* Loading text */}
      <p className="ml-4 text-foreground text-lg font-bold tracking-wider animate-pulse">CHARGEMENT...</p>
    </div>
  )
}

export default Loader