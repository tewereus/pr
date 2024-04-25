import React from "react";
import { Link } from "react-router-dom";
// import logo from "./onPrintz-removebg-preview.png";
import { useSelector, useDispatch } from "react-redux";
// import {user_reset} from "../features/auth/authSlice"

const Navigation = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    localStorage.clear();
    // dispatch(user_reset())
    window.location.reload();
    console.log(user);
  };

  return (
    <div className="flex justify-around items-center border-b-8">
      {/* <Link to="/">
        <img src={logo} alt="logo" className="h-20" />
      </Link> */}
      <ul>
        <li>
          <Link to="/admin">Home</Link>
        </li>
      </ul>
      <div>
        {user ? (
          <>
            <button type="button">
              <Link to="/profile">
                {user.username}
              </Link>
            </button>
            <button onClick={handleLogout} type="button">
              Logout
            </button>
          </>
        ) : (
          <>
            <button>
              <Link to="/signup">Sign up</Link>
            </button>
            <button>
              <Link to="/login">Log in</Link>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navigation;
