import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { enableTwoFactorAuth } from "../features/auth/authSlice";

const TwoFactorAuth = () => {
  const [twoFactor, setTwoFactor] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  console.log(user);
  const handleEnableTwoFactorAuth = () => {
    dispatch(enableTwoFactorAuth());
    setTwoFactor(true);
  };

  return (
    <div>
      <h2>Two-Factor Authentication</h2>
      {/* {isError && <div className="error">{isError}</div>} */}
      {twoFactor ? (
        <div>
          <img
            src={user.twoFactorAuthQrCode}
            alt="Two-Factor Authentication QR Code"
          />
          <p>
            Scan this QR code with your authenticator app to enable two-factor
            authentication.
          </p>
        </div>
      ) : (
        <button onClick={handleEnableTwoFactorAuth}>
          Enable Two-Factor Authentication
        </button>
      )}
    </div>
  );
};

export default TwoFactorAuth;
