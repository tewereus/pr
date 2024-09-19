import { deleteProduct } from "../../store/products/productSlice";
import { useDispatch } from "react-redux";

const DeleteProduct = ({ setDeleteModal, selectedProduct }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteProduct(selectedProduct._id));
    setDeleteModal(false);
  };

  return (
    <div>
      <h2>Are you sure you want to delete? </h2>
      <button onClick={handleDelete}>confirm </button>
      <button onClick={() => setDeleteModal(false)}>Cancel</button>
    </div>
  );
};

export default DeleteProduct;
