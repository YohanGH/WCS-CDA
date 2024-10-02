import React from "react";
import { useParams } from "react-router-dom";

const Ad: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div>
      <div>
        <h1>Annonce : {slug}</h1>
        <p>Détails de l'annonce pour le slug : {slug}</p>
      </div>
    </div>
  );
};

export default Ad;
