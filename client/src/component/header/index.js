import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
const Header = () => {
  return (
    <header className="header">
      <Link className="brand d-flex" to="/">
        <div>
          <img
            src={require("assets/image/logo.png")}
            alt="capstone logo"
            className="brand-logo"
          />
        </div>
        <div className="brand-text">Capstone</div>
      </Link>
      <div className="header-action">
        <a
          href="https://troth.mn/auth/register"
          target="_blank"
          rel="noopener noreferrer"
        >
          Become a member
        </a>
      </div>
    </header>
  );
};
export default Header;
