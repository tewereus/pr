import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Waiting = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user?.main_status !== "waiting") {
      navigate(-1, { replace: true });
    }
  }, []);
  return (
    <div onClick={() => console.log(user)}>
      Waiting Page, please wait while the admin verifies this account
    </div>
  );
};

export default Waiting;
