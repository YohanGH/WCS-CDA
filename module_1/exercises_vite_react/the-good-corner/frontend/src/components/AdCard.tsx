import React from 'react'
import { Link } from "react-router-dom"
import { CardProps } from "../types/types"
import { useCart } from "../hooks/useCart"
import toast from "react-hot-toast"
import { ShoppingCart } from 'lucide-react'

const AdCard: React.FC<CardProps> = ({ title, price, imageSrc, link }) => {
  const { onAddToCart } = useCart()

  const handleAddToCart = () => {
    onAddToCart(price)
    toast.success(`Ajouté ${title} au panier pour ${price.toFixed(2)}€`, {
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

  return (
    <div className="relative bg-background border border-primary-foreground overflow-hidden shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-red-500/50">
      <Link className="block" to={link}>
        <div className="relative">
          <img
            className="w-full h-48 object-cover"
            src={imageSrc}
            alt={title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2 text-foreground">
            {title}
          </h3>
          <p className="text-foreground mb-4">
            Description courte du produit avec des termes futuristes...
          </p>
          <div className="flex justify-between items-center">
            <span className="text-destructive font-mono text-lg">
              {price.toFixed(2)} €
            </span>
            <button
              className="bg-primary-foreground text-red-100 px-4 py-2 rounded flex items-center space-x-2 hover:bg-red-700 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              onClick={(e) => {
                e.preventDefault()
                handleAddToCart()
              }}
            >
              <ShoppingCart size={18} />
              <span>Ajouter au panier</span>
            </button>
          </div>
        </div>
      </Link>
      {/* Glitch effect overlay */}
      <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" 
           style={{ 
             backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(255,0,0,0.1) 2px, rgba(255,0,0,0.1) 4px)'
           }} 
      />
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-border" />
      <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-border" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-border" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-border" />
    </div>
  )
}

export default AdCard