import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteManager } from "../../../store/users/userSlice";

const DeleteManager = ({ setIsOpen, selectedUser }) => {
  const dispatch = useDispatch();
  const [manager, setManager] = useState(null);

  useEffect(() => {
    setManager(selectedUser);
  }, []);

  const handleDelete = () => {
    if (manager) {
      // console.log("deleted");
      dispatch(deleteManager(manager._id));
      setIsOpen(false);
    } else {
      console.error("Manager is not defined");
    }
  };

  return (
    <div>
      <h1>Delete Manager</h1>
      <p>Are you sure you want to delete manager {manager?.fullname}?</p>
      <div className="m-2">
        <span
          className="px-4 py-2 m-4 bg-green-500 text-white rounded-md"
          onClick={handleDelete}
        >
          Confirm
        </span>
        <span
          className="px-4 py-2 m-4 bg-red-500 text-white rounded-md"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </span>
      </div>
    </div>
  );
};

export default DeleteManager;
