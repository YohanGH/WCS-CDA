import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../ui/Card";
import { Ad } from "../../types/types";
import toast from "react-hot-toast";

const apiUrl: string = import.meta.env.VITE_APP_API_URL || "http://localhost:3000";

interface AdListProps {
  onAddToCart: (price: number) => void;
}

const AdList: React.FC<AdListProps> = ({ onAddToCart }) => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get<Ad[]>(`${apiUrl}/ads`);
        setAds(response.data);

      } catch (error) {
        console.error("Error retrieving ads", error);
        toast.error("Erreur lors du chargement des Annonces.");
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  return (
    <section className="recent-ads">
      {loading ? (
        <p>Chargement des annonces...</p>
      ) : ads && ads.length > 0 ? (
        ads.map((ad, index) => (
          <Card
            key={index}
            title={ad.title}
            price={ad.price}
            imageSrc={ad.picture}
            link={`/ads/${ad.title}`}
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
