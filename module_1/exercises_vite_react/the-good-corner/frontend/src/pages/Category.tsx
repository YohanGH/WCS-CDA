import React, { useState} from "react";
import { useParams } from "react-router-dom";
import AdList from "../components/sections/AdsList";

const Category: React.FC = () => {
  // TODO : Refacto logic panier in global context
  const [cartTotal, setCartTotal] = useState<number>(0);
  const { slug } = useParams<{ slug: string }>();

  const onAddToCart = (price: number) => {
    setCartTotal(cartTotal + price);
  };

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
