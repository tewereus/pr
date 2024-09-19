import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="flex justify-around items-center">
      <div>{user.username}</div>
      <div>{user.name}</div>
    </div>
  );
};

export default Profile;
