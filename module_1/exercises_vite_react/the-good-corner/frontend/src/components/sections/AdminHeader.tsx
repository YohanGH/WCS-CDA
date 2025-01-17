import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { useState } from 'react';

export function AdminHeader() {
    const [searchTerm, setSearchTerm] = useState("")

    return (
        <header className="border-b border-red-900/20">
        <div className="container mx-auto p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                    <span className="text-accent">ADMIN</span>_CONSOLE
                </h1>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-accent" />
                        <Input
                            type="search"
                            placeholder="SEARCH_DATABASE"
                            className="pl-10 bg-black border-red-900/20 focus:border-accent w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    </header>
    );
}
