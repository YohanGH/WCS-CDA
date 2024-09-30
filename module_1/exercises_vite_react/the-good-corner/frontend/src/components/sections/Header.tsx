import React from "react";
import Logo from "../ui/Logo";
import Navigation from "../ui/Navigation";
import AdPost from "../ui/AdPost";
import SearchForm from "../ui/SearchForm";

const Header: React.FC = () => {
  return (
    <>
      <header className="header">
        <div className="main-menu">
          <Logo />
          <SearchForm />
          <AdPost />
        </div>
        <Navigation />
      </header>
    </>
  );
};

export default Header;
