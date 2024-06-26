// import React, { useState } from "react";

// const Table = ({ users }) => {
//   const [Blocked, setBlocked] = useState("false");
//   const handleBlockChange = () => {
//     if (Blocked === "true") {
//       setBlocked("false");
//     } else {
//       setBlocked("true");
//     }
//   };
//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Username</th>
//           <th>Full Name</th>
//           <th>Email</th>
//           <th>Mobile</th>
//           <th>
//             isBlocked <button onClick={handleBlockChange}>◘</button>
//           </th>
//           <th>Role</th>
//           <th>Created At</th>
//         </tr>
//       </thead>
//       <tbody>
//         {users.map((user) => (
//           <tr key={user._id}>
//             <td>{user.username}</td>
//             <td>{user.fullname}</td>
//             <td>{user.email}</td>
//             <td>{user.mobile}</td>
//             <td>{user.isBlocked === "true" ? "Blocked" : "Not"}</td>
//             <td>{user.role}</td>
//             <td>{user.createdAt.toLocaleString()}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default Table;

import React from "react";

const Table = ({ users, totalUsers, isLoading, setSelectedUser }) => {
  // const handleBlockChange = () => {
  //   setBlocked((prevOption) => {
  //     return !prevOption;
  //   });
  // };

  const handleRowSelect = (user) => {
    setSelectedUser(user);
  };
  return (
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>isBlocked</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <td colSpan="6" align="center">
              Loading
            </td>
          </tr>
        ) : totalUsers > 0 ? (
          users.map((user) => (
            <tr key={user._id} onClick={() => handleRowSelect(user)}>
              <td>{user.username}</td>
              <td>{user.fullname}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>{user.isBlocked ? "Blocked" : "Not Blocked"}</td>
              <td>{new Date(user.createdAt).toLocaleString()}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" align="center">
              No user found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
