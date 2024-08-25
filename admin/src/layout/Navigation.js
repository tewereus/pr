import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import logo from "./onPrintz-removebg-preview.png";
import { useSelector, useDispatch } from "react-redux";
// import {user_reset} from "../features/auth/authSlice"
import { FaMoon, FaSun } from "react-icons/fa";
import { toggleDarkMode } from "../features/users/userSlice";

const Navigation = () => {
  // const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    localStorage.clear();
    // dispatch(user_reset())
    navigate("/");
    window.location.reload();
    // console.log(user);
  };

  const handleTheme = () => {
    if (darkMode == false) {
      setDarkMode(true);
      document.querySelector("html").classList.add("dark");
      const data = "light";
      // console.log(data);
      dispatch(toggleDarkMode(data));
    } else {
      document.querySelector("html").classList.remove("dark");
      setDarkMode(false);
      const data = "light";
      dispatch(toggleDarkMode(data));
      // console.log(darkMode);
    }
  };

  return (
    <div className="flex justify-around items-center border-b-8 bg-red-500 border-gray-200 dark:bg-gray-800 dark:border-gray-700">
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
              <Link to="/profile">{user.username}</Link>
            </button>

            <button onClick={handleTheme} className="text-white">
              {darkMode ? <FaSun /> : <FaMoon />}
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
