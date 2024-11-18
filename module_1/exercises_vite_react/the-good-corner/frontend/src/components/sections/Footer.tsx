import React from 'react'
import { Link } from 'react-router-dom'
import { Github, Linkedin, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-background py-12 overflow-hidden border-t border-border">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0,#1a0505_100%),linear-gradient(to_right,#ff000015_1px,transparent_1px),linear-gradient(to_bottom,#ff000015_1px,transparent_1px)] bg-[size:100%_100%,24px_24px,24px_24px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_100%)]" />
      
      {/* Content */}
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <FooterSection title="À propos de nous">
            <p className="text-foreground text-sm">
              Explorez les rues éclairées au néon de notre marché numérique, où
              l'avenir rencontre l'économie souterraine.
            </p>
          </FooterSection>

          <FooterSection title="Liens Rapides">
            <ul className="space-y-2 text-sm">
              <FooterLink to="/">Accueil</FooterLink>
              <FooterLink to="/categories">Catégories</FooterLink>
              <FooterLink to="/post-ad">Publier une annonce</FooterLink>
            </ul>
          </FooterSection>

          <FooterSection title="Contact">
            <p className="text-sm text-foreground">NeoTokyo District, Cyberpunk Avenue 2077</p>
            <p className="text-sm text-foreground">contact@leboncoin-cyber.com</p>
          </FooterSection>

          <FooterSection title="Suivez-nous">
            <div className="flex space-x-4">
              <SocialButton icon={<Github className="h-4 w-4" />} />
              <SocialButton icon={<Linkedin className="h-4 w-4" />} />
              <SocialButton icon={<Twitter className="h-4 w-4" />} />
            </div>
          </FooterSection>
        </div>

        <div className="mt-8 pt-8 text-center text-sm border-t border-border">
          <p className="text-foreground">
            &copy; {currentYear} NeoMarket - Cyberpunk Edition. All rights
            reserved. Developed by{' '}
            <Link
              to="https://github.com/YohanGH"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-primary hover:text-red-300 transition-colors duration-300"
            >
              YohanGH
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

const FooterSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="space-y-3">
    <h3 className="text-lg font-bold text-primary relative inline-block">
      {title}
      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary animate-pulse" />
    </h3>
    {children}
  </div>
)

const FooterLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <li>
    <Link to={to} className="text-foreground hover:text-red-300 transition-colors duration-300">
      {children}
    </Link>
  </li>
)

const SocialButton: React.FC<{ icon: React.ReactNode }> = ({ icon }) => (
  <Button
    variant="outline"
    size="icon"
    className="border-primary text-primary hover:bg-border hover:text-red-300 transition-colors duration-300"
  >
    {icon}
  </Button>
)

export default Footer