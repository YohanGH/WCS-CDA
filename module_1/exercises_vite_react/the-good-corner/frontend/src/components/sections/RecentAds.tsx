import React, { useState, useEffect } from "react";
import axios from "axios";
import AdCard from "../AdCard";
import { AdType, AdListProps, CategoryWithAds } from "../../types/types";
import toast from "react-hot-toast";

const apiUrl: string =
  import.meta.env.VITE_APP_API_URL || "http://localhost:3000";

const RecentAds: React.FC<AdListProps> = ({ categoryId }) => {
  const [ads, setAds] = useState<AdType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        let url: string = `${apiUrl}/ads`;

        // If a `categoryId` is provided, we add a filter on the category
        if (categoryId) {
          url = `${apiUrl}/category/${categoryId}`;
          const response = await axios.get<CategoryWithAds>(url);
          const adsData: AdType[] = response.data.ads; // Access ads in the category
          setAds(adsData);
        } else {
          const response = await axios.get<AdType[]>(url);
          setAds(response.data); // Update status with all ads
        }
      } catch (error) {
        console.error("Error retrieving ads", error);
        setError("Erreur lors du chargement des annonces.");
        toast.error("Erreur lors du chargement des Annonces.");
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="loader border-t-4 border-b-4 border-neon-green rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-neon-red">{error}</p>;
  }

  return (
    <section className="py-16 px-6 bg-secondary">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-neon-blue">
          Annonces récentes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ads && ads.length > 0 ? (
            ads.map((ad) => (
              <AdCard
                key={ad.id}
                title={ad.title}
                price={ad.price}
                imageSrc={ad.picture}
                link={`/ads/${ad.id}`}
              />
            ))
          ) : (
            <p className="text-center text-neon-green">
              Aucune annonce disponible !!!
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default RecentAds;
