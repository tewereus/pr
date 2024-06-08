import React, { useState, useEffect } from "react";
import { getAllProducts } from "../../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import AddProduct from "./AddProduct";

Modal.setAppElement("#root");

const Products = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
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
            <AddProduct />
            <button onClick={() => setIsOpen(false)}>Close Modal</button>
          </Modal>
        </>
      )}
    </>
  );
};
export default Products;
