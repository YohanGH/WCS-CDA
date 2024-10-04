import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../components/ui/Card";
import axios from "axios";
import toast from "react-hot-toast";
import { AdType } from "../types/types";

const apiUrl: string =
  import.meta.env.VITE_APP_API_URL || "http://localhost:3000";

const Ad: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [ad, setAd] = useState<AdType | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const response = await axios.get<AdType>(`${apiUrl}/ads/${id}`);
        setAd(response.data);
      } catch (error) {
        console.error("Error retrieving ad", error);
        setError("Erreur lors du chargement de l'annonce.");
        toast.error("Erreur lors du chargement de l'annonce.");
      } finally {
        setLoading(false);
      }
    };

    fetchAd();
  }, [id]);

  if (loading) {
    return <p>Chargement de l'annonce...</p>; // TODO : Create beautiful components for Loading
  }

  if (error) {
    return <p>{error}</p>; // TODO : Create beautif components for error
  }

  // TODO : Create components for error
  if (!ad) {
    return (
      <div>
        <h1>Annonce non trouvée</h1>
        <button className="button-secondary" onClick={() => navigate("/")}>
          Retourner à l'accueil
        </button>
      </div>
    );
  }

  async function handleDelete() {
    try {
      await axios.delete<AdType>(`${apiUrl}/ads/${id}`);
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <div>
        <h1>Annonce : {ad.title}</h1>
        <p>Détails de l'annonce : {ad.description}</p>
        <div></div>
        <section className="recent-ads">
          <Card
            key={ad.id}
            title={ad.title}
            price={ad.price}
            imageSrc={ad.picture}
            link={`/ads/${ad.id}`}
          />
        </section>
        <button className="button" onClick={handleDelete}>
          Supprimer l'offre
        </button>
      </div>
    </div>
  );
};

export default Ad;
