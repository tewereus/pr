import React, { useState, useEffect } from "react";
import { getAllProducts } from "../../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import AddProduct from "./AddProduct";
import DeleteAllProducts from "./DeleteAllProducts";
import EditProduct from "./EditProduct";

Modal.setAppElement("#root");

const Products = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteAll, setIsDeleteAll] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  const { products } = useSelector((state) => state.products);
  const handleAddProduct = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div>
        {products.map((product) => {
          return (
            <div key={product._id}>
              <p>{product.title}</p>
              <p>{product.basePrice}</p>
            </div>
          );
        })}
      </div>
      <button onClick={handleAddProduct}>Add Product</button>
      {isOpen && (
        <>
          <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            contentLabel="Add Product"
          >
            <AddProduct setIsOpen={setIsOpen} />
          </Modal>
        </>
      )}
      <button onClick={() => setIsDeleteAll(true)}>Delete All</button>
      {isDeleteAll && (
        <Modal
          isOpen={isDeleteAll}
          onRequestClose={() => setIsDeleteAll(false)}
          contentLabel="Delete All Products"
        >
          <DeleteAllProducts setDeleteModal={setIsDeleteAll} />
        </Modal>
      )}
      <button
        onClick={() => {
          setIsEdit(true);
        }}
      >
        Edit Product
      </button>
      {isEdit && (
        <Modal
          isOpen={isEdit}
          onRequestClose={() => setIsEdit(false)}
          contentLabel="Update Product"
        >
          <EditProduct setEditModal={setIsEdit} />
        </Modal>
      )}
    </>
  );
};
export default Products;
