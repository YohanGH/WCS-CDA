import React from "react";
import { useParams } from "react-router-dom";
import AdList from "../components/sections/AdsList";
import { useCart } from "../hooks/useCart";

const Category: React.FC = () => {
  const { cartTotal, onAddToCart } = useCart();
  const { slug } = useParams<{ slug: string }>();

  return (
    <div>
      <div>
        <h1>Catégorie : {slug}</h1>
        <p>Détails de la catégorie pour le slug : {slug}</p>
        <AdList onAddToCart={onAddToCart} />
      </div>

      {/* Display basket total */}
      <div className="cart-total">
        <h3>Total du panier: {cartTotal.toFixed(2)} €</h3>
      </div>
    </div>
  );
};

export default Category;
