import React from "react";
import MainNavigation from "./MainNavigation";
import CategoriesNavigation from "./CategoriesNavigation";

const Header: React.FC = () => {
  return (
    <>
      <header
        aria-label="Header Content"
        className="bg-primary text-secondary"
      >
        <div>
          <MainNavigation />
          <CategoriesNavigation />
        </div>
      </header>
    </>
  );
};

export default Header;
