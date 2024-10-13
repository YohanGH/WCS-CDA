import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neon-purple bg-primary shadow-lg">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-neon-purple shadow-glow">
              À propos de nous
            </h3>
            <p className="text-sm text-secondary">
              Explorez les rues éclairées au néon de notre marché numérique, où
              l'avenir rencontre l'économie souterraine..
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-neon-purple shadow-glow">
              Liens Rapides
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-neon-purple hover:underline">
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="hover:text-neon-purple hover:underline"
                >
                  Catégories
                </Link>
              </li>
              <li>
                <Link
                  to="/post-ad"
                  className="hover:text-neon-purple hover:underline"
                >
                  Publier une annonce
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-neon-purple shadow-glow">
              Contact
            </h3>
            <p className="text-sm text-secondary">NeoTokyo District, Cyberpunk Avenue 2077</p>
            <p className="text-sm text-secondary">contact@leboncoin-cyber.com</p>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-neon-purple shadow-glow">
              Suivez-nous
            </h3>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-neon-purple hover:text-neon-purple"
              >
                <Github className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-neon-purple hover:text-neon-purple"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-neon-purple hover:text-neon-purple"
              >
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-neon-purple pt-8 text-center text-sm">
          <p className="text-secondary">
            &copy; {currentYear} NeoMarket - Cyberpunk Edition. All rights
            reserved. Developed by{" "}
            <Link
              to="https://github.com/YohanGH"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-neon-purple hover:underline"
            >
              YohanGH
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
