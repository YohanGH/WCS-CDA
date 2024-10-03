import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../ui/Card";
import { Ad, AdListProps } from "../../types/types";
import toast from "react-hot-toast";

const apiUrl: string =
  import.meta.env.VITE_APP_API_URL || "http://localhost:3000";

const AdList: React.FC<AdListProps> = ({ onAddToCart }) => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get<Ad[]>(`${apiUrl}/ads`);
        setAds(response.data);
      } catch (error) {
        console.error("Error retrieving ads", error);
        setError("Erreur lors du chargement des annonces.");
        toast.error("Erreur lors du chargement des Annonces.");
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  if (loading) {
    return <p>Chargement des annonces...</p>; // TODO : Create beautiful components for Loading
  }

  if (error) {
    return <p>{error}</p>; // TODO : Create beautif components for error
  }

  return (
    <section className="recent-ads">
      {ads && ads.length > 0 ? (
        ads.map((ad) => (
          <Card
            key={ad.id}
            title={ad.title}
            price={ad.price}
            imageSrc={ad.picture}
            link={`/ads/${ad.id}`}
            onAddToCart={() => onAddToCart(ad.price)}
          />
        ))
      ) : (
        <p>Aucune annonce disponible</p>
      )}
    </section>
  );
};

export default AdList;
