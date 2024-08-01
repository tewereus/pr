import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  return (
    <div>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <div>
            <button onClick={toggleDropdown} style={{ cursor: 'pointer', background: 'none', border: 'none', padding: '0', margin: '0' }}>
              Users
            </button>
            {isDropdownOpen && ( // Conditional rendering based on dropdown state
              <ul>
                <li><Link to="users">Users</Link></li>
                <li><Link to="managers">Managers</Link></li>
                <li><Link to="printers">Printers</Link> </li>
              </ul>
            )}
          </div>
        </li>
        <li>
          <Link to="products">Products</Link>
        </li>
        <li>
          <Link to="product-types">Product Types</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
