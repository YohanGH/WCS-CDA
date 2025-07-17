import { useParams, Link } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"
import { GET_COUNTRY } from "../api/queries"
import type { CountryQuery } from "../types"

export function CountryDetail() {
  const { code } = useParams<{ code: string }>()
  const { loading, error, data } = useQuery<CountryQuery>(GET_COUNTRY, {
    variables: { code },
    skip: !code,
  })

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading country details...</span>
      </div>
    )

  if (error)
    return (
      <div className="container mx-auto p-4">
        <Link to="/">
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Countries
          </Button>
        </Link>
        <div className="text-center p-4 text-red-500">
          <p>Error loading country details: {error.message}</p>
        </div>
      </div>
    )

  if (!data?.country)
    return (
      <div className="container mx-auto p-4">
        <Link to="/">
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Countries
          </Button>
        </Link>
        <div className="text-center p-4">
          <p>Country not found</p>
        </div>
      </div>
    )

  const { country } = data

  return (
    <div className="container mx-auto p-4">
      <Link to="/">
        <Button variant="outline" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Countries
        </Button>
      </Link>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-4">
            <span className="text-6xl">{country.emoji}</span>
            <CardTitle className="text-3xl">{country.name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Country Code</h3>
              <p className="text-xl font-semibold">{country.code}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Continent</h3>
              <p className="text-xl font-semibold">{country.continent?.name || "Not specified"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
