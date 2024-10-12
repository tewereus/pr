import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { getAllRiders } from "../../../store/users/userSlice";
import { GiEyeTarget } from "react-icons/gi";
import { BsTrash } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../../components/Pagination";
// import AddRider from "./AddRider";
// import EditRider from "./EditRider";
// import DeleteRider from "./DeleteRider";
// import ViewRider from "./ViewRider";

Modal.setAppElement("#root");
const Rider = () => {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
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
    dispatch(getAllRiders(obj));
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

  const handleRowSelect = (rider) => {
    setSelectedUser(rider);
    // console.log(rider);
  };

  const { riders, totalUsers, isLoading } = useSelector((state) => state.users);
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
          {/* <option value="username">Username</option> */}
          <option value="fullname">Full Name</option>
          <option value="mobile">Mobile</option>
          <option value="manager">Manager</option>
        </select>
      </div>
      <button onClick={() => setIsAdd(true)}>Add Manager</button>
      {/* {isAdd && (
        <>
          <Modal
            isOpen={isAdd}
            onRequestClose={() => setIsAdd(false)}
            contentLabel="Add Manager"
          >
            <AddManager setIsOpen={setIsAdd} />
          </Modal>
        </>
      )} */}
      <table className="border-4">
        <thead className="border">
          <tr>
            <th>fullname</th>
            <th>Mobile</th>
            <th>Manager</th>
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
            riders.map((rider) => (
              <tr
                key={rider?._id}
                onClick={() => handleRowSelect(rider)}
                className="text-center border"
              >
                <td className="p-4" onClick={() => console.log(riders)}>
                  {rider?.fullname}
                </td>
                <td>{rider?.mobile}</td>
                <td>{rider?.manager?.fullname}</td>
                <td className="text-red-500">{rider?.status}</td>
                <td className="text-purple-600">{rider?.main_status}</td>
                <td>{new Date(rider?.createdAt).toLocaleString()}</td>
                <td className="flex items-center justify-center text-center">
                  <span
                    onClick={() => {
                      setSelectedUser(rider);
                      setIsView(true);
                    }}
                    className="text-blue-500 text-2xl"
                  >
                    <GiEyeTarget />
                  </span>
                  <span
                    onClick={() => {
                      setSelectedUser(rider);
                      setIsEdit(true);
                    }}
                    className="text-orange-400 text-2xl pl-2"
                  >
                    <FaRegEdit />
                  </span>
                  <span
                    onClick={() => {
                      setSelectedUser(rider);
                      setIsDelete(true);
                    }}
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
                No rider found
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
      {/* {isView && (
        <>
          <Modal
            isOpen={isView}
            onRequestClose={() => setIsView(false)}
            contentLabel="View Manager Info"
          >
            <ViewManager setIsOpen={setIsView} selectedUser={selectedUser} />
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
            <EditManager setIsOpen={setIsEdit} selectedUser={selectedUser} />
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
            <DeleteManager
              setIsOpen={setIsDelete}
              selectedUser={selectedUser}
            />
          </Modal>
        </>
      )} */}
    </div>
  );
};

export default Rider;
