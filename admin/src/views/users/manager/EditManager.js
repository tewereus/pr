import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateManager } from "../../../features/users/userSlice";

const EditManager = ({ setIsOpen, selectedUser }) => {
  const dispatch = useDispatch();
  const [manager, setManager] = useState(selectedUser);
  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    status: "",
    main_status: "",
    fullname: "",
  });

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
    console.log(data);
    dispatch(updateManager({ id: manager._id, ...formData }));
    setIsOpen(false);
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
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Main Status:</label>
          <input
            type="text"
            name="main_status"
            value={formData.main_status}
            onChange={handleChange}
            required
          />
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
