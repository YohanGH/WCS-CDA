import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { CategoryType, Tag } from "../types/types";
import { useNavigate } from "react-router-dom";

const apiUrl: string =
  import.meta.env.VITE_APP_API_URL || "http://localhost:3000";

const AdForm: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [owner, setOwner] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [category, setCategory] = useState<number>();
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [imageURL, setImageURL] = useState<string>("");

  // State to store categories and tag
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  const [loadingTags, setLoadingTags] = useState<boolean>(true);

  const navigate = useNavigate();
  const currentDate = new Date().toISOString();

  // Recovery of existing categories and tags
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, tagsResponse] = await Promise.all([
          axios.get<CategoryType[]>(`${apiUrl}/category`),
          axios.get<Tag[]>(`${apiUrl}/tag`),
        ]);

        setCategories(categoriesResponse.data);
        setTags(tagsResponse.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
        toast.error("Erreur lors du chargement des données.");
      } finally {
        setLoadingCategories(false);
        setLoadingTags(false);
      }
    };

    fetchData();
  }, []);

  const validateForm = () => {
    if (!title || !price || !description || !category || !imageURL) {
      return "Tous les champs sont obligatoires.";
    }

    if (!price || isNaN(price) || Number(price) <= 0) {
      return "Le prix doit être un nombre valide supérieur à zéro.";
    }

    if (!imageURL.startsWith("http") && !imageURL.startsWith("https")) {
      return "L'URL de l'image doit être valide.";
    }

    return null;
  };

  // Manage tag selection/deselection
  const handleTagToggle = (tagId: number) => {
    setSelectedTags(
      (prevTags) =>
        prevTags.includes(tagId)
          ? prevTags.filter((id) => id !== tagId) // unselected
          : [...prevTags, tagId] // selected
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError); // Displaying an error with react-hot-toast
      return;
    }

    // Prepare data for dispatch
    const adData = {
      title,
      owner,
      price,
      description,
      location,
      category: { id: category },
      tags: selectedTags.map((tagId) => ({ id: tagId })),
      picture: imageURL,
      createdAt: currentDate,
    };

    try {
      const response = await axios.post(`${apiUrl}/ads`, adData, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 201) {
        toast.success("Annonce créée avec succès !");
        setTitle("");
        setOwner("");
        setPrice(undefined);
        setDescription("");
        setLocation("");
        setCategory(undefined);
        setSelectedTags([]);
        setImageURL("");

        // Redirect after success
        const createdAdId = response.data.id;
        navigate(`ads/${createdAdId}`, { replace: true });
      } else {
        toast.error("Erreur lors de la création de l'annonce.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-black text-neon-blue p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-neon-pink glitch-text">
        Créer une annonce
      </h1>
      <meta
        name="description"
        content="Créez une annonce sur notre plateforme pour vendre vos produits rapidement."
      />
      <meta name="robots" content="index, follow" />

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-neon-green">
            Titre de l'annonce
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={100}
            placeholder="Entrez un titre descriptif"
            className="w-full bg-gray-800 border border-neon-blue rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neon-pink"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="title" className="block text-neon-green">
            Nom du vendeur
          </label>
          <input
            type="text"
            id="owner"
            name="owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            required
            maxLength={100}
            placeholder="Entrez votre nom"
            className="w-full bg-gray-800 border border-neon-blue rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neon-pink"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="price" className="block text-neon-green">
            Prix (€)
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
            placeholder="Entrez le prix"
            className="w-full bg-gray-800 border border-neon-blue rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neon-pink"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-neon-green">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            maxLength={500}
            placeholder="Entrez une description détaillée"
            className="w-full bg-gray-800 border border-neon-blue rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neon-pink"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="location" className="block text-neon-green">
            Localisation
          </label>
          <input
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            maxLength={500}
            placeholder="Entrez une localisation"
            className="w-full bg-gray-800 border border-neon-blue rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neon-pink"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="block text-neon-green">
            Catégorie
          </label>
          {loadingCategories ? (
            <p>Chargement des catégories...</p>
          ) : (
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(Number(e.target.value))}
              required
              className="w-full bg-gray-800 border border-neon-blue rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neon-pink"
            >
              <option value="">Sélectionnez une catégorie</option>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))
              ) : (
                <p>Aucune catégorie disponible</p>
              )}
            </select>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="tags" className="block text-neon-green">
            Tags
          </label>
          {loadingTags ? (
            <p>Chargement des tags...</p>
          ) : (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                {tags.map((tag) => (
                  <label key={tag.id} className="grid grid-cols-2 gap-2">
                    <input
                      type="checkbox"
                      id={`tag-${tag.id}`}
                      value={tag.id}
                      checked={selectedTags.includes(tag.id)}
                      onChange={() => handleTagToggle(tag.id)}
                      className="form-checkbox text-neon-pink"
                    />
                    <label
                      htmlFor={`tag-${tag.id}`}
                      className="flex items-center space-x-2"
                    >
                      {tag.title}
                    </label>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="picture" className="block text-neon-green">
            URL de l'image
          </label>
          <input
            type="url"
            id="imageURL"
            name="imageURL"
            onChange={(e) => setImageURL(e.target.value)}
            required
            placeholder="Entre l'URL de l'image"
            className="w-full bg-gray-800 border border-neon-blue rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neon-pink"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-neon-pink text-black font-bold py-2 px-4 rounded hover:bg-neon-blue transition duration-300 ease-in-out transform hover:scale-105"
        >
          Créer l'annonce
        </button>
      </form>
    </div>
  );
};

export default AdForm;
