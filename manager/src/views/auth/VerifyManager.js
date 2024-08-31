import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { verifyManager } from "../../features/auth/authSlice";

const VerifyManager = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getToken = location.pathname.split("/")[2];

  const [enteredValue, setEnteredValue] = useState("");

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
