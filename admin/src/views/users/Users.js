import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import {
  getAllUsers,
  getAllAdmins,
  deleteUser,
  deleteAllUsers,
} from "../../store/users/userSlice";
import Search from "../components/Search";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import DeleteUser from "./DeleteUser";

const UserList = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isOpen, setIsOpen] = useState({
    edit: false,
    delete: false,
    deleteAll: false,
  });
  const [modifyUser, setModifyUser] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [blocked, setBlocked] = useState(false);
  const [searchField, setSearchField] = useState("username"); // Add searchField state
  const [role, setRole] = useState("users");
  const [sort, setSort] = useState("-createdAt");
  const [sortValue, setSortValue] = useState({
    sortBy: "createdAt",
    order: "asc",
    blocked: "false",
  });

  const sortOptions = ["createdAt", "username", "fullname"];
  const dispatch = useDispatch();
  useEffect(() => {
    const obj = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort,
      search,
      searchField,
      blocked,
    };
    if (role === "users") {
      dispatch(getAllUsers(obj));
    } else if (role === "admins") {
      dispatch(
        getAllAdmins({
          limit: parseInt(limit),
          page: parseInt(page),
          sort,
          search,
          searchField,
        })
      );
    }
  }, [page, limit, sort, search, searchField, role, blocked]);

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

  const { users, totalUsers, isLoading } = useSelector((state) => state.users);

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

  const handleSort = () => {
    if (sortValue.order === "asc") {
      setSort(sortValue.sortBy);
    } else if (sortValue.order === "desc") {
      setSort(() => {
        return "-" + sortValue.sortBy;
      });
    }
  };

  const handleBlockChange = () => {
    setBlocked((prevOption) => {
      return !prevOption;
    });
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

  const handleUpdate = () => {
    if (selectedUser) {
      setModifyUser(selectedUser);
      // Execute API code for updating
      setIsOpen((prevState) => ({
        ...prevState,
        edit: true,
      }));
      console.log("Updating user:", selectedUser.username);
      console.log("total users: ", totalUsers);
    } else {
      console.log("No user selected for updating");
    }
  };

  const handleDelete = () => {
    if (selectedUser) {
      setModifyUser(selectedUser);

      // Execute API code for updating
      setIsOpen((prevState) => ({
        ...prevState,
        delete: true,
      }));
      console.log("Deleting user:", selectedUser.username);
      console.log("total users: ", totalUsers);
    } else {
      console.log("No user selected for Deleting");
    }
    // if (selectedUser) {
    //   dispatch(deleteUser(selectedUser._id))
    //     .then(() => {
    //       console.log("User deleted successfully:", selectedUser.username);
    //       const obj = {
    //         limit: parseInt(limit),
    //         page: parseInt(page),
    //         sort,
    //         search,
    //         searchField,
    //         blocked,
    //       };
    //       if (role === "users") {
    //         dispatch(getAllUsers(obj));
    //       } else if (role === "admins") {
    //         dispatch(
    //           getAllAdmins({
    //             limit: parseInt(limit),
    //             page: parseInt(page),
    //             sort,
    //             search,
    //             searchField,
    //           })
    //         );
    //       }
    //     })
    //     .catch((error) => {
    //       console.error("Error deleting user:", error);
    //     });
    // } else {
    //   console.log("No user selected for deleting");
    // }
  };

  const deleteEveryUsers = () => {
    // dispatch(deleteAllUsers())
    //   .then(() => {
    //     const obj = {
    //       limit: parseInt(limit),
    //       page: parseInt(page),
    //       sort,
    //       search,
    //       searchField,
    //       blocked,
    //     };
    //     if (role === "users") {
    //       dispatch(getAllUsers(obj));
    //     } else if (role === "admins") {
    //       dispatch(
    //         getAllAdmins({
    //           limit: parseInt(limit),
    //           page: parseInt(page),
    //           sort,
    //           search,
    //           searchField,
    //         })
    //       );
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error deleting user:", error);
    //   });
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1>Users</h1>
        <select onChange={(e) => setRole(e.target.value)}>
          <option value="users">Users</option>
          <option value="admins">Admins</option>
        </select>
      </div>
      <div className="search-container h-200 pb-30 mb-20 border-3">
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

      <div className="border-2 border-blue-400">
        <select
          onChange={(e) =>
            setSortValue({ ...sortValue, sortBy: e.target.value })
          }
        >
          {sortOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <select
          onChange={(e) =>
            setSortValue({ ...sortValue, order: e.target.value })
          }
        >
          <option value="asc">asc</option>
          <option value="desc">desc</option>
        </select>
        <button onClick={handleSort}>Sort</button>

        <button className="ml-10" onClick={deleteEveryUsers}>
          Delete all users
        </button>
      </div>
      {/*<Table
        users={users}
        totalUsers={totalUsers}
        isLoading={isLoading}
        setSelectedUser={setSelectedUser}
      />*/}
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>
              isBlocked <button onClick={handleBlockChange}>◘</button>
            </th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="6" align="center">
                Loading
              </td>
            </tr>
          ) : totalUsers > 0 ? (
            users.map((user) => (
              <tr key={user._id} onClick={() => handleRowSelect(user)}>
                <td>{user.username}</td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>{user.isBlocked ? "Blocked" : "Not Blocked"}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" align="center">
                No user found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>
          Page {page} of {Math.ceil(totalUsers / limit)}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === Math.ceil(totalUsers / limit)}
        >
          Next
        </button>
      </div> */}
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
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
      {isOpen.delete && (
        <Modal
          isOpen={isOpen.delete}
          onRequestClose={() =>
            setIsOpen((prevState) => ({
              ...prevState,
              delete: false,
            }))
          }
          contentLabel="Delete User"
        >
          <DeleteUser setIsOpen={setIsOpen} selectedUser={modifyUser} />
        </Modal>
      )}
    </div>
  );
};

export default UserList;
