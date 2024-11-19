import React, { useState, useMemo } from "react";
import AdCard from "../AdCard";
import { AdListProps, AdType } from "../../types/types";
import { useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import { GET_ADS, GET_TOTAL_ADS } from "@/graphql/ads";
import { Loader2, AlertTriangle } from "lucide-react";

const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
}> = ({ currentPage, totalPages, onNext, onPrev }) => (
  <div className="flex justify-between items-center mt-6">
    <button
      onClick={onPrev}
      disabled={currentPage === 1}
      className="px-4 py-2 bg-border text-foreground rounded disabled:opacity-50"
    >
      Précédent
    </button>
    <span className="text-ml text-foreground">
      Page {currentPage} / {totalPages}
    </span>
    <button
      onClick={onNext}
      disabled={currentPage === totalPages}
      className="px-4 py-2 bg-border text-foreground rounded disabled:opacity-50"
    >
      Suivant
    </button>
  </div>
);

const ITEMS_PER_PAGE = 3; // Number of items per page

const AdList: React.FC<AdListProps> = ({ categoryId }) => {
  const [page, setPage] = useState(1);

  const { data: adsData, loading: adsLoading, error: adsError } = useQuery<{ ads: AdType[]; total: number }>(
    GET_ADS,
    {
      variables: {
        categoryId,
        limit: ITEMS_PER_PAGE,
        offset: (page - 1) * ITEMS_PER_PAGE,
      },
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-and-network",
    }
  );

  const { data: totalData, loading: totalLoading, error: totalError } = useQuery(GET_TOTAL_ADS, {
    variables: { categoryId },
  });

  const totalAds = totalData?.totalAds || 0;
  const totalPages = Math.ceil(totalAds / ITEMS_PER_PAGE);

  const ads = useMemo(() => adsData?.ads || [], [adsData]);

  const handleNextPages = () =>
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  const handlePreviousPages = () =>
    setPage((prevPage) => Math.max(prevPage - 1, 1));

  if (adsLoading || totalLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="relative border-2 border-border bg-background/40 p-8">
          <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-border -translate-x-1 -translate-y-1" />
          <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-border translate-x-1 -translate-y-1" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-border -translate-x-1 translate-y-1" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-border translate-x-1 translate-y-1" />
          <Loader2 className="w-12 h-12 text-foreground animate-spin" />
        </div>
      </div>
    );
  }

  if (adsError || totalError) {
    console.error("Error retrieving ads", adsError || totalError);
    toast.error("Erreur lors du chargement des annonces.", {
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
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-foreground">
        <AlertTriangle className="w-16 h-16 mb-4" />
        <h3 className="text-2xl font-bold mb-2">Erreur système</h3>
        <p className="text-center max-w-md">
          Une erreur est survenue lors du chargement des annonces. Veuillez
          réessayer ultérieurement.
        </p>
      </div>
    );
  }

  return (
    <section className="py-16 px-6 relative">
      <div className="container mx-auto relative z-10">
        <h2 className="text-4xl font-bold mb-12 text-center text-foreground tracking-wider animate-pulse">
          ANNONCES
        </h2>
        {ads && ads.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ads.map((ad: AdType) => (
                <AdCard
                  key={ad.id}
                  title={ad.title}
                  price={ad.price}
                  imageSrc={ad.picture}
                  link={`/ads/${ad.id}`}
                />
              ))}
            </div>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onNext={handleNextPages}
              onPrev={handlePreviousPages}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[300px] border-2 border-border bg-background/40 p-8 relative">
            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-border -translate-x-1 -translate-y-1" />
            <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-border translate-x-1 -translate-y-1" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-border -translate-x-1 translate-y-1" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-border translate-x-1 translate-y-1" />
            <h3 className="text-2xl font-bold mb-2 text-accent">
              ANNONCES INDISPONIBLES
            </h3>
            <p className="text-center text-foreground">
              Aucune annonce n'est actuellement disponible dans cette catégorie.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdList;
