import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_AD, GET_AD } from "@/graphql/ads";
import { AdType } from "../types/types";
import { Trash2, AlertTriangle, ShoppingCart, Plus, Minus } from "lucide-react";
import toast from "react-hot-toast";
import Loading from "@/components/ui/loading";

const Ad: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const numericId = parseInt(id || "0", 10);

  const [typedDescription, setTypedDescription] = useState("");

  const { data, loading, error } = useQuery<{ ad: AdType }>(GET_AD, {
    variables: { id: numericId },
    fetchPolicy: "cache-and-network",
  });

  const [deleteAd] = useMutation(DELETE_AD, {
    variables: { id: numericId },
    onCompleted: () => {
      toast.success("Annonce supprimée avec succès !", {
        style: {
          border: "1px solid #ff0000",
          padding: "16px",
          color: "#ff0000",
          background: "#1a0505",
        },
        iconTheme: {
          primary: "#ff0000",
          secondary: "#1a0505",
        },
      });
      navigate("/", { replace: true });
    },
    onError: (error) => {
      console.error("Erreur lors de la suppression", error);
      toast.error("Erreur lors de la suppression de l'annonce.", {
        style: {
          border: "1px solid #ff0000",
          padding: "16px",
          color: "#ff0000",
          background: "#1a0505",
        },
        iconTheme: {
          primary: "#ff0000",
          secondary: "#1a0505",
        },
      });
    },
  });

  useEffect(() => {
    if (data?.ad) {
      let descIndex = 0;

      const descInterval = setInterval(() => {
        if (descIndex <= data.ad.description.length) {
          setTypedDescription(data.ad.description.slice(0, descIndex));
          descIndex++;
        } else {
          clearInterval(descInterval);
        }
      }, 20);

      return () => {
        clearInterval(descInterval);
      };
    }
  }, [data]);

  if (loading) {
    return <Loading />;
  }

  const ad = data?.ad;

  if (error || !ad) {
    return (
      <div className="min-h-screen flex items-center justify-center text-primary">
        <div className="text-center space-y-4">
          <AlertTriangle className="w-16 h-16 mx-auto" />
          <h1 className="text-2xl font-bold">ERREUR</h1>
          <p className="text-accent">Impossible de charger l'annonce.</p>
          <button
            onClick={() => navigate("/")}
            className="text-foreground px-6 py-2 mt-4 bg-primary-foreground border border-primary rounded hover:bg-primary transition-colors"
          >
            Retour à la matrice
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-foreground">
      {/* Navigation Bar */}
      <div className="border-b border-red-900/50">
        <div className="container mx-auto flex items-center overflow-x-auto">
          {["MODULE", "DRIVER", "CIRCUIT", "SENSOR", "NODE", "CORE"].map(
            (item, index) => (
              <button
                key={item}
                className={`px-6 py-3 flex items-center space-x-2 border-r border-red-900/50 hover:bg-red-950/30 transition-colors ${
                  index === 0 ? "bg-red-950/50" : ""
                }`}
              >
                <span>{item}</span>
                <span className="text-primary">0{index + 1}</span>
              </button>
            )
          )}
          <div className="ml-auto flex items-center px-4 border-l border-red-900/50">
            <span className="text-xl font-bold">+30</span>
            <button className="ml-4 px-4 py-1 bg-red-900/50 rounded">
              MORE
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Details */}
        <div className="space-y-6 font-mono">
          <h1 className="text-4xl font-bold tracking-wider">{ad.title}</h1>

          <div className="space-y-4 text-foreground">
            <p className="leading-relaxed">{typedDescription}</p>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <InfoBlock label="PRIX" value={`${ad.price} €`} />
              <InfoBlock label="VENDEUR" value={ad.owner} />
              <InfoBlock label="LOCALISATION" value={ad.location || "N/A"} />
            </div>

            <div className="mt-4">
              <h3 className="text-sm text-primary mb-2">CATEGORIE</h3>
              <div className="flex flex-wrap gap-2">{ad.category?.title}</div>
            </div>

            <div className="mt-4">
              <h3 className="text-sm text-primary mb-2">TAGS</h3>
              <div className="flex flex-wrap gap-2">
                {ad.tags?.map((tag, index) => (
                  <span
                    key={tag.id}
                    className="px-2 py-1 bg-red/30 border border-border rounded text-xs"
                  >
                    <span className="text-primary pr-4">0{index + 1} |</span>
                    <span>{tag.title}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => {
                // Add to cart logic here
                toast.success("Produit ajouté au panier!", {
                  style: {
                    border: "1px solid #00ff00",
                    padding: "16px",
                    color: "#00ff00",
                    background: "#1a0505",
                  },
                  iconTheme: {
                    primary: "#00ff00",
                    secondary: "#1a0505",
                  },
                });
              }}
              className="w-full mt-6 px-6 py-3 bg-red-900/50 border border-border rounded flex items-center justify-center space-x-2 hover:bg-red-800/30 transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>AJOUTER AU PANIER</span>
            </button>

            {/* Delete Ad Button */}
            <button
              onClick={() => deleteAd()}
              className="w-full mt-6 px-6 py-3 bg-red-900/50 border border-border rounded flex items-center justify-center space-x-2 hover:bg-red-800/30 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>SUPPRIMER L'OFFRE</span>
            </button>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="relative">
          <div className="aspect-square relative">
            <img
              src={ad.picture}
              alt={ad.title}
              className="w-full h-full object-cover rounded"
            />
            {/* Technical Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-transparent pointer-events-none" />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  'url(\'data:image/svg+xml,%3Csvg width="20" height="20" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h20v20H0z" fill="none" stroke="rgba(255,0,0,0.1)" stroke-width="0.5"/%3E%3C/svg%3E\')',
              }}
            />

            {/* Corner Decorations */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-border" />
            <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-border" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-border" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-border" />
          </div>

          {/* Control Buttons */}
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 space-y-2">
            <button className="w-8 h-8 bg-red-900/50 border border-border flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 bg-red-900/50 border border-border flex items-center justify-center">
              <Minus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoBlock: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="bg-red-900/30 p-4 border border-border">
    <div className="text-sm text-primary">{label}</div>
    <div className="text-xl">{value}</div>
  </div>
);

export default Ad;
