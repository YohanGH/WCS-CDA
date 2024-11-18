const Hero: React.FC = () => {
  return (
    <section className="flex items-center justify-center min-h-screen bg-background">
      {/* Content Container */}
      <div className="relative border-2 border-border bg-background/40 backdrop-blur-sm p-8">
        {/* Angular Border Frame */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-border -translate-x-1 -translate-y-1" />
        <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-border translate-x-1 -translate-y-1" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-border -translate-x-1 translate-y-1" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-border translate-x-1 translate-y-1" />

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-foreground animate-pulse tracking-wider">
          Bienvenue dans le futur du commerce
        </h1>
      </div>
    </section>
  );
};

export default Hero;
