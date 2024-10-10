import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
// import AddColor from "./AddColor";
// import EditColor from "./EditColor";
// import DeleteColor from "./DeleteColor";
// import DeleteAllColors from "./DeleteAllColors";
import { getAllCountries } from "../../../store/address/country/countrySlice";

const Country = () => {
  const dispatch = useDispatch();
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isDeleteAll, setIsDeleteAll] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [modifyCountry, setModifyCountry] = useState(null);

  useEffect(() => {
    dispatch(getAllCountries());
  }, []);

  const handleSelect = (country) => {
    // console.log(country);
    setSelectedCountry(country);
  };
  const handleEdit = () => {
    setModifyCountry(selectedCountry);
    setIsEdit(true);
  };

  const handleDelete = () => {
    setModifyCountry(selectedCountry);
    setIsDelete(true);
  };

  const handleDeleteAll = () => {
    setIsDeleteAll(true);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.closest(".country") === null) {
        setSelectedCountry(null);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const { countries } = useSelector((state) => state.countries);
  return (
    <>
      {countries?.length > 0 ? (
        <div style={{ display: "flex" }}>
          {countries.map((country) => {
            return (
              <div
                key={country._id}
                className={`country m-[20px] p-[20px] cursor-pointer dark:text-white ${
                  selectedCountry && selectedCountry._id === country._id
                    ? " text-gray-800 border border-gray-400"
                    : " text-black border-none"
                }`}
                onClick={() => handleSelect(country)}
              >
                {/* <div
                  style={{ background: country.hex_code }}
                  className={`w-[100px] h-[100px] border-none rounded-full`}
                ></div> */}
                {/* <p className="text-center">{country.country}</p> */}
              </div>
            );
          })}
        </div>
      ) : (
        <p>No Country found.</p>
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
          contentLabel="Add country"
        >
          {/* <AddColor setIsAdd={setIsAdd} /> */}
        </Modal>
      )}
      <button
        className={`country ml-5 bg-green-700 p-[10px] rounded-[12px] ${
          selectedCountry
            ? "text-white opacity-100 cursor-pointer"
            : "text-gray-300 opacity-80 cursor-not-allowed "
        }`}
        onClick={handleEdit}
        disabled={selectedCountry ? false : true}
      >
        Edit Color
      </button>
      {isEdit && (
        <Modal
          isOpen={isEdit}
          onRequestClose={() => setIsEdit(false)}
          contentLabel="Edit country"
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
          {/* <EditColor setIsEdit={setIsEdit} selectedCountry={modifyCountry} /> */}
        </Modal>
      )}
      <button
        className={`country ml-5 bg-red-600 p-[10px] rounded-[12px] ${
          selectedCountry
            ? "text-white opacity-100 cursor-pointer"
            : "text-gray-300 opacity-80 cursor-not-allowed"
        }`}
        onClick={handleDelete}
        disabled={selectedCountry ? false : true}
      >
        Delete Color
      </button>
      {isDelete && (
        <Modal
          isOpen={isDelete}
          onRequestClose={() => setIsDelete(false)}
          contentLabel="Delete country"
        >
          {/* <DeleteColor setIsDelete={setIsDelete} selectedCountry={modifyCountry} /> */}
        </Modal>
      )}
      <button
        className={`country ml-5 bg-red-600 p-[10px] rounded-[12px] ${
          countries.length > 0
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
          contentLabel="Delete All Country"
        >
          {/* <DeleteAllCountry setIsDeleteAll={setIsDeleteAll} /> */}
        </Modal>
      )}
    </>
  );
};

export default Country;
