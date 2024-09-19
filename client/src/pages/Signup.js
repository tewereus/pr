import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  validateUser,
  verifyEmail,
  messageClear,
} from "../store/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [enteredValue, setEnteredValue] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    email: "",
    profile: "",
    otp: "",
  });
  const formIsValid = false;

  const handleInputChange = (e) => {
    setEnteredValue({
      ...enteredValue,
      [e.target.name]: e.target.value,
    });
  };

  const authState = useSelector((state) => state.auth);
  const { isSuccess } = authState;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(validateUser(enteredValue));
  };

  useEffect(() => {
    if (isSuccess && enteredValue) {
      const enteredValueToPass = enteredValue;
      dispatch(verifyEmail(enteredValue.email));
      dispatch(messageClear());
      navigate("/verify-email", {
        state: { enteredValue: enteredValueToPass },
      });
    }
  }, [isSuccess, enteredValue, dispatch, navigate, verifyEmail]);

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
        <label htmlFor="username">username</label>
        <input
          type="text"
          value={enteredValue.username}
          onChange={handleInputChange}
          id="username"
          name="username"
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={enteredValue.email}
          onChange={handleInputChange}
          id="email"
          name="email"
          required
        />
        <label htmlFor="mobile">Mobile</label>
        <input
          type="text"
          value={enteredValue.mobile}
          onChange={handleInputChange}
          id="mobile"
          name="mobile"
          required
        />
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

export default Signup;
