import React from "react";
import AdList from "../components/sections/AdsList";

const Home: React.FC = () => {
  return (
    <div>
      <h2>Annonces récentes</h2>
      <AdList />
    </div>
  );
};

export default Home;
