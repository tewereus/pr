import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyManager } from "../../store/auth/authSlice";

const VerifyManager = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getToken = location.pathname.split("/")[2];

  const [enteredValue, setEnteredValue] = useState("");

  const { isSuccess, isError, message, user } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      token: getToken,
      data: {
        mobile: enteredValue,
      },
    };
    // console.log(getToken);
    dispatch(verifyManager(data));
  };

  useEffect(() => {
    if (isSuccess === true && message === "verified manager") {
      // console.log(user.main_status);
      if (user.main_status === "inactive") {
        navigate("manager-info");
      } else if (user.main_status === "waiting") {
        navigate("waiting");
      } else if (user.main_status === "unavailable") {
        navigate("unavailable");
      } else if (user.main_status === "active") {
        navigate("login");
      }

      // navigate("verify-password");
    }
  }, [isSuccess, isError]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="mobile"
          value={enteredValue}
          placeholder="Mobile"
          onChange={(e) => setEnteredValue(e.target.value)}
          className="border rounded-lg h-10 pl-2 m-4"
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default VerifyManager;
