import React, { useState } from "react";
import { Link } from "react-router-dom";
import Drawer from "@material/react-drawer";
import "./style.scss";
const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
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
          <Link to="/course">Our Course</Link>
          <a
            className="btn btn-danger member-button"
            href="https://troth.mn/auth/register"
            target="_blank"
            rel="noopener noreferrer"
          >
            Become a member
          </a>
        </div>
        <div className="drawer-trigger">
          <button className="material-icons" onClick={() => setOpen(!open)}>
            menu
          </button>
        </div>
      </header>
      <Drawer modal open={open} onClose={() => setOpen(false)}>
        <div className="drawer-container" onClick={() => setOpen(false)}>
          <div className="drawer-header">CAPSTONE</div>
          <div className="mt-2 d-flex flex-column">
            <Link to="/course" tabIndex={0}>
              <span>Courses</span>
            </Link>
            <Link to="/about" tabIndex={0}>
              <span>About</span>
            </Link>
            <Link to="/contact" tabIndex={0}>
              <span>Contact us</span>
            </Link>
            <Link to="/terms" tabIndex={0}>
              <span>Terms</span>
            </Link>
          </div>
        </div>
      </Drawer>
    </>
  );
};
export default Header;
