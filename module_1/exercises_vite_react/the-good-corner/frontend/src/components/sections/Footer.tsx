import React from "react";

const Footer: React.FC = () => {
    return (
        <footer>
            <div>
                <p>
                    Copyright &copy; {new Date().getFullYear()} - All right reserved by <a href="https://github.com/YohanGH">YohanGH</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;