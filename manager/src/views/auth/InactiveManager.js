import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { managerInfo } from "../../features/auth/authSlice";

const InactiveManager = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getToken = location.pathname.split("/")[2];
  const [enteredValue, setEnteredValue] = useState({
    fullname: "",
    // username: "",
    password: "",
    confirmPassword: "",
    email: "",
    profile: "",
  });
  const formIsValid = false;

  const handleInputChange = (e) => {
    setEnteredValue({
      ...enteredValue,
      [e.target.name]: e.target.value,
    });
  };

  const { isSuccess, isError, user } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      token: getToken,
      data: {
        fullname: enteredValue.fullname,
        //   username: enteredValue.username,
        password: enteredValue.password,
        email: enteredValue.email,
        profile: enteredValue.profile,
      },
    };
    dispatch(managerInfo(data));
  };
  useEffect(() => {
    if (isSuccess === true && message === "manager Info updated") {
      navigate("pending");
    }
  }, [isSuccess, isError]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fullname">Full Name</label>
        <input
          type="text"
          value={enteredValue.fullname}
          onChange={handleInputChange}
          id="fullname"
          name="fullname"
          required
        />
        {/* <label htmlFor="username">username</label>
        <input
          type="text"
          value={enteredValue.username}
          onChange={handleInputChange}
          id="username"
          name="username"
          required
        /> */}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={enteredValue.email}
          onChange={handleInputChange}
          id="email"
          name="email"
          required
        />
        {/* <label htmlFor="mobile">Mobile</label>
        <input
          type="text"
          value={enteredValue.mobile}
          onChange={handleInputChange}
          id="mobile"
          name="mobile"
          required
        /> */}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={enteredValue.password}
          onChange={handleInputChange}
          id="password"
          name="password"
          required
        />
        <label htmlFor="confirmPassword">confirm password</label>
        <input
          type="password"
          value={enteredValue.confirmPassword}
          onChange={handleInputChange}
          id="confirmPassword"
          name="confirmPassword"
          required
        />
        <label htmlFor="profile">profile</label>
        <input
          type="file"
          accept="image/*"
          value={enteredValue.profile}
          onChange={handleInputChange}
          id="profile"
          name="profile"
        />
        <button>Submit</button>
      </form>
    </>
  );
};

export default InactiveManager;
