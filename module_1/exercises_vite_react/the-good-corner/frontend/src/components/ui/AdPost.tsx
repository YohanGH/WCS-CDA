import React from "react";
import { Link } from "react-router-dom";

const AdPost: React.FC = () => {
  return (
    <Link to="/post-ad" className="button link-button">
      <span className="mobile-short-label">Publier</span>
      <span className="desktop-long-label">Publier une annonce</span>
    </Link>
  );
};

export default AdPost;
