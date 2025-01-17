import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LOGIN, REGISTER } from "@/graphql/auth";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";

export default function Auth() {
    const [activeTab, setActiveTab] = useState<"login" | "register">("login");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const { refetchUser } = useAuth();

    const navigate = useNavigate();

    const [loginUser, { loading: loggingIn }] = useMutation(LOGIN);
    const [registerUser, { loading: registering }] = useMutation(REGISTER);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (activeTab === "register" && password !== confirmPassword) {
            toast.error("Passwords do not match.", {
                style: { border: "1px solid red", color: "white", background: "black" },
            });
            return;
        }

        const variables = { data: { email, password } };

        try {
            if (activeTab === "login") {
                const { data } = await loginUser({ variables });
                if (data) {
                    toast.success("Login successful!", {
                        style: { border: "1px solid green", color: "white", background: "black" },
                    });
                    await refetchUser();
                    navigate(`/categories`, { replace: true })
                }
            } else {
                const { data } = await registerUser({ variables });
                if (data) {
                    toast.success("Registration successful!", {
                        style: { border: "1px solid green", color: "white", background: "black" },
                    });
                    setActiveTab("login"); // Switch to login tab after registration
                }
            }
        } catch (error: Error | unknown) {
            const errorMessage = error instanceof Error ? error.message : "An error occurred.";
            toast.error(errorMessage, {
                style: { border: "1px solid red", color: "white", background: "black" },
            });
        }
    };

    return (
        <main className="relative z-10 container mx-auto px-4 py-16">
            <div className="max-w-md mx-auto">
                <div className="mb-8 space-y-4">
                    <h1 className="text-3xl font-bold tracking-tighter">
                        <span className="text-accent">MODULE</span> AUTH_01
                    </h1>
                    <p className="text-2xl">Accédez au marché cybernétique</p>
                </div>

                <Tabs value={activeTab} onValueChange={(value: string) => setActiveTab(value as "login" | "register")} className="space-y-6">
                    <TabsList className="w-full grid grid-cols-2 bg-background p-1 border border-border">
                        <TabsTrigger value="login" className="data-[state=active]:bg-red-950 data-[state=active]:text-popover-foreground">
                            CONNEXION.exe
                        </TabsTrigger>
                        <TabsTrigger value="register" className="data-[state=active]:bg-red-950 data-[state=active]:text-popover-foreground">
                            INSCRIPTION.exe
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="login">
                        <form onSubmit={handleSubmit} className="space-y-4 border border-border bg-background p-6">
                            <FormField label="USER_EMAIL">
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Entrez votre email"
                                    className="border-border focus:border-accent placeholder:text-chart-3"
                                    required
                                />
                            </FormField>
                            <FormField label="USER_PASSWORD">
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Entrez votre mot de passe"
                                    className="border-border focus:border-accent placeholder:text-chart-3"
                                    required
                                />
                            </FormField>
                            <Button
                                type="submit"
                                className="w-full bg-primary-foreground hover:bg-primary text-foreground"
                                disabled={loggingIn}
                            >
                                {loggingIn ? "Authentification..." : "INITIALISER_SESSION"}
                            </Button>
                        </form>
                    </TabsContent>

                    <TabsContent value="register">
                        <form onSubmit={handleSubmit} className="space-y-4 border border-border bg-background p-6">
                            <FormField label="NOUVEL_USER_EMAIL">
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Créer votre email"
                                    className="border-border focus:border-accent placeholder:text-chart-3"
                                    required
                                />
                            </FormField>
                            <FormField label="USER_PASSWORD">
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Créer votre mot de passe"
                                    className="border-border focus:border-accent placeholder:text-chart-3"
                                    required
                                />
                            </FormField>
                            <FormField label="VÉRIFIER_PASSWORD">
                                <Input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Vérifier votre mot de passe"
                                    className="border-border focus:border-accent placeholder:text-chart-3"
                                    required
                                />
                            </FormField>
                            <Button
                                type="submit"
                                className="w-full bg-primary-foreground hover:bg-primary text-foreground"
                                disabled={registering}
                            >
                                {registering ? "Création du compte..." : "CRÉER_IDENTITÉ"}
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>

                {/* Security Notice */}
                <div className="mt-6 text-center">
                    <p className="text-sm">
                        CONNEXION_SECURISÉE_ETABLIE
                        <br />
                        <span className="text-accent">Node:</span> Mars-Auth-Protocol v2.4.1
                    </p>
                </div>
            </div>
        </main>
    )
}

const FormField: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <div className="space-y-2">
        <label className="text-sm">{label}</label>
        {children}
    </div>
);