import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { getAllManagers } from "../../../features/users/userSlice";

import { useSelector, useDispatch } from "react-redux";
import AddManager from "./AddManager";

Modal.setAppElement("#root");
const Manager = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllManagers());
  }, []);

  const handleAddManager = () => {
    setIsOpen(true);
  };

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
            <th>Main Status</th>
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
                <td className="text-red-500">{user.status}</td>
                <td className="text-purple-600">{user.main_status}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" align="center">
                No manager found
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
      <button onClick={handleAddManager}>Add Manager</button>
      {isOpen && (
        <>
          <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            contentLabel="Add Manager"
          >
            <AddManager setIsOpen={setIsOpen} />
          </Modal>
        </>
      )}
    </div>
  );
};

export default Manager;
