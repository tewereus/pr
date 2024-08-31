import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

useDispatch;

const CheckManager = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getToken = location.pathname.split("/")[2];

  const [enteredValue, setEnteredValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(getToken);
    dispatch(checkManager({ token: getToken, enteredValue }));
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

export default CheckManager;
