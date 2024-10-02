import React, { useState} from "react";
import AdList from "../components/sections/AdsList";

const Home: React.FC = () => {
  // TODO : Refacto logic panier in global context
  const [cartTotal, setCartTotal] = useState<number>(0);

  const onAddToCart = (price: number) => {
    setCartTotal(cartTotal + price);
  };

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
