import React, { useState, useEffect } from "react";
import { getAllProdTypes } from "../../features/productType/prodTypeSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import AddProductType from "./AddProductType";
import EditProductType from "./EditProductType";

const ProductTypes = () => {
  const dispatch = useDispatch();
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
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
                className="product"
                style={{
                  margin: "20px",
                  padding: "20px",
                  backgroundColor:
                    selectedProduct && selectedProduct._id === product._id
                      ? "#ddd"
                      : "#fff",
                  color:
                    selectedProduct && selectedProduct._id === product._id
                      ? "#fff"
                      : "#000",
                  border:
                    selectedProduct && selectedProduct._id === product._id
                      ? "1px solid #007"
                      : "none",
                }}
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
      <button onClick={() => setIsAdd(true)}>Add New</button>

      {isAdd && (
        <Modal
          isOpen={isAdd}
          onRequestClose={() => setIsAdd(false)}
          contentLabel="Add product type"
        >
          <AddProductType setIsAdd={setIsAdd} />
        </Modal>
      )}
      {isEdit && (
        <Modal
          isOpen={isEdit}
          onRequestClose={() => setIsEdit(false)}
          contentLabel="Edit product type"
        >
          {/* <EditProductType setIsEdit={setIsEdit} /> */}
          <p>Edit</p>
        </Modal>
      )}
      {isDelete && (
        <Modal
          isOpen={isDelete}
          onRequestClose={() => setIsDelete(false)}
          contentLabel="Delete product table"
        >
          {/* <DeleteProductType setIsDelete={setIsDelete} /> */}
          <p>Delete</p>
        </Modal>
      )}
      <button onClick={() => setIsEdit(true)}>Edit</button>
      <button onClick={() => setIsDelete(true)}>Delete</button>
    </>
  );
};

export default ProductTypes;
