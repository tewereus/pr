import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getAllManagers,
  updateManager,
} from "../../../features/users/userSlice";

const EditManager = ({ setIsOpen, selectedUser }) => {
  const dispatch = useDispatch();
  const [manager, setManager] = useState(null);
  const [originalStatus, setOriginalStatus] = useState("");
  const [orgMainStatus, setOrgMainStatus] = useState("");
  const [editStatus, setEditStatus] = useState(false);
  const [mainStatus, setMainStatus] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    status: "",
    main_status: "",
    fullname: "",
  });

  useEffect(() => {
    setManager(selectedUser);
    setOriginalStatus(selectedUser.status);
    setOrgMainStatus(selectedUser.main_status);
  }, []);

  useEffect(() => {
    if (manager) {
      setFormData({
        email: manager.email,
        mobile: manager.mobile,
        status: manager.status,
        main_status: manager.main_status,
        fullname: manager.fullname,
      });
    }
  }, [manager]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: manager._id,
      data: formData,
    };
    dispatch(updateManager(data))
      .then((resultAction) => {
        if (updateManager.fulfilled.match(resultAction)) {
          window.location.reload();
          setIsOpen(false);
        }
      })
      .catch((error) => {
        console.error("Error dispatching updateManager:", error);
      });
  };

  const handleEditStatus = () => {
    if (editStatus) {
      setEditStatus(false);
      setFormData((prevData) => ({
        ...prevData,
        status: originalStatus,
      }));
    } else {
      setEditStatus(true);
    }
  };

  const handleMainStatus = () => {
    if (mainStatus) {
      setMainStatus(false);
      setFormData((prevData) => ({
        ...prevData,
        main_status: orgMainStatus,
      }));
    } else {
      setMainStatus(true);
    }
  };

  return (
    <div>
      <h1>Edit Manager</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mobile:</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            disabled={!editStatus}
            required
          >
            <option value="active">active</option>
            <option value="inactive">inactive</option>
          </select>
          <button
            type="button"
            onClick={handleEditStatus}
            className={`${
              editStatus ? "bg-red-500" : "bg-green-500"
            } text-white p-2 rounded-lg`}
          >
            {editStatus ? "Cancel Edit" : "Edit Status"}
          </button>
        </div>
        <div>
          <label>Main Status:</label>
          <select
            name="main_status"
            value={formData.main_status}
            onChange={handleChange}
            disabled={!mainStatus}
            required
          >
            <option value="active">active</option>
            <option value="inactive">inactive</option>
            <option value="waiting">waiting</option>
            <option value="unavailable">unavailable</option>
          </select>
          <button
            type="button"
            onClick={handleMainStatus}
            className={`${
              mainStatus ? "bg-red-500" : "bg-green-500"
            } text-white p-2 rounded-lg`}
          >
            {mainStatus ? "Cancel Edit" : "Edit Main Status"}
          </button>
        </div>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Manager</button>
        <button type="button" onClick={() => setIsOpen(false)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditManager;
