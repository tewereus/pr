import React, { useState, useEffect } from "react";
import { getAllProducts } from "../../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import AddProduct from "./AddProduct";
import DeleteAllProducts from "./DeleteAllProducts";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import { getAllColors } from "../../features/color/colorSlice";

Modal.setAppElement("#root");

const Products = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteAll, setIsDeleteAll] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modifyProduct, setModifyProduct] = useState(null);
  // const [selectedProducts, setSelectedProducts] = useState([]);
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllColors());
  }, []);
  const { products } = useSelector((state) => state.products);
  const { productTypes } = useSelector((state) => state.productTypes);
  const handleAddProduct = () => {
    setIsOpen(true);
  };

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

  return (
    <>
      {products.length > 0 ? (
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
                <p>Product Name: {product.title}</p>
                <p>Price: {product.basePrice}</p>
                <p>type: {product.product_type.productName}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No products found.</p>
      )}
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
        onClick={handleEdit}
        disabled={selectedProduct ? false : true}
        style={{ backgroundColor: "#080", color: "#bbb", cursor: "disabled" }}
        className="product"
      >
        Edit Product
      </button>
      <div>
        {isEdit && (
          <Modal
            isOpen={isEdit}
            onRequestClose={() => setIsEdit(false)}
            contentLabel="Update Product"
          >
            <EditProduct
              setEditModal={setIsEdit}
              selectedProduct={modifyProduct}
            />
          </Modal>
        )}
      </div>

      <button
        className="product"
        onClick={handleDelete}
        disabled={selectedProduct ? false : true}
        style={{ backgroundColor: "#800", color: "#bbb", cursor: "disabled" }}
      >
        Delete Product
      </button>
      <div>
        {isDelete && (
          <Modal
            isOpen={isDelete}
            onRequestClose={() => setIsDelete(false)}
            contentLabel="Delete Product"
          >
            <DeleteProduct
              setDeleteModal={setIsDelete}
              selectedProduct={modifyProduct}
            />
          </Modal>
        )}
      </div>
    </>
  );
};
export default Products;
