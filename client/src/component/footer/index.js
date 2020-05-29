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
                  src={require("assets/image/logo-white.png")}
                  alt="logo"
                  height="100"
                />
              </Link>
            </div>
            <div className="col-md-10 col-xs-6">
              <p className="footer-description pt-2">
                Copyright &copy; {new Date().getFullYear()} TROTH LLC. All
                rights reserved. <br />
                All materials contained on this web site are protected by TROTH
                LLC copyright and may not be reproduced, distributed,
                transmited, displayed, published or broadcast without the prior
                permission of TROTH LLC.
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
