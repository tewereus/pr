// import React, { useState, useEffect } from "react";

// const Search = ({ search, setSearch, role, setRole }) => {
//   const [roleOptions, setRoleOptions] = useState(["all"]);

//   useEffect(() => {
//     if (role === "all") {
//       setRoleOptions(["all"]);
//     } else {
//       setRoleOptions(["all", "admin", "user", "guest"]);
//     }
//   }, [role]);

//   return (
//     <div className="search">
//       <input
//         type="text"
//         placeholder="Search..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />
//       <select value={role} onChange={(e) => setRole(e.target.value)}>
//         {roleOptions.map((option) => (
//           <option key={option} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default Search;

import React from "react";

const Search = ({ search, setSearch, role, setRole, roleOptions }) => {
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={handleSearchChange}
      />
      <select value={role} onChange={handleRoleChange}>
        {roleOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Search;
