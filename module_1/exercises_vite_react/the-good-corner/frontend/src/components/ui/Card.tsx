import React from "react";

type CardProps = {
  title: string;
  price: string;
  imageSrc: string;
  link: string;
};

const Card: React.FC<CardProps> = ({ title, price, imageSrc, link }) => {
  return (
    <div className="ad-card-container">
      <a className="ad-card-link" href={link}>
        <img className="ad-card-image" src={imageSrc} alt={title} />
        <div className="ad-card-text">
          <div className="ad-card-title">{title}</div>
          <div className="ad-card-price">{price}</div>
        </div>
      </a>
    </div>
  );
};

export default Card;
