import React, { useEffect } from "react";

const EditManager = ({ setIsOpen, selectedUser }) => {
  useEffect(() => {
    console.log(selectedUser);
  }, []);

  return <div>EditManager</div>;
};

export default EditManager;
