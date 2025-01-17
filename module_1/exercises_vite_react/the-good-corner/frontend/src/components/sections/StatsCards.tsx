import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

interface StatsCardsProps {
    categoriesCount: number;
    tagsCount: number;
    productsCount: number;
    categoriesLoading: boolean;
    tagsLoading: boolean;
}

export function StatsCards({ categoriesCount, tagsCount, productsCount, categoriesLoading, tagsLoading }: StatsCardsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-black border-red-900/20">
                <CardHeader>
                    <CardTitle className="text-accent">TOTAL_CATEGORIES</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold">
                        {categoriesLoading ? "..." : categoriesCount}
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-black border-red-900/20">
                <CardHeader>
                    <CardTitle className="text-accent">TOTAL_TAGS</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold">
                        {tagsLoading ? "..." : tagsCount}
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-black border-red-900/20">
                <CardHeader>
                    <CardTitle className="text-accent">TOTAL_PRODUCTS</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold">
                        {categoriesLoading || tagsLoading ? "..." : productsCount}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
