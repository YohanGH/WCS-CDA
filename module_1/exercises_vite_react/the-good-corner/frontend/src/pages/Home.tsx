import React from "react";
import AdList from "../components/sections/AdsList";
import { useCart } from "../hooks/useCart";

const Home: React.FC = () => {
const { cartTotal, onAddToCart } = useCart();

  return (
    <div>
      <h2>Annonces récentes</h2>
      <AdList onAddToCart={onAddToCart} />

      {/* Display basket total */}
      <div className="cart-total">
        <h3>Total du panier: {cartTotal.toFixed(2)} €</h3>
      </div>
    </div>
  );
};

export default Home;
