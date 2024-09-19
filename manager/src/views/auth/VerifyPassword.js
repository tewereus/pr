import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyPassword } from "../../store/auth/authSlice";

const VerifyPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getToken = location.pathname.split("/")[2];

  const [enteredValue, setEnteredValue] = useState("");

  const { isSuccess, isError, message } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      token: getToken,
      data: {
        password: enteredValue,
      },
    };
    // console.log(getToken);
    dispatch(verifyPassword(data));
  };

  useEffect(() => {
    if (isSuccess === true && message === "verified manager password") {
      navigate("login");
    }
    console.log(isSuccess, isError);
  }, [isSuccess, isError]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="password"
          value={enteredValue}
          placeholder="Password"
          onChange={(e) => setEnteredValue(e.target.value)}
          className="border rounded-lg h-10 pl-2 m-4"
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default VerifyPassword;
