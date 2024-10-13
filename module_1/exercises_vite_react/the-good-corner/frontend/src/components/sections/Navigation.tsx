import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CategoryType } from "../../types/types";
import axios from "axios";
import toast from "react-hot-toast";
import DarkModeToggle from "../DarkModeToggle";

const apiUrl: string =
  import.meta.env.VITE_APP_API_URL || "http://localhost:3000";

const Navigation: React.FC = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<CategoryType[]>(`${apiUrl}/category`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error retrieving ads", error);
        setError("Erreur lors du chargement des catégories.");
        toast.error("Erreur lors du chargement des catégories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-neon-green">
        Chargement des categories...
      </p>
    ); // TODO : Create beautiful components for Loading
  }

  if (error) {
    return <p className="text-center text-destructive">{error}</p>; // TODO : Create beautiful components for error
  }

  return (
    <nav className="border-b border-neon-purple bg-muted backdrop-blur-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <GlitchText className="text-2xl font-bold text-neon-purple">
          <Link to="/">NeoMarket</Link>
        </GlitchText>
        <div className="flex space-x-4">
          <Link
            to="/"
            className="hover:text-neon-green transition-colors duration-300"
          >
            Accueil
          </Link>
          <Link
            to="/categories"
            className="hover:text-neon-green transition-colors duration-300"
          >
            Catégories
          </Link>
          <Link
            to="/post-ad"
            className="button link-button hover:text-neon-green transition-colors duration-300"
          >
            Publier
          </Link>
          <Link
            to="#"
            className="hover:text-neon-green transition-colors duration-300"
          >
            Connexion
          </Link>
          <DarkModeToggle />
        </div>
      </div>
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex space-x-4">
          {categories.length > 0 &&
            categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}/`}
                className="hover:text-neon-green transition-colors duration-300"
              >
                {category.title}
              </Link>
            ))}
        </div>
      </div>
    </nav>
  );
};

const GlitchText = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span
        className="absolute top-0 left-0 -z-10 text-destructive animate-glitch"
        aria-hidden="true"
      >
        {children}
      </span>
      <span
        className="absolute top-0 left-0 -z-20 text-accent animate-glitch"
        aria-hidden="true"
      >
        {children}
      </span>
    </div>
  );
};

export default Navigation;