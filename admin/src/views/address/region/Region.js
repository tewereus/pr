import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
// import AddColor from "./AddColor";
// import EditColor from "./EditColor";
// import DeleteColor from "./DeleteColor";
// import DeleteAllColors from "./DeleteAllColors";
import { getAllRegions } from "../../../store/address/region/regionSlice";

const Region = () => {
  const dispatch = useDispatch();
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isDeleteAll, setIsDeleteAll] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [modifyRegion, setModifyRegion] = useState(null);

  useEffect(() => {
    dispatch(getAllRegions());
  }, []);

  const handleSelect = (region) => {
    // console.log(region);
    setSelectedRegion(region);
  };
  const handleEdit = () => {
    setModifyRegion(selectedRegion);
    setIsEdit(true);
  };

  const handleDelete = () => {
    setModifyRegion(selectedRegion);
    setIsDelete(true);
  };

  const handleDeleteAll = () => {
    setIsDeleteAll(true);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.closest(".region") === null) {
        setSelectedRegion(null);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const { regions } = useSelector((state) => state.regions);
  return (
    <>
      {regions?.length > 0 ? (
        <div style={{ display: "flex" }}>
          {regions.map((region) => {
            return (
              <div
                key={region._id}
                className={`region m-[20px] p-[20px] cursor-pointer dark:text-white ${
                  selectedRegion && selectedRegion._id === region._id
                    ? " text-gray-800 border border-gray-400"
                    : " text-black border-none"
                }`}
                onClick={() => handleSelect(region)}
              >
                {/* <div
                  style={{ background: region.hex_code }}
                  className={`w-[100px] h-[100px] border-none rounded-full`}
                ></div> */}
                {/* <p className="text-center">{region.region}</p> */}
              </div>
            );
          })}
        </div>
      ) : (
        <p>No Region found.</p>
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
          contentLabel="Add region"
        >
          {/* <AddColor setIsAdd={setIsAdd} /> */}
        </Modal>
      )}
      <button
        className={`region ml-5 bg-green-700 p-[10px] rounded-[12px] ${
          selectedRegion
            ? "text-white opacity-100 cursor-pointer"
            : "text-gray-300 opacity-80 cursor-not-allowed "
        }`}
        onClick={handleEdit}
        disabled={selectedRegion ? false : true}
      >
        Edit Color
      </button>
      {isEdit && (
        <Modal
          isOpen={isEdit}
          onRequestClose={() => setIsEdit(false)}
          contentLabel="Edit region"
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
          {/* <EditColor setIsEdit={setIsEdit} selectedRegion={modifyRegion} /> */}
        </Modal>
      )}
      <button
        className={`region ml-5 bg-red-600 p-[10px] rounded-[12px] ${
          selectedRegion
            ? "text-white opacity-100 cursor-pointer"
            : "text-gray-300 opacity-80 cursor-not-allowed"
        }`}
        onClick={handleDelete}
        disabled={selectedRegion ? false : true}
      >
        Delete Color
      </button>
      {isDelete && (
        <Modal
          isOpen={isDelete}
          onRequestClose={() => setIsDelete(false)}
          contentLabel="Delete region"
        >
          {/* <DeleteColor setIsDelete={setIsDelete} selectedRegion={modifyRegion} /> */}
        </Modal>
      )}
      <button
        className={`region ml-5 bg-red-600 p-[10px] rounded-[12px] ${
          regions.length > 0
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
          contentLabel="Delete All Region"
        >
          {/* <DeleteAllRegion setIsDeleteAll={setIsDeleteAll} /> */}
        </Modal>
      )}
    </>
  );
};

export default Region;
