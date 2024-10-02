import React from "react";
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <h1>
      <Link to="/" className="button logo link-button">
        <span className="mobile-short-label">TGC</span>
        <span className="desktop-long-label">THE GOOD CORNER</span>
      </Link>
    </h1>
  );
};

export default Logo;
