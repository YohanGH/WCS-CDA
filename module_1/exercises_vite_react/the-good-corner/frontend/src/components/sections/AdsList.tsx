import React from "react"
import AdCard from "../AdCard"
import { AdListProps, AdType } from "../../types/types"
import { useQuery } from "@apollo/client"
import toast from "react-hot-toast"
import { GET_ADS } from "@/graphql/ads"
import { Loader2, AlertTriangle } from 'lucide-react'

const AdList: React.FC<AdListProps> = ({ categoryId }) => {
  const { data, loading, error } = useQuery<{ ads: AdType[] }>(GET_ADS, {
    variables: { categoryId },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-and-network",
  })

  const ads = data?.ads || []

  if (loading) {
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
    )
  }

  if (error) {
    console.error("Error retrieving ads", error)
    toast.error("Erreur lors du chargement des annonces.", {
      style: {
        border: '1px solid #ff0000',
        padding: '16px',
        color: '#ff0000',
        background: '#1a0505',
      },
      iconTheme: {
        primary: '#ff0000',
        secondary: '#1a0505',
      },
    })
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-foreground">
        <AlertTriangle className="w-16 h-16 mb-4" />
        <h3 className="text-2xl font-bold mb-2">Erreur système</h3>
        <p className="text-center max-w-md">
          Une erreur est survenue lors du chargement des annonces. Veuillez réessayer ultérieurement.
        </p>
      </div>
    )
  }

  return (
    <section className="py-16 px-6 relative">
      <div className="container mx-auto relative z-10">
        <h2 className="text-4xl font-bold mb-12 text-center text-foreground tracking-wider animate-pulse">
          ANNONCES
        </h2>
        {ads && ads.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ads.map((ad) => (
              <AdCard
                key={ad.id}
                title={ad.title}
                price={ad.price}
                imageSrc={ad.picture}
                link={`/ads/${ad.id}`}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[300px] border-2 border-border bg-background/40 p-8 relative">
            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-border -translate-x-1 -translate-y-1" />
            <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-border translate-x-1 -translate-y-1" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-border -translate-x-1 translate-y-1" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-border translate-x-1 translate-y-1" />
            <h3 className="text-2xl font-bold mb-2 text-accent">ANNONCES INDISPONIBLES</h3>
            <p className="text-center text-foreground">
              Aucune annonce n'est actuellement disponible dans cette catégorie.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default AdList