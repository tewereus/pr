import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  register,
  verifyEmail,
  messageClear,
} from "../features/auth/authSlice";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const [enteredOTP, setEnteredOTP] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { enteredValue } = location.state || {};
  const handleOTPChange = (e) => {
    setEnteredOTP(e.target.value);
  };
  const authState = useSelector((state) => state.auth);
  const otp = authState?.otp?.otp;

  enteredValue.otp = otp;
  const validOtp = enteredOTP === otp;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(messageClear());
    console.log(authState);
    if (validOtp) {
      dispatch(register(enteredValue))
        .unwrap()
        .then(() => {
          console.log("Registration successful");
          navigate("/login");
          dispatch(messageClear());
        })
        .catch((error) => {
          navigate("/");
          toast.error("Registration failed. Please try again.");
        });
    } else {
      alert("Incorrect OTP. Please try again.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="otp">OTP</label>
        <input
          type="number"
          value={enteredOTP}
          onChange={handleOTPChange}
          id="otp"
          name="otp"
          required
        />
        <button>Verify</button>
        <p
          onClick={() => {
            console.log(authState);
          }}
        >
          click
        </p>
      </form>
      <button
        onClick={() => {
          dispatch(verifyEmail(enteredValue.email));
        }}
      >
        Resend Otp
      </button>
    </>
  );
};

export default VerifyEmail;
