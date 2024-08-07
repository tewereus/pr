import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isImagesOpen, setIsImagesOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  return (
    <div>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <div>
            <button onClick={() => setIsUsersOpen(!isUsersOpen)} style={{ cursor: 'pointer', background: 'none', border: 'none', padding: '0', margin: '0' }}>
              Users
            </button>
            {isUsersOpen && (
              <ul>
                <li><Link to="users">Users</Link></li>
                <li><Link to="managers">Managers</Link></li>
                <li><Link to="printers">Printers</Link> </li>
              </ul>
            )}
          </div>
        </li>
        <li>
          <div>
            <button onClick={() => setIsProductsOpen(!isProductsOpen)} style={{ cursor: 'pointer', background: 'none', border: 'none', padding: '0', margin: '0' }}>
              Products
            </button>
            {isProductsOpen && (
              <ul>
                <li><Link to="products">Products</Link></li>
                <li><Link to="product-types">Product Types</Link></li>
              </ul>
            )}
          </div>
        </li>
        <li>
          <Link to="colors">Colors</Link>
        </li>
        <li>
          <div>
            <button onClick={() => setIsImagesOpen(!isImagesOpen)} style={{ cursor: 'pointer', background: 'none', border: 'none', padding: '0', margin: '0' }}>
              Images
            </button>
            {isImagesOpen && (
              <ul>
                <li><Link to="images">Images</Link></li>
                <li><Link to="image-types">Image Types</Link></li>
                <li><Link to="image-categories">Image Categories</Link> </li>
              </ul>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
