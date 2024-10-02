import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Category } from "../../types/types";
import axios from "axios";
import toast from "react-hot-toast";

const apiUrl: string =
  import.meta.env.VITE_APP_API_URL || "http://localhost:3000";

const Navigation: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get<Category[]>(`${apiUrl}/category`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error retrieving ads", error);
        toast.error("Erreur lors du chargement des catégories.");
      }
    };

    fetchAds();
  }, []);

  return (
    <nav className="categories-navigation">
      {categories.length > 0 ? (
        categories.map((category) => (
          <React.Fragment key={category.id}>
            <Link
              to={`/category/${category.title}`}
              className="category-navigation-link"
            >
              {category.title}
            </Link>{" "}
            •{" "}
          </React.Fragment>
        ))
      ) : (
        <p>Chargement des catégories...</p>
      )}
    </nav>
  );
};

export default Navigation;
