import { Link } from "react-router-dom";
import { CardProps } from "../types/types";
import { useCart } from "../hooks/useCart";
import toast from "react-hot-toast";

const AdCard: React.FC<CardProps> = ({ title, price, imageSrc, link }) => {
  const { onAddToCart } = useCart();

  const handleAddToCart = () => {
    onAddToCart(price);
    toast.success(`Ajouté ${title} au panier pour ${price.toFixed(2)}€`);
  };

  return (
    <div className="bg-black bg-opacity-50 border border-purple-700 hover:border-neon-green transition-all duration-300 transform hover:-translate-y-1 rounded overflow-hidden shadow-lg hover:shadow-neon-green-glow">
      <Link className="block" to={link}>
        <img
          className="w-full h-48 object-cover mb-4 rounded-t"
          src={imageSrc}
          alt={title}
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2 text-neon-purple">
            {title}
          </h3>
          <p className="text-gray-400 mb-4">
            Description courte du produit avec des termes futuristes...
          </p>
          <div className="flex justify-between items-center">
            <span className="text-neon-green font-bold">
              {price.toFixed(2)} €
            </span>
            <button
              className="border border-purple-500 text-purple-500 px-4 py-2 rounded hover:bg-purple-500 hover:text-black transition transform hover:scale-105 shadow-button hover:shadow-button-hover"
              onClick={(e) => {
                e.preventDefault();
                handleAddToCart();
              }}
            >
              Ajouter l'article au panier
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AdCard;
