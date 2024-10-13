import React from "react";
import Navigation from "./Navigation";
import Hero from "./Hero";

const Header: React.FC = () => {
  return (
    <>
      <header
        aria-label="Header Content"
        className="bg-primary text-secondary"
      >
        <div>
          <Navigation />
          <Hero />
        </div>
      </header>
    </>
  );
};

export default Header;
