import React, { useState } from "react";
import Logo from "../ui/Logo";
import Navigation from "../ui/Navigation";
import AdPost from "../ui/AdPost";
import SearchForm from "../ui/SearchForm";
import DarkModeToggle from "../ui/DarkModeToggle";
import CartSummary from "../ui/CartSummary";

const Header: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO : Manage search form submission here
    console.log("Rechercher : ", searchValue);
  };

  return (
    <>
      <header className="header" aria-label="Header Content">
        <div className="main-menu">
          <Logo />
          <SearchForm
            value={searchValue}
            onChange={handleSearchChange}
            onSubmit={handleSearchSubmit}
          />
          <CartSummary />
          <AdPost />
          <DarkModeToggle />
        </div>
        <Navigation />
      </header>
    </>
  );
};

export default Header;
