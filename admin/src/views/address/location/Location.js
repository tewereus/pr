import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
// import AddColor from "./AddColor";
// import EditColor from "./EditColor";
// import DeleteColor from "./DeleteColor";
// import DeleteAllColors from "./DeleteAllColors";
import { getAllLocations } from "../../../store/address/location/locationSlice";

const Location = () => {
  const dispatch = useDispatch();
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isDeleteAll, setIsDeleteAll] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [modifyLocation, setModifyLocation] = useState(null);

  useEffect(() => {
    dispatch(getAllLocations());
  }, []);

  const handleSelect = (location) => {
    // console.log(location);
    setSelectedLocation(location);
  };
  const handleEdit = () => {
    setModifyLocation(selectedLocation);
    setIsEdit(true);
  };

  const handleDelete = () => {
    setModifyLocation(selectedLocation);
    setIsDelete(true);
  };

  const handleDeleteAll = () => {
    setIsDeleteAll(true);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.closest(".location") === null) {
        setSelectedLocation(null);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const { locations } = useSelector((state) => state.locations);
  return (
    <>
      {locations?.length > 0 ? (
        <div style={{ display: "flex" }}>
          {locations.map((location) => {
            return (
              <div
                key={location._id}
                className={`location m-[20px] p-[20px] cursor-pointer dark:text-white ${
                  selectedLocation && selectedLocation._id === location._id
                    ? " text-gray-800 border border-gray-400"
                    : " text-black border-none"
                }`}
                onClick={() => handleSelect(location)}
              >
                {/* <div
                  style={{ background: location.hex_code }}
                  className={`w-[100px] h-[100px] border-none rounded-full`}
                ></div> */}
                {/* <p className="text-center">{location.location}</p> */}
              </div>
            );
          })}
        </div>
      ) : (
        <p>No Location found.</p>
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
          contentLabel="Add location"
        >
          {/* <AddColor setIsAdd={setIsAdd} /> */}
        </Modal>
      )}
      <button
        className={`location ml-5 bg-green-700 p-[10px] rounded-[12px] ${
          selectedLocation
            ? "text-white opacity-100 cursor-pointer"
            : "text-gray-300 opacity-80 cursor-not-allowed "
        }`}
        onClick={handleEdit}
        disabled={selectedLocation ? false : true}
      >
        Edit Color
      </button>
      {isEdit && (
        <Modal
          isOpen={isEdit}
          onRequestClose={() => setIsEdit(false)}
          contentLabel="Edit location"
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
          {/* <EditColor setIsEdit={setIsEdit} selectedLocation={modifyLocation} /> */}
        </Modal>
      )}
      <button
        className={`location ml-5 bg-red-600 p-[10px] rounded-[12px] ${
          selectedLocation
            ? "text-white opacity-100 cursor-pointer"
            : "text-gray-300 opacity-80 cursor-not-allowed"
        }`}
        onClick={handleDelete}
        disabled={selectedLocation ? false : true}
      >
        Delete Color
      </button>
      {isDelete && (
        <Modal
          isOpen={isDelete}
          onRequestClose={() => setIsDelete(false)}
          contentLabel="Delete location"
        >
          {/* <DeleteColor setIsDelete={setIsDelete} selectedLocation={modifyLocation} /> */}
        </Modal>
      )}
      <button
        className={`location ml-5 bg-red-600 p-[10px] rounded-[12px] ${
          locations.length > 0
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
          contentLabel="Delete All Location"
        >
          {/* <DeleteAllLocation setIsDeleteAll={setIsDeleteAll} /> */}
        </Modal>
      )}
    </>
  );
};

export default Location;
