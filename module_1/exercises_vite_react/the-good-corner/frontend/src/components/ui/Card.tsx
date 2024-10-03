import { Link } from "react-router-dom";
import { CardProps } from "../../types/types";

// TODO : Mouve Responsibility for the add-to-cart button
const Card: React.FC<CardProps> = ({ title, price, imageSrc, link, onAddToCart }) => {

  return (
    <div className="ad-card-container">
      <Link className="ad-card-link" to={link}>
        <img className="ad-card-image" src={imageSrc} alt={title} />
        <div className="ad-card-text">
          <div className="ad-card-title">{title}</div>
          <div className="ad-card-price">{price.toFixed(2)} €</div>
        </div>
      </Link>
      <button className="button" onClick={() => onAddToCart(price)}>
        Ajouter l'article au panier
      </button>
    </div>
  );
};

export default Card;
