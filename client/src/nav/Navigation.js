import React from "react";
import { Link } from "react-router-dom";
import logo from "./onPrintz-removebg-preview.png";

const Navigation = () => {
  return (
    <div className="nav">
      <Link to="/">
        <img src={logo} alt="logo" className="logo" />
      </Link>
      <ul>
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
      </ul>
        <div>
          <button>
            <Link to="/signup">Sign up</Link>
          </button>
          <button>
            <Link to="/login">Log in</Link>
          </button>
        </div>
      
    </div>
  );
};

export default Navigation;
