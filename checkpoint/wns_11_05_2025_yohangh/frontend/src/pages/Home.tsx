import { useState } from "react"
import { useQuery } from "@apollo/client"
import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { AddCountryForm } from "../components/AddCountryForm"
import { GET_COUNTRIES } from "../api/queries"
import type { CountriesQuery } from "../types"

export function HomePage() {
  const [showAddForm, setShowAddForm] = useState(false)
  const { loading, error, data } = useQuery<CountriesQuery>(GET_COUNTRIES)

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading countries...</span>
      </div>
    )

  if (error)
    return (
      <div className="text-center p-4 text-red-500">
        <p>Error loading countries: {error.message}</p>
      </div>
    )

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Countries List</h1>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="self-start md:self-auto">
          {showAddForm ? "Hide Form" : "Add New Country"}
        </Button>
      </div>

      {showAddForm && <AddCountryForm onComplete={() => setShowAddForm(false)} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {data?.countries.map((country) => (
          <Link to={`/country/${country.code}`} key={country.code}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center">
                <span className="text-4xl mr-4">{country.emoji}</span>
                <span className="font-medium">{country.name}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
