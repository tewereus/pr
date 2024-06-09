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
  const [selectedProduct, setSelectedProduct] = useState(null);
  // const [selectedProducts, setSelectedProducts] = useState([]);
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  const { products } = useSelector((state) => state.products);
  const handleAddProduct = () => {
    setIsOpen(true);
  };

  const handleSelect = (product) => {
    console.log(product);
    // setSelectedProducts([...selectedProducts, product]);
    setSelectedProduct(product);
    // console.log(selectedProducts);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        e.target.closest(".product") === null &&
        !e.target.closest(".modify-product") === null
      ) {
        setSelectedProduct(null);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div style={{ display: "flex" }}>
        {products.map((product) => {
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
        disabled={selectedProduct ? false : true}
        style={{ backgroundColor: "#080", color: "#bbb", cursor: "disabled" }}
      >
        Edit Product
      </button>
      <div className="modify-product">
        {isEdit && (
          <Modal
            isOpen={isEdit}
            onRequestClose={() => setIsEdit(false)}
            contentLabel="Update Product"
          >
            <EditProduct
              setEditModal={setIsEdit}
              selectedProduct={selectedProduct}
            />
          </Modal>
        )}
      </div>
    </>
  );
};
export default Products;
