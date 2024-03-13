// show token is expired content if it is expired and the form if it is not expired

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { resetPassword, messageClear } from "../features/auth/authSlice";

const Resetpassword = () => {
  const location = useLocation();
  const getToken = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const [enteredPassword, setEnteredPassword] = useState("");

  const handleChange = (e) => {
    setEnteredPassword(e.target.value);
  };

  const { isSuccess, isError } = authState;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ token: getToken, password: enteredPassword }));
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
      dispatch(messageClear());
    }
    if (isError) {
      navigate("");
    }
  }, [isSuccess, isError]);

  return (
    <>
      <div class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Password</h3>
              <form
                onSubmit={handleSubmit}
                className="d-flex flex-column gap-15"
              >
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={enteredPassword}
                  onChange={handleChange}
                  // onBlur={formik.handleBlur('password')}
                />

                <div>
                  <div className="mt-3 d-flex justify-center gap-15 items-center">
                    <button className="button border-0">Reset</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Resetpassword;
