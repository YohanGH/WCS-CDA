import React from "react";

const AdPost: React.FC = () => {
  return (
    <a href="/post-ad" className="button link-button">
      <span className="mobile-short-label">Publier</span>
      <span className="desktop-long-label">Publier une annonce</span>
    </a>
  );
};

export default AdPost;
