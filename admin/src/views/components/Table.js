import React, { useState } from "react";

const Table = ({ users }) => {
  const [Blocked, setBlocked] = useState("false");
  const handleBlockChange = () => {
    if (Blocked === "true") {
      setBlocked("false");
    } else {
      setBlocked("true");
    }
  };
  return (
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>
            isBlocked <button onClick={handleBlockChange}>◘</button>
          </th>
          <th>Role</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user.username}</td>
            <td>{user.fullname}</td>
            <td>{user.email}</td>
            <td>{user.mobile}</td>
            <td>{user.isBlocked === "true" ? "Blocked" : "Not"}</td>
            <td>{user.role}</td>
            <td>{user.createdAt.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
