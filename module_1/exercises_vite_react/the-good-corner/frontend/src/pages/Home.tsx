import React from "react";
import Card from "../components/ui/Card";

const Home: React.FC = () => {
  const ads = [
    {
      title: "Table",
      price: "120 €",
      imageSrc: "../../public/assets/table.webp",
      link: "/ads/table",
    },
    {
      title: "Dame-jeanne",
      price: "75 €",
      imageSrc: "../../public/assets/dame-jeanne.webp",
      link: "/ads/dame-jeanne",
    },
    {
      title: "Vide-poche",
      price: "4 €",
      imageSrc: "../../public/assets/vide-poche.webp",
      link: "/ads/vide-poche",
    },
    {
      title: "Vaisselier",
      price: "900 €",
      imageSrc: "../../public/assets/vaisselier.webp",
      link: "/ads/vaisselier",
    },
    {
      title: "Bougie",
      price: "8 €",
      imageSrc: "../../public/assets/bougie.webp",
      link: "/ads/bougie",
    },
    {
      title: "Porte-magazine",
      price: "45 €",
      imageSrc: "../../public/assets/porte-magazine.webp",
      link: "/ads/porte-magazine",
    },
  ];

  return (
    <div>
      <h2>Annonces récentes</h2>
      <section className="recent-ads">
        {ads.map((ad, index) => (
          <Card
            key={index}
            title={ad.title}
            price={ad.price}
            imageSrc={ad.imageSrc}
            link={ad.link}
          />
        ))}
      </section>
    </div>
  );
};

export default Home;
