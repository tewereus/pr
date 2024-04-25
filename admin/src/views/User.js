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
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "./components/Table";
import { getAllUsers } from "../features/users/userSlice";
import Search from "./components/Search";
import { useSelector, useDispatch } from "react-redux";

const UserList = () => {
  // const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);
  const [sort, setSort] = useState("createdAt");
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");

  const roleOptions = ["all", "admin", "user", "guest"];
  const dispatch = useDispatch();
  useEffect(() => {
    const obj = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort,
      role,
    };
    dispatch(getAllUsers(obj));
  }, [page, limit, sort, search, role]);
  const users = useSelector((state) => state.users.users);

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

  return (
    <div>
      <h1>Users</h1>
      <Search
        search={search}
        setSearch={setSearch}
        role={role}
        setRole={setRole}
      />
      <Table users={users} />
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
