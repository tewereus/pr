import React, { useState, useEffect } from "react";
import { getAllProdTypes } from "../../features/productType/prodTypeSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import AddProductType from "./AddProductType";
import EditProductType from "./EditProductType";
import DeleteProductType from "./DeleteProductType";
import DeleteAllProductTypes from "./DeleteAllProductTypes";

const ProductTypes = () => {
  const dispatch = useDispatch();
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isDeleteAll, setIsDeleteAll] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modifyProduct, setModifyProduct] = useState(null);

  useEffect(() => {
    dispatch(getAllProdTypes());
  }, []);

  const handleSelect = (product) => {
    console.log(product);
    setSelectedProduct(product);
  };
  const handleEdit = () => {
    setModifyProduct(selectedProduct);
    setIsEdit(true);
  };

  const handleDelete = () => {
    setModifyProduct(selectedProduct);
    setIsDelete(true);
  };

  const handleDeleteAll = () => {
    setIsDeleteAll(true);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.closest(".product") === null) {
        setSelectedProduct(null);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const { productTypes } = useSelector((state) => state.productTypes);
  return (
    <>
      {productTypes.length > 0 ? (
        <div style={{ display: "flex" }}>
          {productTypes.map((product) => {
            return (
              <div
                key={product._id}
                className={`product m-[20px] p-[20px] cursor-pointer ${
                  selectedProduct && selectedProduct._id === product._id
                    ? "bg-gray-200 text-gray-800 border border-gray-400"
                    : "bg-white-700 text-black border-none"
                }`}
                onClick={() => handleSelect(product)}
              >
                <p>{product.productName}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No product types found.</p>
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
          contentLabel="Add product type"
        >
          <AddProductType setIsAdd={setIsAdd} />
        </Modal>
      )}
      <button
        className={`product ml-5 bg-green-700 p-[10px] rounded-[12px] ${
          selectedProduct
            ? "text-white opacity-100 cursor-pointer"
            : "text-gray-300 opacity-80 cursor-not-allowed "
        }`}
        onClick={handleEdit}
        disabled={selectedProduct ? false : true}
      >
        Edit Product
      </button>
      {isEdit && (
        <Modal
          isOpen={isEdit}
          onRequestClose={() => setIsEdit(false)}
          contentLabel="Edit product type"
        >
          <EditProductType
            setIsEdit={setIsEdit}
            selectedProduct={modifyProduct}
          />
        </Modal>
      )}
      <button
        className={`product ml-5 bg-red-600 p-[10px] rounded-[12px] ${
          selectedProduct
            ? "text-white opacity-100 cursor-pointer"
            : "text-gray-300 opacity-80 cursor-not-allowed"
        }`}
        onClick={handleDelete}
        disabled={selectedProduct ? false : true}
      >
        Delete Product
      </button>
      {isDelete && (
        <Modal
          isOpen={isDelete}
          onRequestClose={() => setIsDelete(false)}
          contentLabel="Delete product type"
        >
          <DeleteProductType
            setIsDelete={setIsDelete}
            selectedProduct={modifyProduct}
          />
        </Modal>
      )}
      <button
        className={`product ml-5 bg-red-600 p-[10px] rounded-[12px] ${
          productTypes.length > 0
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
          contentLabel="Delete All product type"
        >
          <DeleteAllProductTypes setIsDeleteAll={setIsDeleteAll} />
        </Modal>
      )}
    </>
  );
};

export default ProductTypes;
