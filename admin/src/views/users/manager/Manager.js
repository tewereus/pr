import React, { useEffect } from "react";
import {
  getAllManagers,
} from "../../features/users/userSlice";
import { useSelector, useDispatch } from "react-redux";

const Manager = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllManagers())
  }, []);

  const { users, totalUsers, isLoading } = useSelector((state) => state.users);
  return (
    <div>
      {/*<Table
        users={users}
        totalUsers={totalUsers}
        isLoading={isLoading}
        setSelectedUser={setSelectedUser}
      />*/}
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>
              isBlocked
            </th>
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
              <tr key={user._id}>
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
      {/* <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>
          Page {page} of {Math.ceil(totalUsers / limit)}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === Math.ceil(totalUsers / limit)}
        >
          Next
        </button>
      </div> */}
    </div>
  );
};

export default Manager;
