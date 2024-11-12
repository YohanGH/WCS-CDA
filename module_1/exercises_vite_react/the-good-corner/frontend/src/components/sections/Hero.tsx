import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Hero: React.FC = () => {
  return (
    <>
      <section className="py-20 px-6 bg-primary bg-center">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-8 text-neon-purple animate-pulse">
            Bienvenue dans le futur du commerce
          </h1>
          <div className="max-w-2xl mx-auto flex">
            <Input
              type="search"
              placeholder="Rechercher dans le cyberespace..."
              className="flex-grow bg-card border-neon-purple text-foreground placeholder-muted-foreground"
            />
            <Button className="ml-2 bg-neon-blue hover:bg-neon-green text-foreground">
              Rechercher
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;