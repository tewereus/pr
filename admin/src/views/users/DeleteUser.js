import { deleteUser } from "../../store/users/userSlice";
import { useDispatch } from "react-redux";

const DeleteUser = ({ setIsOpen, selectedUser }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteUser(selectedUser._id));
    setIsOpen((prevState) => ({
      ...prevState,
      delete: false,
    }));
  };

  return (
    <div>
      <h2>Are you sure you want to delete? </h2>
      <button onClick={handleDelete}>confirm</button>
      <button onClick={() => setIsOpen((prev) => ({ ...prev, delete: false }))}>
        Cancel
      </button>
    </div>
  );
};

export default DeleteUser;
