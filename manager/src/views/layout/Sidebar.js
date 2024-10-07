import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isImagesOpen, setIsImagesOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    const token = user.unique_id;
    localStorage.clear();
    // dispatch(user_reset())
    navigate(`/manager/${token}`);
    window.location.reload();
  };

  return (
    <div>
      <ul>
        <li onClick={() => console.log(user)}>
          <Link to="/manager">Dashboard</Link>
        </li>
        <li>
          <Link to="printers">Printers</Link>
        </li>
        <li onClick={handleLogout}>logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
