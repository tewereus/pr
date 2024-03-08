import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login, messageClear } from "../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [enteredValue, setEnteredValue] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setEnteredValue({
      ...enteredValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(enteredValue));
  };

  const authState = useSelector((state) => state.auth);
  const { user, isLoading, isError, isSuccess } = authState;
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      dispatch(messageClear());
      console.log(user);
    } else {
      navigate("");
    }
  }, [isSuccess, user, isLoading, isError]);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={enteredValue.email}
          onChange={handleInputChange}
          name="email"
          id="email"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={enteredValue.password}
          onChange={handleInputChange}
          name="password"
          id="password"
        />
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default Login;
