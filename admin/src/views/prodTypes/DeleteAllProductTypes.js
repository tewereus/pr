import React, { useEffect, useState } from "react";
import { deleteAllProdTypes } from "../../features/productType/prodTypeSlice";
import { checkAdminPass } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const DeleteAllProductTypes = ({ setIsDeleteAll }) => {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);
  const [checkDelete, setCheckDelete] = useState(false);
  const [userState, setuserState] = useState({
    email: "",
    password: "",
  });
  const { user, message } = useSelector((state) => state.auth);
  const handleDelete = () => {
    setCheckDelete(true);
  };

  //   const handleCheckInput = (e) => {
  //     if (e.target.value === "Delete Everything") {
  //       setDisabled(false);
  //     }
  //   };

  const handleCheckInput = (e) => {
    if (user.role === "administrator") {
      console.log(user);
      const data = { email: user.email, password: e.target.value };
      dispatch(checkAdminPass(data))
        .then(() => {
          console.log("here");
          setDisabled(false);
        })
        .catch((error) => {
          setDisabled(true);
          consol.log("incorrect password");
        });
    } else {
      setDisabled(true);
    }
  };

  const handleDeleteAll = () => {
    dispatch(deleteAllProdTypes());
    setIsDeleteAll(false);
  };

  return (
    <div>
      <h2>Are you sure you want to delete? </h2>
      <button onClick={handleDelete}>confirm</button>
      <button onClick={() => setIsDeleteAll(false)}>Cancel</button>
      {checkDelete && (
        <>
          <h2>Enter the admin password to delete all product types:</h2>
          <input type="password" onChange={handleCheckInput} />
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

export default DeleteAllProductTypes;
