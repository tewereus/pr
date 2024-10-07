import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { login, resetAuthState } from "../../store/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [enteredPassword, setEnteredPassword] = useState("");
  const location = useLocation();
  const getToken = location.pathname.split("/")[2];

  const { user, isSuccess, message } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user?.main_status !== "active") {
      navigate(-1, { replace: true });
    }
  }, []);

  const handlePassword = (e) => {
    setEnteredPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      token: getToken,
      data: {
        password: enteredPassword,
      },
    };
    dispatch(login(data));
  };

  useEffect(() => {
    if (isSuccess) {
      if (message === "Logged in successfully") {
        dispatch(resetAuthState());
        navigate("/manager");
      }
    }
  }, [isSuccess, message]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        name="password"
        value={enteredPassword}
        onChange={handlePassword}
        required
      />
      <button>Login</button>
    </form>
  );
};

export default Login;
