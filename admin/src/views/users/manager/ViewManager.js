// ViewManager.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getManagerInfo } from "../../../store/users/userSlice"; // Import the action to fetch manager info

const ViewManager = ({ setIsOpen, selectedUser }) => {
  const dispatch = useDispatch();
  const { selectedManager, isLoading } = useSelector((state) => state.users); // Assuming you have selectedManager in your slice

  useEffect(() => {
    if (selectedUser) {
      dispatch(getManagerInfo(selectedUser._id)); // Fetch manager info using the selected user's ID
    }
  }, [dispatch, selectedUser]);

  return (
    <div>
      <h2>Manager Information</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>
            <strong>Username:</strong> {selectedManager?.username}
          </p>
          <p>
            <strong>Full Name:</strong> {selectedManager?.fullname}
          </p>
          <p>
            <strong>Email:</strong> {selectedManager?.email}
          </p>
          <p>
            <strong>Mobile:</strong> {selectedManager?.mobile}
          </p>
          <p>
            <strong>Status:</strong> {selectedManager?.status}
          </p>
          <p>
            <strong>Main Status:</strong> {selectedManager?.main_status}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(selectedManager?.createdAt).toLocaleString()}
          </p>
          {/* Add any other fields you want to display */}
        </div>
      )}
      <button onClick={() => setIsOpen(false)}>Close</button>
    </div>
  );
};

export default ViewManager;
