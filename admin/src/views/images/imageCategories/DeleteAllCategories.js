import React, { useEffect, useState } from "react";
import { checkAdminPass } from "../../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteImgCategories } from "../../../features/images/imageCategories/imgCategorySlice";

const DeleteAllCategories = ({ setIsDeleteAll }) => {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);
  const [checkDelete, setCheckDelete] = useState(false);

  const { user, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (message === "Password verified") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [message]);

  const handleDelete = () => {
    setCheckDelete(true);
  };

  const handleCheckInput = (e) => {
    if (user.role === "administrator") {
      const data = { email: user.email, password: e.target.value };
      dispatch(checkAdminPass(data));
    } else {
      setDisabled(true);
    }
  };

  const handleDeleteAll = () => {
    dispatch(deleteImgCategories());
    setIsDeleteAll(false);
  };

  return (
    <div>
      <h2>Are you sure you want to delete? </h2>
      <button onClick={handleDelete}>confirm</button>
      <button
        onClick={() => {
          dispatch(checkAdminPass({ email: user.email, password: "" }));
          setIsDeleteAll(false);
        }}
      >
        Cancel
      </button>
      {checkDelete && (
        <>
          <h2>Enter the admin password to delete all product types:</h2>
          <input type="password" onBlur={handleCheckInput} />
          <button
            className={`product ml-5 bg-red-600 p-[10px] rounded-[12px] ${
              disabled
                ? "text-gray-300 opacity-80 cursor-not-allowed"
                : "text-white opacity-100 cursor-pointer"
            }`}
            disabled={disabled}
            onClick={handleDeleteAll}
          >
            Delete Everything
          </button>
        </>
      )}
    </div>
  );
};

export default DeleteAllCategories;
