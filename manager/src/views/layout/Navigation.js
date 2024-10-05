import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaMoon, FaSun } from "react-icons/fa";
import { toggleDarkMode } from "../../store/auth/authSlice";
// import { toggleDarkMode } from "../store/auth/authSlice";

const Navigation = () => {
  // const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // const handleLogout = () => {
  //   localStorage.clear();
  //   // dispatch(user_reset())
  //   navigate("/");
  //   window.location.reload();
  //   // console.log(user);
  // };

  const handleTheme = () => {
    const managerData = JSON.parse(localStorage.getItem("manager"));
    if (managerData) {
      const newMode = managerData.preference.mode === "dark" ? "light" : "dark";
      const data = {
        preference: {
          mode: newMode,
        },
      };
      dispatch(toggleDarkMode(data))
        .unwrap()
        .then(() => {
          managerData.preference.mode = newMode;
          localStorage.setItem("manager", JSON.stringify(managerData));
          document.body.classList.toggle("dark", newMode === "dark");
        })
        .catch((error) => {
          console.error("Failed to update dark mode:", error);
        });
    }
  };

  return (
    <div className="flex justify-around items-center border-b-4 text-gray-800 bg-gray-300 border-gray-200 dark:bg-gray-800 dark:border-gray-700 h-[10vh] dark:text-gray-300">
      {/* <Link to="/">
        <img src={logo} alt="logo" className="h-20" />
      </Link> */}
      <ul>
        <li>
          <Link to="/manager">Home</Link>
        </li>
      </ul>
      <div>
        {user ? (
          <>
            <button
              onClick={handleTheme}
              className="text-gray-800 dark:text-gray-300"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
            <button type="button" className="pl-4">
              <Link to="profile">{user.fullname}</Link>
            </button>

            {/* <button onClick={handleLogout} type="button">
              Logout
            </button> */}
          </>
        ) : (
          <>
            <button>
              <Link to="/signup" className="text-white">
                Sign up
              </Link>
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
