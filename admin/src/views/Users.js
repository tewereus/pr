/*import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../features/users/userSlice";
import axios from "axios";
import { base_url } from "../api/axiosConfig";
import Table from "./components/Table";
import Sort from "./components/Sort";
import Pagination from "./components/Pagination";
import Search from "./components/Search";

function User() {
  const [obj, setObj] = useState({});
  const [sort, setSort] = useState({ sort: "name", order: "asc" });
  const [filterGenre, setFilterGenre] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const users = useSelector((state) => state.users.users);
  console.log(users);
  //   useEffect(() => {
  // const getAllUsers = async () => {
  //   try {
  //     const url = `${base_url}/user/all-users?page=${page}&search=${search}`;
  //     const { data } = await axios.get(url);
  //     setObj(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // getAllUsers();

  //   }, [sort, page, search]);

  return (
    // <div className="wrapper">
    //   <div className="container">
    //     <div className="head">
    //       <img src="./images/logo.png" alt="logo" className="logo" />
    //       <Search setSearch={(search) => setSearch(search)} />
    //     </div>
    //     <div className="body">
    //       <div className="table_container">
    //         <Table users={obj.users ? obj.users : []} />
    //         <Pagination
    //           page={page}
    //           limit={obj.limit ? obj.limit : 0}
    //           total={obj.total ? obj.total : 0}
    //           setPage={(page) => setPage(page)}
    //         />
    //       </div>
    //       <div className="filter_container">
    //         <Sort sort={sort} setSort={(sort) => setSort(sort)} /> 
    //         <Genre
    //           filterGenre={filterGenre}
    //           genres={obj.genres ? obj.genres : []}
    //           setFilterGenre={(genre) => setFilterGenre(genre)}
    //         /> 
    //       </div>
    //     </div>
    //   </div>
    // </div>
/*    <>
      <div className="flex">
        <h1> Full name </h1>
        <h1> Username </h1>
        <h1> Mobile </h1>
        <h1> Email </h1>
        <h1> Role </h1>
        <h1> Blocked </h1>
        <h1> Created Date </h1>
      </div>
      {users.map((user, index) => {
        return (
          <>
            <div className="flex">
              <div>
                <h1> {user.username} </h1>
              </div>
              <div>
                <h1> {user.fullname} </h1>
              </div>
              <div>
                <h1> {user.mobile} </h1>
              </div>
              <div>
                <h1> {user.email} </h1>
              </div>
              <div>
                <h1> {user.role} </h1>
              </div>
              <div>
                <h1> {user.isBlocked} </h1>
              </div>
              <div>
                <h1> {user.createdAt} </h1>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}

export default User;
*/

import React, { useState, useEffect } from "react";
import Table from "./components/Table";
import {
  getAllUsers,
  getAllAdmins,
  deleteUser,
  deleteAllUsers,
} from "../features/users/users/userSlice";
import Search from "./components/Search";
import { useSelector, useDispatch } from "react-redux";

const UserList = () => {
  const [selectedUser, setSelectedUser] = useState(null);
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
  };

  const handleEdit = () => {
    if (selectedUser) {
      // Execute API code for editing
      console.log("Editing user:", selectedUser.username);
    } else {
      console.log("No user selected for editing");
    }
  };

  const handleUpdate = () => {
    if (selectedUser) {
      // Execute API code for updating
      console.log("Updating user:", selectedUser.username);
    } else {
      console.log("No user selected for updating");
    }
  };

  const handleDelete = () => {
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

      {/* {isLoading ? <p>Loading....</p> : <Table users={users} />} */}
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
      <div className="pagination">
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
      </div>
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
    </div>
  );
};

export default UserList;
