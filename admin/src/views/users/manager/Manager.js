import React, { useEffect } from "react";

import { getAllManagers, addManager } from "../../../features/users/userSlice";

import { useSelector, useDispatch } from "react-redux";

const Manager = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllManagers())
  }, []);

  const addManagerHandler = () => {
    dispatch(addManager())
  }

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
            <th>Email</th>
            <th>Mobile</th>
            <th>Role</th>
            <th>Status</th>
            <th>
              Main Status
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
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>{user.main_status}</td>
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
      <button onClick={addManagerHandler}>Add Manager</button>
    </div>
  );
};

export default Manager;
