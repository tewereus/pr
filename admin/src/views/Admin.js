import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "./components/Table";
import { getAllAdmins } from "../features/users/Admin/adminSlice";
import { useSelector, useDispatch } from "react-redux";

const UserList = () => {
  // const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [blocked, setBlocked] = useState(false);
  const [searchField, setSearchField] = useState("username"); // Add searchField state
  const [role, setRole] = useState("user");
  const [sort, setSort] = useState("createdAt");
  const [sortValue, setSortValue] = useState({
    sortBy: "createdAt",
    order: "asc",
    role: "user",
    blocked: "false",
  });

  const roleOptions = ["All", "admin", "user", "guest"];
  const sortOptions = ["createdAt", "username", "fullname"];
  const dispatch = useDispatch();
  useEffect(() => {
    const obj = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort,
      search,
      searchField,
      role,
      blocked,
    };
    dispatch(getAllAdmins(obj));
  }, [page, limit, sort, search, searchField, role, blocked]);
  // const users = useSelector((state) => state.users.users);
  const { users } = useSelector((state) => state.admin);

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
    console.log(sortValue);
    setRole(sortValue.role);
    if (sortValue.order === "asc") {
      setSort(sortValue.sortBy + "," + sortValue.blocked);
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

  return (
    <div>
      <h1>Users</h1>
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
        {/* // add a role mechanism for the search when sellers, printers are added
        <select
          value={sortValue.role}
          onChange={(e) => setSortValue({ ...sortValue, role: e.target.value })}
        >
          {roleOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select> */}
        {/* <button onClick={handleSearch}>Search</button> */}
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
        <select
          value={sortValue.role}
          onChange={(e) => setSortValue({ ...sortValue, role: e.target.value })}
        >
          {roleOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <button onClick={handleSort}>Sort</button>
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
            <th>Role</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.fullname}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>{user.isBlocked === true ? "Blocked" : "Not Blocked"}</td>
              <td>{user.role}</td>
              <td>{user.createdAt.toLocaleString()}</td>
            </tr>
          ))}
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
    </div>
  );
};

export default UserList;
