import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer aria-label="Footer Content">
      <div>
        <p>
          Copyright &copy; {currentYear} - All right reserved by{" "}
          <Link
            to="https://github.com/YohanGH"
            target="_blank"
            rel="noopener noreferrer"
          >
            YohanGH
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
