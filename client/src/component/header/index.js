import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Drawer from "@material/react-drawer";
import { User } from "context/user";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "./style.scss";
const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const { user } = useContext(User);
  const [open, setOpen] = useState(false);
  useEffect(() => {}, [user]);
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
        <div className="header-action d-flex">
          <Link
            className="nav_link"
            to="/course"
            className="mr-3"
            style={{ lineHeight: "36px" }}
          >
            Сургалтууд
          </Link>
          {user ? (
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle
                tag="span"
                data-toggle="dropdown"
                aria-expanded={dropdownOpen}
              >
                <div className="profile-header nav_link d-flex">
                  <div className="avatar"></div>
                  <div className="profile-username">{user.username}</div>
                </div>
              </DropdownToggle>
              <DropdownMenu onClick={toggle}>
                <div className="dropdown-header">
                  <p className="dropdown-name">{user.name}</p>
                  <p className="dropdown-type">{user.type}</p>
                  <hr />
                  <Link to="/submissions">Submissions</Link>
                </div>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <a
              className="btn btn-danger member-button"
              href="https://troth.mn/auth/register"
              target="_blank"
              rel="noopener noreferrer"
            >
              Нэвтрэх
            </a>
          )}
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
