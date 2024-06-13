import React, { useState, useEffect } from "react";
import { getAllProdTypes } from "../../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import AddProductType from "./AddProductType";

const ProductTypes = () => {
  const dispatch = useDispatch();
  const [isAdd, setIsAdd] = useState(false);

  useEffect(() => {
    dispatch(getAllProdTypes());
  }, []);

  return (
    <>
      <button onClick={() => setIsAdd(true)}>Add New</button>
      <table>
        <tr>
          <th>Name</th>
          <th>fabric</th>
          <th>actions</th>
        </tr>
      </table>
      {isAdd && (
        <Modal
          isOpen={isAdd}
          onRequestClose={() => setIsAdd(false)}
          contentLabel="Add product table"
        >
          <AddProductType setIsAdd={setIsAdd} />
        </Modal>
      )}
    </>
  );
};

export default ProductTypes;
