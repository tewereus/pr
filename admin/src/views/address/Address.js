import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
// import AddColor from "./AddColor";
// import EditColor from "./EditColor";
// import DeleteColor from "./DeleteColor";
// import DeleteAllColors from "./DeleteAllColors";
import { getAllAddresses } from "../../store/address/adressSlice";

const Address = () => {
  const dispatch = useDispatch();
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isDeleteAll, setIsDeleteAll] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [modifyAddress, setModifyAddress] = useState(null);

  useEffect(() => {
    dispatch(getAllAddresses());
  }, []);

  const handleSelect = (address) => {
    // console.log(address);
    setSelectedAddress(address);
  };
  const handleEdit = () => {
    setModifyAddress(selectedAddress);
    setIsEdit(true);
  };

  const handleDelete = () => {
    setModifyAddress(selectedAddress);
    setIsDelete(true);
  };

  const handleDeleteAll = () => {
    setIsDeleteAll(true);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.closest(".address") === null) {
        setSelectedAddress(null);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const { addresses } = useSelector((state) => state.addresses);
  return (
    <>
      {addresses?.length > 0 ? (
        <div style={{ display: "flex" }}>
          {addresses.map((address) => {
            return (
              <div
                key={address._id}
                className={`address m-[20px] p-[20px] cursor-pointer dark:text-white ${
                  selectedAddress && selectedAddress._id === address._id
                    ? " text-gray-800 border border-gray-400"
                    : " text-black border-none"
                }`}
                onClick={() => handleSelect(address)}
              >
                {/* <div
                  style={{ background: address.hex_code }}
                  className={`w-[100px] h-[100px] border-none rounded-full`}
                ></div> */}
                <p className="text-center">{address.country}</p>
                <p className="text-center">{address.region}</p>
                <p className="text-center">{address.location}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No Address found.</p>
      )}
      <button
        className={`ml-5 bg-blue-700 p-[10px] text-white rounded-[12px] cursor-pointer`}
        onClick={() => setIsAdd(true)}
      >
        Add New
      </button>

      {isAdd && (
        <Modal
          isOpen={isAdd}
          onRequestClose={() => setIsAdd(false)}
          contentLabel="Add address"
        >
          {/* <AddColor setIsAdd={setIsAdd} /> */}
        </Modal>
      )}
      <button
        className={`address ml-5 bg-green-700 p-[10px] rounded-[12px] ${
          selectedAddress
            ? "text-white opacity-100 cursor-pointer"
            : "text-gray-300 opacity-80 cursor-not-allowed "
        }`}
        onClick={handleEdit}
        disabled={selectedAddress ? false : true}
      >
        Edit Color
      </button>
      {isEdit && (
        <Modal
          isOpen={isEdit}
          onRequestClose={() => setIsEdit(false)}
          contentLabel="Edit address"
          // className="w-[30%] h-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            content: {
              width: "30%",
              height: "auto",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            },
          }}
        >
          {/* <EditColor setIsEdit={setIsEdit} selectedAddress={modifyAddress} /> */}
        </Modal>
      )}
      <button
        className={`address ml-5 bg-red-600 p-[10px] rounded-[12px] ${
          selectedAddress
            ? "text-white opacity-100 cursor-pointer"
            : "text-gray-300 opacity-80 cursor-not-allowed"
        }`}
        onClick={handleDelete}
        disabled={selectedAddress ? false : true}
      >
        Delete Color
      </button>
      {isDelete && (
        <Modal
          isOpen={isDelete}
          onRequestClose={() => setIsDelete(false)}
          contentLabel="Delete address"
        >
          {/* <DeleteColor setIsDelete={setIsDelete} selectedAddress={modifyAddress} /> */}
        </Modal>
      )}
      <button
        className={`address ml-5 bg-red-600 p-[10px] rounded-[12px] ${
          addresses.length > 0
            ? "text-white opacity-100 cursor-pointer"
            : "text-gray-300 opacity-80 cursor-not-allowed"
        }`}
        onClick={handleDeleteAll}
      >
        Delete All
      </button>
      {isDeleteAll && (
        <Modal
          isOpen={isDeleteAll}
          onRequestClose={() => setIsDeleteAll(false)}
          contentLabel="Delete All Address"
        >
          {/* <DeleteAllAddress setIsDeleteAll={setIsDeleteAll} /> */}
        </Modal>
      )}
    </>
  );
};

export default Address;
