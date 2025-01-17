import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'

const MainNavigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function from the auth context
      navigate('/auth', { replace: true }); // Redirect to the login page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="relative bg-background border-b border-border">
      <div className="container relative z-10 mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <GlitchText className="text-2xl font-bold text-primary">
            <Link to="/">NeoMarket</Link>
          </GlitchText>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-foreground hover:text-primary transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu />
          </Button>

          {/* Desktop menu */}
          <div className="hidden lg:flex space-x-6 text-foreground">
            <NavLink to="/">Accueil</NavLink>
            <NavLink to="/categories">Catégories</NavLink>
            <NavLink to="/post-ad">Publier</NavLink>
            {user && <NavLink to="/admin-dashboard">Admin</NavLink>}
            {user ? (
              <button onClick={handleLogout} className="relative overflow-hidden group inline-block text-foreground hover:text-primary transition-colors duration-300">
                Déconnexion
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </button>
            ) : (
              <NavLink to="/auth">Connexion</NavLink>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 space-y-2 text-foreground">
            <NavLink to="/" mobile>Accueil</NavLink>
            <NavLink to="/categories" mobile>Catégories</NavLink>
            <NavLink to="/post-ad" mobile>Publier</NavLink>
            {user && <NavLink to="/admin-dashboard" mobile>Admin</NavLink>}
            {user ? (
              <button onClick={handleLogout} className="relative overflow-hidden group inline-block text-foreground hover:text-primary transition-colors duration-300">
                Déconnexion
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </button>
            ) : (
              <NavLink to="/auth">Connexion</NavLink>
            )}
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
      <span className="absolute top-0 -left-0.5 text-primary opacity-70 animate-glitch2" aria-hidden="true">
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
      text-foreground hover:text-primary transition-colors duration-300
    `}
  >
    {children}
    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
  </Link>
)

export default MainNavigation