import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { getAllManagers } from "../../../features/users/userSlice";
import { GiDeadEye, GiEyeTarget } from "react-icons/gi";
import { BsTrash } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import AddManager from "./AddManager";
import Pagination from "../../components/Pagination";
import { FaRegEdit } from "react-icons/fa";
import EditManager from "./EditManager";
import DeleteManager from "./DeleteManager";
import ViewManager from "./ViewManager";

Modal.setAppElement("#root");
const Manager = () => {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const [modifyUser, setModifyUser] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("username");

  useEffect(() => {
    const obj = {
      limit: parseInt(limit),
      page: parseInt(page),
      search,
      searchField,
    };
    dispatch(getAllManagers(obj));
  }, [page, limit, search, searchField]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.tagName !== "TD" && e.target.tagName !== "BUTTON") {
        setSelectedUser(null);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const onLimitChange = (e) => {
    if (e.key === "Enter") {
      const value = parseInt(e.target.value, 10);
      if (!isNaN(value)) {
        setLimit(value);
      } else {
        setLimit(10); // Set a default value if the input is not a valid number
      }
    }
  };
  const handleSearchChange = (e) => {
    if (e.key === "Enter") {
      setSearch(e.target.value);
    }
  };

  const handleRowSelect = (user) => {
    setSelectedUser(user);
    console.log(user);
  };

  const handleEdit = () => {
    if (selectedUser) {
      setModifyUser(selectedUser);
      console.log("Editing user:", selectedUser.username);
    } else {
      console.log("No user selected for editing");
    }
  };

  // const handleUpdate = () => {
  //   if (selectedUser) {
  //     setModifyUser(selectedUser);
  //     // Execute API code for updating
  //     setIsOpen((prevState) => ({
  //       ...prevState,
  //       edit: true,
  //     }));
  //     console.log("Updating user:", selectedUser.username);
  //     console.log("total users: ", totalUsers);
  //   } else {
  //     console.log("No user selected for updating");
  //   }
  // };

  // const handleDelete = () => {
  //   if (selectedUser) {
  //     setModifyUser(selectedUser);

  //     // Execute API code for updating
  //     setIsOpen((prevState) => ({
  //       ...prevState,
  //       delete: true,
  //     }));
  //     console.log("Deleting user:", selectedUser.username);
  //     console.log("total users: ", totalUsers);
  //   } else {
  //     console.log("No user selected for Deleting");
  //   }
  // };

  const { users, totalUsers, isLoading } = useSelector((state) => state.users);
  return (
    <div>
      <div className="search-container h-200 pb-30 border-3">
        <input
          type="text"
          placeholder="Search users..."
          // value={search}
          onKeyDown={handleSearchChange}
        />
        <select onChange={(e) => setSearchField(e.target.value)}>
          <option value="username">Username</option>
          <option value="fullname">Full Name</option>
          <option value="mobile">Mobile</option>
          <option value="email">Email</option>
        </select>
      </div>
      <button onClick={() => setIsAdd(true)}>Add Manager</button>
      {isAdd && (
        <>
          <Modal
            isOpen={isAdd}
            onRequestClose={() => setIsAdd(false)}
            contentLabel="Add Manager"
          >
            <AddManager setIsOpen={setIsAdd} />
          </Modal>
        </>
      )}
      <table className="border">
        <thead className="border">
          <tr>
            <th>Email</th>
            <th>Mobile</th>
            <th>Status</th>
            <th>Main Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="border">
          {isLoading ? (
            <tr>
              <td colSpan="6" align="center">
                Loading
              </td>
            </tr>
          ) : totalUsers > 0 ? (
            users.map((user) => (
              <tr
                key={user._id}
                onClick={() => handleRowSelect(user)}
                className="text-center border"
              >
                <td className="p-4">{user.email}</td>
                <td>{user.mobile}</td>
                <td className="text-red-500">{user.status}</td>
                <td className="text-purple-600">{user.main_status}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
                <td className="flex items-center justify-center text-center">
                  <span
                    onClick={() => setIsView(true)}
                    className="text-blue-500 text-2xl"
                  >
                    <GiEyeTarget />
                  </span>
                  <span
                    onClick={() => setIsEdit(true)}
                    className="text-orange-400 text-2xl pl-2"
                  >
                    <FaRegEdit />
                  </span>
                  <span
                    onClick={() => setIsDelete(true)}
                    className="text-red-500 text-2xl pl-2"
                  >
                    <BsTrash />
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" align="center">
                No manager found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        totalUsers={totalUsers}
        limit={limit}
        page={page}
        setPage={setPage}
      />
      <div className="limit">
        <label htmlFor="limit">Limit: </label>
        <span>
          <input
            type="number"
            placeholder={`current limit: ${limit}`}
            onKeyDown={onLimitChange}
            min="1"
          />
        </span>
      </div>
      <div>
        {/* <button onClick={handleEdit}>Edit</button>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleDelete}>Delete</button> */}
      </div>
      {isView && (
        <>
          <Modal
            isOpen={isView}
            onRequestClose={() => setIsView(false)}
            contentLabel="View Manager Info"
          >
            <ViewManager setIsOpen={setIsView} />
          </Modal>
        </>
      )}
      {isEdit && (
        <>
          <Modal
            isOpen={isEdit}
            onRequestClose={() => setIsEdit(false)}
            contentLabel="Edit Manager Info"
          >
            <EditManager setIsOpen={setIsEdit} />
          </Modal>
        </>
      )}
      {isDelete && (
        <>
          <Modal
            isOpen={isDelete}
            onRequestClose={() => setIsDelete(false)}
            contentLabel="Delete Manager"
          >
            <DeleteManager setIsOpen={setIsDelete} />
          </Modal>
        </>
      )}
    </div>
  );
};

export default Manager;
