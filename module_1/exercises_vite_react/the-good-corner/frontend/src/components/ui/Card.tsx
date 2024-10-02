import { Link } from "react-router-dom";

type CardProps = {
  title: string;
  price: number;
  imageSrc: string;
  link: string;
  onAddToCart: (price: number) => void;
};

const Card: React.FC<CardProps> = ({ title, price, imageSrc, link, onAddToCart }) => {

  return (
    <div className="ad-card-container">
      <Link className="ad-card-link" to={link}>
        <img className="ad-card-image" src={imageSrc} alt={title} />
        <div className="ad-card-text">
          <div className="ad-card-title">{title}</div>
          <div className="ad-card-price">{price} €</div>
        </div>
      </Link>
      <button className="button" onClick={() => onAddToCart(price)}>
        Ajouter l'article au panier
      </button>
    </div>
  );
};

export default Card;
