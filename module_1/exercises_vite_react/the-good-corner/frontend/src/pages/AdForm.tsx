import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import styles from "../style/AdForm.module.css";
import { Category, Tag } from "../types/types";

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
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  const [loadingTags, setLoadingTags] = useState<boolean>(true);

  const currentDate = new Date().toISOString();

  // Recovery of existing categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>(`${apiUrl}/category`);
        setCategories(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories", error);
        toast.error("Erreur lors du chargement des catégories.");
      } finally {
        setLoadingCategories(false); // Stop loading
      }
    };

    fetchCategories();
  }, []);

  // Recovery of existing tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get<Tag[]>(`${apiUrl}/tag`);
        setTags(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des tags", error);
        toast.error("Erreur lors du chargement des tags.");
      } finally {
        setLoadingTags(false); // Stop loading
      }
    };

    fetchTags();
  }, []);

  const validateForm = () => {
    if (!title || !price || !description || !category || !imageURL) {
      return "Tous les champs sont obligatoires.";
    }

    if (isNaN(Number(price))) {
      return "Le prix doit être un nombre valide.";
    }

    if (Number(price) <= 0) {
      return "Le prix doit être supérieur à zéro.";
    }

    if (!imageURL.startsWith("http") || !imageURL.startsWith("https")) {
      return "L'URL de l'image doit être valide.";
    }

    return null;
  };
  
  // Manage tag selection/deselection
const handleTagToggle = (tagId: number) => {
  setSelectedTags((prevTags) =>
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
      } else {
        toast.error("Erreur lors de la création de l'annonce.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Créer une annonce</h1>
      <meta
        name="description"
        content="Créez une annonce sur notre plateforme pour vendre vos produits rapidement."
      />
      <meta name="robots" content="index, follow" />

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Titre de l'annonce</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={100}
            placeholder="Entrez un titre descriptif"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="title">Nom du vendeur</label>
          <input
            type="text"
            id="owner"
            name="owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            required
            maxLength={100}
            placeholder="Entrez votre nom"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="price">Prix (€)</label>
          <input
            type="text"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
            placeholder="Entrez le prix"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            maxLength={500}
            placeholder="Entrez une description détaillée"
            className={styles.textarea}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="location ">Localisation</label>
          <input
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            maxLength={500}
            placeholder="Entrez une localisation"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="category">Catégorie</label>
          {loadingCategories ? (
            <p>Chargement des catégories...</p>
          ) : (
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(Number(e.target.value))}
              required
              className={styles.select}
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

        <div className={styles.formGroup}>
          <label htmlFor="tags">Tags</label>
          {loadingTags ? (
            <p>Chargement des tags...</p>
          ) : (
            <div className={styles.tagsContainer}>
              {tags.map((tag) => (
                <div key={tag.id} className={styles.tagItem}>
                  <input
                    type="checkbox"
                    id={`tag-${tag.id}`}
                    value={tag.id}
                    checked={selectedTags.includes(tag.id)}
                    onChange={() => handleTagToggle(tag.id)}
                  />
                  <label htmlFor={`tag-${tag.id}`}>{tag.title}</label>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="picture">URL de l'image</label>
          <input
            type="url"
            id="imageURL"
            name="imageURL"
            onChange={(e) => setImageURL(e.target.value)}
            required
            placeholder="Entre l'URL de l'image"
            className={styles.input}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Créer l'annonce
        </button>
      </form>
    </div>
  );
};

export default AdForm;
