import React, { useState, useEffect } from "react";
import { getAllColors } from "../../features/color/colorSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import AddColor from "./AddColor";
import EditColor from "./EditColor";
import DeleteColor from "./DeleteColor";
import DeleteAllColors from "./DeleteAllColors";

const Colors = () => {
  const dispatch = useDispatch();
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isDeleteAll, setIsDeleteAll] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [modifyColor, setModifyColor] = useState(null);

  useEffect(() => {
    dispatch(getAllColors());
  }, []);

  const handleSelect = (color) => {
    // console.log(color);
    setSelectedColor(color);
  };
  const handleEdit = () => {
    setModifyColor(selectedColor);
    setIsEdit(true);
  };

  const handleDelete = () => {
    setModifyColor(selectedColor);
    setIsDelete(true);
  };

  const handleDeleteAll = () => {
    setIsDeleteAll(true);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.closest(".color") === null) {
        setSelectedColor(null);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const { colors } = useSelector((state) => state.colors);
  return (
    <>
      {colors.length > 0 ? (
        <div style={{ display: "flex" }}>
          {colors.map((color) => {
            return (
              <div
                key={color._id}
                className={`color m-[20px] p-[20px] cursor-pointer ${
                  selectedColor && selectedColor._id === color._id
                    ? " text-gray-800 border border-gray-400"
                    : " text-black border-none"
                }`}
                onClick={() => handleSelect(color)}
              >
                <div
                  className={`w-[100px] h-[100px] bg-[${color.hex_code}] border rounded-full`}
                ></div>
                {/* <p className="text-center">{color.name}</p>
                <p className="text-center">{color.hex_code}</p> */}
              </div>
            );
          })}
        </div>
      ) : (
        <p>No Colors found.</p>
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
          contentLabel="Add color"
        >
          <AddColor setIsAdd={setIsAdd} />
        </Modal>
      )}
      <button
        className={`color ml-5 bg-green-700 p-[10px] rounded-[12px] ${
          selectedColor
            ? "text-white opacity-100 cursor-pointer"
            : "text-gray-300 opacity-80 cursor-not-allowed "
        }`}
        onClick={handleEdit}
        disabled={selectedColor ? false : true}
      >
        Edit Color
      </button>
      {isEdit && (
        <Modal
          isOpen={isEdit}
          onRequestClose={() => setIsEdit(false)}
          contentLabel="Edit color"
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
          <EditColor setIsEdit={setIsEdit} selectedColor={modifyColor} />
        </Modal>
      )}
      <button
        className={`color ml-5 bg-red-600 p-[10px] rounded-[12px] ${
          selectedColor
            ? "text-white opacity-100 cursor-pointer"
            : "text-gray-300 opacity-80 cursor-not-allowed"
        }`}
        onClick={handleDelete}
        disabled={selectedColor ? false : true}
      >
        Delete Color
      </button>
      {isDelete && (
        <Modal
          isOpen={isDelete}
          onRequestClose={() => setIsDelete(false)}
          contentLabel="Delete color"
        >
          <DeleteColor setIsDelete={setIsDelete} selectedColor={modifyColor} />
        </Modal>
      )}
      <button
        className={`color ml-5 bg-red-600 p-[10px] rounded-[12px] ${
          colors.length > 0
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
          contentLabel="Delete All Colors"
        >
          <DeleteAllColors setIsDeleteAll={setIsDeleteAll} />
        </Modal>
      )}
    </>
  );
};

export default Colors;
