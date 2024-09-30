import React from "react";

const Logo: React.FC = () => {
  return (
    <h1>
      <a href="/" className="button logo link-button">
        <span className="mobile-short-label">TGC</span>
        <span className="desktop-long-label">THE GOOD CORNER</span>
      </a>
    </h1>
  );
};

export default Logo;
