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
          <div>
            <button
              className="cursor-pointer bg-none border-none p-0 m-0"
              onClick={() => {
                setIsUsersOpen(!isUsersOpen);
                setIsImagesOpen(false);
                setIsProductsOpen(false);
              }}
            >
              Users
            </button>
            {isUsersOpen && (
              <ul className="bg-[#999] pl-[10px]">
                <li>
                  <Link to="users">Users</Link>
                </li>
                <li>
                  <Link to="managers">Managers</Link>
                </li>
                <li>
                  <Link to="printers">Printers</Link>{" "}
                </li>
              </ul>
            )}
          </div>
        </li>
        <li>
          <div>
            <button
              onClick={() => {
                setIsProductsOpen(!isProductsOpen);
                setIsUsersOpen(false);
                setIsImagesOpen(false);
              }}
              style={{
                cursor: "pointer",
                background: "none",
                border: "none",
                padding: "0",
                margin: "0",
              }}
            >
              Products
            </button>
            {isProductsOpen && (
              <ul className="bg-[#999] pl-[10px]">
                <li>
                  <Link to="products">Products</Link>
                </li>
                <li>
                  <Link to="product-types">Product Types</Link>
                </li>
              </ul>
            )}
          </div>
        </li>
        <li>
          <Link to="colors">Colors</Link>
        </li>
        <li>
          <div>
            <button
              onClick={() => {
                setIsImagesOpen(!isImagesOpen);
                setIsUsersOpen(false);
                setIsProductsOpen(false);
              }}
              style={{
                cursor: "pointer",
                background: "none",
                border: "none",
                padding: "0",
                margin: "0",
              }}
            >
              Images
            </button>
            {isImagesOpen && (
              <ul className="bg-[#999] pl-[10px]">
                <li>
                  <Link to="images">Images</Link>
                </li>
                <li>
                  <Link to="image-types">Image Types</Link>
                </li>
                <li>
                  <Link to="image-categories">Image Categories</Link>{" "}
                </li>
              </ul>
            )}
          </div>
        </li>
        <li onClick={handleLogout}>logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
