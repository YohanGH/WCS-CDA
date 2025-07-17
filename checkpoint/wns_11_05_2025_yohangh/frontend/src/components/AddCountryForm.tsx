import type React from "react";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { ADD_COUNTRY, GET_COUNTRIES } from "../api/queries";
import type { Country } from "../types";
import { CONTINENTS } from "../data/continents";

type AddCountryFormProps = {
    onComplete?: () => void;
};

export function AddCountryForm({ onComplete }: AddCountryFormProps) {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [emoji, setEmoji] = useState("");
    const [continent, setContinent] = useState<string>("none");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [success, setSuccess] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const [addCountry, { loading }] = useMutation(ADD_COUNTRY, {
        update(cache, { data: { addCountry } }) {
            const data = cache.readQuery<{ countries: Country[] }>({
                query: GET_COUNTRIES,
            });
            const countries = data?.countries ?? [];
            cache.writeQuery({
                query: GET_COUNTRIES,
                data: { countries: [...countries, addCountry] },
            });
        },
        onCompleted() {
            setName("");
            setCode("");
            setEmoji("");
            setContinent("none");
            setErrors({});
            setSuccess("Le pays a bien été ajouté !");
            setSubmitError(null);
            if (onComplete) {
                onComplete();
            }
        },
        onError(error) {
            setSubmitError(error.message);
            setSuccess(null);
            console.error("Error adding country:", error);
        },
    });

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!name.trim()) {
            newErrors.name = "Name is required";
        }
        if (!code.trim()) {
            newErrors.code = "Code is required";
        } else if (code.length !== 2) {
            newErrors.code = "Code must be exactly 2 characters";
        }
        if (!emoji.trim()) {
            newErrors.emoji = "Emoji is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        addCountry({
            variables: {
                data: {
                    name,
                    code,
                    emoji,
                    continent: continent === "none" ? undefined : { id: Number(continent) },
                },
            },
        });
    };

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle>Add New Country</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Country Name</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. France"
                                className={errors.name ? "border-red-500" : ""}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">{errors.name}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="code">Country Code (2 letters)</Label>
                            <Input
                                id="code"
                                value={code}
                                onChange={(e) => setCode(e.target.value.toUpperCase())}
                                placeholder="e.g. FR"
                                maxLength={2}
                                className={errors.code ? "border-red-500" : ""}
                            />
                            {errors.code && (
                                <p className="text-red-500 text-sm">{errors.code}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="emoji">Emoji Flag</Label>
                            <Input
                                id="emoji"
                                value={emoji}
                                onChange={(e) => setEmoji(e.target.value)}
                                placeholder="e.g. 🇫🇷"
                                className={errors.emoji ? "border-red-500" : ""}
                            />
                            {errors.emoji && (
                                <p className="text-red-500 text-sm">{errors.emoji}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="continent">Continent (Optional)</Label>
                            <Select value={continent} onValueChange={setContinent}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a continent" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">None</SelectItem>
                                    {CONTINENTS.map((continent) => (
                                        <SelectItem key={continent.id} value={String(continent.id)}>
                                            {continent.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <Button type="submit" disabled={loading} className="w-full md:w-auto">
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating...
                            </>
                        ) : (
                            "Add Country"
                        )}
                    </Button>
                </form>
                {success && <p className="text-green-600 mt-4">{success}</p>}
                {submitError && <p className="text-red-600 mt-4">{submitError}</p>}
            </CardContent>
        </Card>
    );
}
