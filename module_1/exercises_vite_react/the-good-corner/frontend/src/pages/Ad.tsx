import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const Ad: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  // TODO : Create components for error
  if (!id) {
    return (
      <div>
        <h1>Annonce non trouvée</h1>
        <button className="button-secondary" onClick={() => navigate("/")}>Retourner à l'accueil</button>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1>Annonce : {id}</h1>
        <p>Détails de l'annonce pour le slug : {id}</p>
      </div>
    </div>
  );
};

export default Ad;
