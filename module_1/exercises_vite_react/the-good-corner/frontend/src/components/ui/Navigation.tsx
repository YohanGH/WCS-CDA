import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CategoryType } from "../../types/types";
import axios from "axios";
import toast from "react-hot-toast";

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
    return <p>Chargement des categories...</p>; // TODO : Create beautiful components for Loading
  }

  if (error) {
    return <p>{error}</p>; // TODO : Create beautif components for error
  }

  return (
    <nav className="categories-navigation">
      {categories.length > 0 ? (
        categories.map((category) => (
          <React.Fragment key={category.id}>
            <Link
              to={`/category/${category.id}/`}
              className="category-navigation-link"
            >
              {category.title}
            </Link>{" "}
            •{" "}
          </React.Fragment>
        ))
      ) : (
        <p>Aucune catégorie disponible</p>
      )}
    </nav>
  );
};

export default Navigation;
