import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000); // 5s

    return () => clearTimeout(timer); // Cleanup du timer
  }, [navigate]);

  return (
    <div>
      <div>
        <h1>Page non trouvée</h1>
        <p>Désolé, la page que vous recherchez n'existe pas.</p>
        <button className="button-secondary" onClick={handleGoBack}>Retourner à l'accueil !</button>
      </div>
    </div>
  );
};

export default NotFound;
