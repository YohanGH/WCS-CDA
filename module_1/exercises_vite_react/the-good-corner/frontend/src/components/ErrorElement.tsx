import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ErrorElement() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary text-neon-green">
      <div className="max-w-md w-full space-y-8 p-10 bg-card shadow-lg border border-neon-purple rounded-lg transform hover:scale-105 transition-all duration-300 ease-in-out">
        <div className="text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-neon-red animate-pulse" />
          <h2 className="mt-6 text-3xl font-extrabold text-neon-red glitch-text">
            Erreur Système
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Une anomalie a été détectée dans la matrice.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <p className="text-sm text-muted-foreground">
            Le flux de données a rencontré une perturbation inattendue. Nos IA
            travaillent pour résoudre le problème.
          </p>
          <button
            onClick={() => navigate('/')}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-foreground bg-neon-blue hover:bg-neon-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon-purple transition-colors duration-200 ease-in-out transform hover:scale-105"
          >
            Réinitialiser le système
          </button>
        </div>
      </div>
    </div>
  );
}