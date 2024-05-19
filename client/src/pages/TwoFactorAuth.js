import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { enableTwoFactorAuth } from "./userSlice";

const TwoFactorAuth = () => {
  const dispatch = useDispatch();
  const { twoFactorAuthQrCode, error } = useSelector((state) => state.user);

  const handleEnableTwoFactorAuth = () => {
    dispatch(enableTwoFactorAuth());
  };

  return (
    <div>
      <h2>Two-Factor Authentication</h2>
      {error && <div className="error">{error}</div>}
      {twoFactorAuthQrCode ? (
        <div>
          <img
            src={twoFactorAuthQrCode}
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
