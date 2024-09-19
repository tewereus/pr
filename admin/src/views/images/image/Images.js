import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import DeleteAllImages from "./DeleteAllImages";
import DeleteImage from "./DeleteImage";
import EditImage from "./EditImage";
import AddImage from "./AddImage";
import { getAllImages } from "../../../store/images/imageSlice";

const Images = () => {
  const dispatch = useDispatch();
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isDeleteAll, setIsDeleteAll] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modifyImage, setModifyImage] = useState(null);

  useEffect(() => {
    dispatch(getAllImages());
  }, []);

  const handleSelect = (image) => {
    console.log(image);
    setSelectedImage(image);
  };
  const handleEdit = () => {
    setModifyImage(selectedImage);
    setIsEdit(true);
  };

  const handleDelete = () => {
    setModifyImage(selectedImage);
    setIsDelete(true);
  };

  const handleDeleteAll = () => {
    setIsDeleteAll(true);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.closest(".image") === null) {
        setSelectedImage(null);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const { imageTypes } = useSelector((state) => state.imageTypes);
  return (
    <>
      {imageTypes.length > 0 ? (
        <div style={{ display: "flex" }}>
          {imageTypes.map((image) => {
            return (
              <div
                key={image._id}
                className={`image m-[20px] p-[20px] cursor-pointer ${
                  selectedImage && selectedImage._id === image._id
                    ? "bg-gray-200 text-gray-800 border border-gray-400"
                    : "bg-white-700 text-black border-none"
                }`}
                onClick={() => handleSelect(image)}
              >
                <p>{image.image_type}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No images found.</p>
      )}
      <button
        className={`ml-5 bg-blue-700 p-[10px] text-white rounded-[12px] cursor-pointer`}
        onClick={() => setIsAdd(true)}
      >
        Add Image
      </button>

      {isAdd && (
        <Modal
          isOpen={isAdd}
          onRequestClose={() => setIsAdd(false)}
          contentLabel="Add image"
        >
          <AddImage setIsAdd={setIsAdd} />
        </Modal>
      )}
      <button
        className={`image ml-5 bg-green-700 p-[10px] rounded-[12px] ${
          selectedImage
            ? "text-white opacity-100 cursor-pointer"
            : "text-gray-300 opacity-80 cursor-not-allowed "
        }`}
        onClick={handleEdit}
        disabled={selectedImage ? false : true}
      >
        Edit Image
      </button>
      {isEdit && (
        <Modal
          isOpen={isEdit}
          onRequestClose={() => setIsEdit(false)}
          contentLabel="Edit image"
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
          <EditImage setIsEdit={setIsEdit} selectedImage={modifyImage} />
        </Modal>
      )}
      <button
        className={`image ml-5 bg-red-600 p-[10px] rounded-[12px] ${
          selectedImage
            ? "text-white opacity-100 cursor-pointer"
            : "text-gray-300 opacity-80 cursor-not-allowed"
        }`}
        onClick={handleDelete}
        disabled={selectedImage ? false : true}
      >
        Delete Image
      </button>
      {isDelete && (
        <Modal
          isOpen={isDelete}
          onRequestClose={() => setIsDelete(false)}
          contentLabel="Delete image"
        >
          <DeleteImage setIsDelete={setIsDelete} selectedImage={modifyImage} />
        </Modal>
      )}
      <button
        className={`image ml-5 bg-red-600 p-[10px] rounded-[12px] ${
          imageTypes.length > 0
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
          contentLabel="Delete All images"
        >
          <DeleteAllImages setIsDeleteAll={setIsDeleteAll} />
        </Modal>
      )}
    </>
  );
};

export default Images;
