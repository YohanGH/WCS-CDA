import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
    return (
        <footer>
            <div>
                <p>
                    Copyright &copy; {new Date().getFullYear()} - All right reserved by <Link to="https://github.com/YohanGH">YohanGH</Link>
                </p>
            </div>
        </footer>
    );
};

export default Footer;