import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { allImgCategories } from "../../../features/images/imageCategories/imgCategorySlice";
import AddImgCategory from "./AddImgCategory";
import EditImgCategory from "./EditImgCategory";
import DeleteImgCategory from "./DeleteImgCategory";
import DeleteAllCategories from "./DeleteAllCategories";
import { getAllImgTypes } from "../../../features/images/imageTypes/imgTypeSlice";

const ImageCategories = () => {
  const dispatch = useDispatch();
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isDeleteAll, setIsDeleteAll] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modifyImage, setModifyImage] = useState(null);

  useEffect(() => {
    dispatch(allImgCategories());
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

  const { imgCategories } = useSelector((state) => state.imgCategories);
  return (
    <>
      {imgCategories.length > 0 ? (
        <div style={{ display: "flex" }}>
          {imgCategories.map((image) => {
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
                <p>{image.image_category}</p>
                <p>
                  <i>{image.image_type.image_type}</i>
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No image category found.</p>
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
          contentLabel="Add image type"
        >
          <AddImgCategory setIsAdd={setIsAdd} />
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
        Edit Category
      </button>
      {isEdit && (
        <Modal
          isOpen={isEdit}
          onRequestClose={() => setIsEdit(false)}
          contentLabel="Edit image type"
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
          <EditImgCategory setIsEdit={setIsEdit} selectedImage={modifyImage} />
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
        Delete Category
      </button>
      {isDelete && (
        <Modal
          isOpen={isDelete}
          onRequestClose={() => setIsDelete(false)}
          contentLabel="Delete image type"
        >
          <DeleteImgCategory
            setIsDelete={setIsDelete}
            selectedImage={modifyImage}
          />
        </Modal>
      )}
      <button
        className={`image ml-5 bg-red-600 p-[10px] rounded-[12px] ${
          imgCategories.length > 0
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
          contentLabel="Delete All image type"
        >
          <DeleteAllCategories setIsDeleteAll={setIsDeleteAll} />
        </Modal>
      )}
    </>
  );
};

export default ImageCategories;
