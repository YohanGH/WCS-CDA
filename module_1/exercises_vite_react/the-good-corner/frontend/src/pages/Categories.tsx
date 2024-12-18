import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_CATEGORIES } from '@/graphql/categories'
import { CategoryType } from '../types/types'
import { Loader2 } from 'lucide-react'

const CategoriesPage: React.FC = () => {
  const { data, loading, error } = useQuery<{ categories: CategoryType[] }>(GET_CATEGORIES, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-and-network',
  })

  const categories = data?.categories || []

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="relative border-2 border-destructive bg-background/40 p-8">
          <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-border -translate-x-1 -translate-y-1" />
          <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-border translate-x-1 -translate-y-1" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-border -translate-x-1 translate-y-1" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-border translate-x-1 translate-y-1" />
          <Loader2 className="w-12 h-12 text-border animate-spin" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-border text-center">
          <p className="text-2xl text-accent">ERROR://</p>
          <p className="text-lg text-accent">Erreur lors du chargement des catégories.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden py-16">
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground text-center mb-12 tracking-wider animate-pulse">
          CATÉGORIES
        </h1>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="block group"
            >
              <div className="relative bg-background/80 border border-border p-6 transform transition-all duration-300 hover:translate-x-2 hover:bg-red-950/30">
                {/* Category Number */}
                <div className="absolute left-0 top-0 bottom-0 w-16 flex items-center justify-center border-r border-border bg-background text-accent-foreground font-mono text-2xl">
                  {(index + 1).toString().padStart(2, '0')}
                </div>
                
                {/* Category Title */}
                <div className="ml-16 flex items-center justify-between">
                  <h2 className="text-xl md:text-2xl font-bold text-foreground tracking-wider group-hover:text-accent transition-colors">
                    {category.title.toUpperCase()}
                  </h2>
                  
                  {/* Hover Indicator */}
                  <div className="w-8 h-8 border-2 border-border rotate-45 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Glitch Effect Overlay */}
                <div className="absolute inset-0 bg-border/10 opacity-0 group-hover:opacity-100 transition-opacity" 
                     style={{ 
                       backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(50,50,50,0.3) 2px, rgba(50,50,50,0.3) 4px)'
                     }} 
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoriesPage