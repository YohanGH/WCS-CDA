import { Link } from "react-router-dom"

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto p-4">
        <Link to="/" className="text-xl font-bold">
          🌍 Country Explorer
        </Link>
      </div>
    </header>
  )
}
