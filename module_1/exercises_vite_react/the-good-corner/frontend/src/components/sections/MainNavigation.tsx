import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

const MainNavigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="relative bg-black border-b border-red-800">
      <div className="container relative z-10 mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <GlitchText className="text-2xl font-bold text-red-500">
            <Link to="/">NeoMarket</Link>
          </GlitchText>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-red-500 hover:text-red-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu />
          </Button>

          {/* Desktop menu */}
          <div className="hidden lg:flex space-x-6">
            <NavLink to="/">Accueil</NavLink>
            <NavLink to="/categories">Catégories</NavLink>
            <NavLink to="/post-ad">Publier</NavLink>
            <NavLink to="#">Connexion</NavLink>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 space-y-2">
            <NavLink to="/" mobile>Accueil</NavLink>
            <NavLink to="/categories" mobile>Catégories</NavLink>
            <NavLink to="/post-ad" mobile>Publier</NavLink>
            <NavLink to="#" mobile>Connexion</NavLink>
          </div>
        )}
      </div>
    </nav>
  )
}

const GlitchText: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span className="absolute top-0 left-0.5 text-cyan-500 opacity-70 animate-glitch1" aria-hidden="true">
        {children}
      </span>
      <span className="absolute top-0 -left-0.5 text-red-500 opacity-70 animate-glitch2" aria-hidden="true">
        {children}
      </span>
    </div>
  )
}

const NavLink: React.FC<{ to: string; children: React.ReactNode; mobile?: boolean }> = ({ to, children, mobile }) => (
  <Link
    to={to}
    className={`
      relative overflow-hidden group
      ${mobile ? 'block py-2' : 'inline-block'}
      text-red-400 hover:text-red-300 transition-colors duration-300
    `}
  >
    {children}
    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
  </Link>
)

export default MainNavigation