import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-block">
          <div className="row">
            <div className="col-md-2 col-xs-6  d-flex justify-content-center">
              <Link to="/">
                <img
                  src={require("assets/image/logo.png")}
                  alt="logo"
                  height="100"
                />
              </Link>
            </div>
            <div className="col-md-10 col-xs-6">
              <p className="footer-description pt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
        </div>
        <div className="row footer-link">
          <a
            href="https://facebook.com/troth.mn"
            target="_blank"
            rel="noopener noreferrer"
          >
            facebook
          </a>
          <a
            href="https://instagram.com/troth.mn"
            target="_blank"
            rel="noopener noreferrer"
          >
            instagram
          </a>
          <a
            href="https://twitter.com/troth_mn"
            target="_blank"
            rel="noopener noreferrer"
          >
            twitter
          </a>
          <a
            href="https://discord.gg/HaQC5r3"
            target="_blank"
            rel="noopener noreferrer"
          >
            discord
          </a>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms and Conditions</Link>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
