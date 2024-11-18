'use client'

import React, { useState } from "react"
import toast from "react-hot-toast"
import { CategoryType, Tag } from "../types/types"
import { useNavigate } from "react-router-dom"
import { useMutation, useQuery } from "@apollo/client"
import { GET_CATEGORIES } from "@/graphql/categories"
import { GET_TAGS } from "@/graphql/tags"
import { CREATE_AD } from "@/graphql/ads"
import { Loader2, AlertTriangle } from 'lucide-react'

const AdForm: React.FC = () => {
  const [title, setTitle] = useState<string>("")
  const [owner, setOwner] = useState<string>("")
  const [price, setPrice] = useState<number>()
  const [description, setDescription] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [category, setCategory] = useState<number>()
  const [selectedTags, setSelectedTags] = useState<number[]>([])
  const [imageURL, setImageURL] = useState<string>("")

  const navigate = useNavigate()
  const currentDate = new Date().toISOString()

  const { data: categoriesData, loading: loadingCategories, error: categoriesError } = useQuery<{ categories: CategoryType[] }>(GET_CATEGORIES, {
    fetchPolicy: "network-only"
  })
  const { data: tagsData, loading: loadingTags, error: tagsError } = useQuery<{ tags: Tag[] }>(GET_TAGS, {
    fetchPolicy: "network-only"
  })

  const [createAd, { loading: creatingAd }] = useMutation(CREATE_AD)

  const categories = categoriesData?.categories || []
  const tags = tagsData?.tags || []

  if (categoriesError || tagsError) {
    toast.error("Une erreur est survenue lors de la récupération des catégories ou des tags.", {
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
    console.error("Error retrieving categories", categoriesError)
    console.error("Error retrieving tags", tagsError)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a0505] text-accent">
        <AlertTriangle className="w-16 h-16 mb-4" />
        <h3 className="text-2xl font-bold mb-2">Erreur système</h3>
        <p className="text-center max-w-md">
          Une erreur est survenue lors du chargement des données. Veuillez réessayer ultérieurement.
        </p>
      </div>
    )
  }

  const validateForm = () => {
    if (!title || !price || !description || !category || !imageURL) {
      return "Tous les champs sont obligatoires."
    }

    if (!price || isNaN(price) || Number(price) <= 0) {
      return "Le prix doit être un nombre valide supérieur à zéro."
    }

    if (!imageURL.startsWith("http") && !imageURL.startsWith("https")) {
      return "L'URL de l'image doit être valide."
    }

    return null
  }

  const handleTagToggle = (tagId: number) => {
    setSelectedTags(
      (prevTags) =>
        prevTags.includes(tagId)
          ? prevTags.filter((id) => id !== tagId)
          : [...prevTags, tagId]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationError = validateForm()
    if (validationError) {
      toast.error(validationError, {
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
      return
    }

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
    }

    try {
      const { data } = await createAd({
        variables: { input: adData },
      })

      if (data?.status === 201) {
        toast.success("Annonce créée avec succès !", {
          style: {
            border: '1px solid #00ff00',
            padding: '16px',
            color: '#00ff00',
            background: '#1a0505',
          },
          iconTheme: {
            primary: '#00ff00',
            secondary: '#1a0505',
          },
        })
        setTitle("")
        setOwner("")
        setPrice(undefined)
        setDescription("")
        setLocation("")
        setCategory(undefined)
        setSelectedTags([])
        setImageURL("")

        navigate(`/ads/${data.createdAdId}`, { replace: true })
      } else {
        toast.error("Erreur lors de la création de l'annonce.", {
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
      }
    } catch (error) {
      console.log(error)
      toast.error("Une erreur est survenue. Veuillez réessayer.", {
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
    }
  }

  return (
    <div className="min-h-screen text-red-400 p-8 relative overflow-hidden">
      <div className="relative z-10">
        <h1 className="text-4xl font-bold mb-8 text-center text-foreground tracking-wider animate-pulse">
          CRÉER UNE ANNONCE
        </h1>
        <meta name="description" content="Publiez un produit ou service rapidement." />
        <meta name="robots" content="index, follow" />

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          <FormField label="Titre de l'annonce" id="title">
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={100}
              placeholder="Entrez un titre descriptif"
              className="w-full bg-input border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder-accent-foreground"
            />
          </FormField>

          <FormField label="Nom du vendeur" id="owner">
            <input
              type="text"
              id="owner"
              name="owner"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              required
              maxLength={100}
              placeholder="Entrez votre nom"
              className="w-full bg-input border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder-accent-foreground"
            />
          </FormField>

          <FormField label="Prix (€)" id="price">
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
              placeholder="Entrez le prix"
              className="w-full bg-input border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder-accent-foreground"
            />
          </FormField>

          <FormField label="Description" id="description">
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              maxLength={500}
              placeholder="Entrez une description détaillée"
              className="w-full bg-input border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder-accent-foreground"
            />
          </FormField>

          <FormField label="Localisation" id="location">
            <input
              id="location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              maxLength={500}
              placeholder="Entrez une localisation"
              className="w-full bg-input border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder-accent-foreground"
            />
          </FormField>

          <FormField label="Catégorie" id="category">
            {loadingCategories ? (
              <div className="flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-accent animate-spin" />
              </div>
            ) : (
              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(Number(e.target.value))}
                required
                className="w-full bg-input border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
              >
                <option value="">Sélectionnez une catégorie</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
            )}
          </FormField>

          <FormField label="Tags" id="tags">
            {loadingTags ? (
              <div className="flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-accent animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {tags.map((tag) => (
                  <label key={tag.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`tag-${tag.id}`}
                      value={tag.id}
                      checked={selectedTags.includes(tag.id)}
                      onChange={() => handleTagToggle(tag.id)}
                      className="form-checkbox text-accent border-border bg-input"
                    />
                    <span className="text-red-400">{tag.title}</span>
                  </label>
                ))}
              </div>
            )}
          </FormField>

          <FormField label="URL de l'image" id="imageURL">
            <input
              type="url"
              id="imageURL"
              name="imageURL"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              required
              placeholder="Entrez l'URL de l'image"
              className="w-full bg-input border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder-accent-foreground"
            />
          </FormField>

          <button
            type="submit"
            disabled={creatingAd}
            className="w-full bg-primary-foreground text-foreground font-bold py-2 px-4 rounded hover:bg-primary transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
          >
            {creatingAd ? (
              <div className="flex items-center justify-center">
                <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                Création en cours...
              </div>
            ) : (
              "Créer l'annonce"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

const FormField: React.FC<{ label: string; id: string; children: React.ReactNode }> = ({ label, id, children }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="block text-foreground font-semibold">
      {label}
    </label>
    {children}
  </div>
)

export default AdForm