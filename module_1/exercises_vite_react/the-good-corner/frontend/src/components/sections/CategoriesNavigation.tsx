import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_CATEGORIES } from '@/graphql/categories'
import { CategoryType } from '../../types/types'
import { Loader2 } from 'lucide-react'

const CategoriesNavigation: React.FC = () => {
  const { data, loading, error } = useQuery<{ categories: CategoryType[] }>(GET_CATEGORIES, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-and-network',
  })

  const categories = data?.categories || []

  if (loading) {
    return (
      <div className="flex justify-center items-center py-4 bg-black border-b border-red-800">
        <Loader2 className="w-6 h-6 text-red-500 animate-spin" />
      </div>
    )
  }

  if (error) {
    console.error('Error retrieving categories', error)
    return (
      <div className="text-center py-4 bg-black border-b border-red-800">
        <p className="text-red-500">Erreur lors du chargement des catégories.</p>
      </div>
    )
  }

  return (
    <nav className="relative bg-black border-b border-red-800 overflow-x-auto">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0,#1a0505_100%),linear-gradient(to_right,#ff000015_1px,transparent_1px),linear-gradient(to_bottom,#ff000015_1px,transparent_1px)] bg-[size:100%_100%,24px_24px,24px_24px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_100%)]" />
      
      <div className="container relative z-10 mx-auto px-6 py-3">
        <div className="flex justify-center items-center space-x-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="text-red-400 hover:text-red-300 transition-colors duration-300 whitespace-nowrap relative group"
            >
              {category.title}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default CategoriesNavigation