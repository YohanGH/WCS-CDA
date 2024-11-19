import { AlertTriangle, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ErrorElement() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-destructive-foreground relative overflow-hidden">
      {/* Glitch effect overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.15\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.5\'/%3E%3C/svg%3E")',
          backgroundRepeat: "repeat",
          mixBlendMode: "overlay",
        }}
      />

      <div className="max-w-md w-full space-y-8 p-5 bg-card shadow-lg border border-border rounded-lg relative z-10">
        <div className="text-center relative">
          <div className="flex items-center justify-center w-full mt-6">
            <div className="w-24 h-24 bg-destructive/50 rounded-full flex items-center justify-center animate-pulse">
              <AlertTriangle className="h-12 w-12 text-destructive" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-primary tracking-wider animate-glitch">
            ERREUR SYSTÈME
          </h2>
          <p className="mt-2 text-sm text-foreground">
            Une anomalie a été détectée dans la matrice.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <p className="text-sm text-foreground text-center">
            Le flux de données a rencontré une perturbation inattendue. Nos IA
            travaillent pour résoudre le problème.
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center justify-center py-2 px-4 border border-border rounded-md shadow-sm text-sm font-medium text-foreground bg-muted-foreground hover:bg-destructive/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-destructive transition-all duration-300 ease-in-out transform hover:scale-105 group"
            aria-label="Réinitialiser le système"
          >
            <RefreshCw className="mr-2 h-4 w-4 animate-spin group-hover:animate-spin-fast" />
            Réinitialiser le système
          </button>
        </div>
      </div>
    </div>
  );
}
