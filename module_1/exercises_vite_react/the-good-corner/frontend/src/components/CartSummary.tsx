import { ShoppingCart } from "lucide-react";
import { useCart } from "../hooks/useCart";

const CartSummary: React.FC = () => {
    const { cartTotal } = useCart();

    return (
      <div className="cart-summary" aria-label="Panier">
        <ShoppingCart size={24} />
        <span>{cartTotal.toFixed(2)} €</span>
      </div>
    );
  };

  export default CartSummary;