import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../features/UsersSlice";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { UpdateUser } from "../features/UsersSlice";
import { searchUser } from "../features/UsersSlice";

import { Link } from "react-router-dom";
function CreatePost() {
  const [user, setUser] = useState({ name: "", age: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const { elem, isUpdate } = location.state || {};
  function handleInput(e) {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  }

  useEffect(() => {
    dispatch(searchUser(search));
  }, [search]);

  function handleAdd() {
    if (isUpdate && elem) {
      dispatch(UpdateUser({ user, id: elem.id }));
      navigate("/showData");
    } else {
      dispatch(fetchUsers(user));
      setUser({ name: "", age: "" });
      navigate("/showData");
    }
  }

  useEffect(() => {
    if (isUpdate && elem) {
      setUser({ name: elem.name, age: elem.age });
    }
  }, [isUpdate, elem]);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="#">
            RkT
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link text-white" aria-current="page" href="#">
                  Create Post
                </a>
              </li>
              <li className="nav-item">
                <Link
                  to="/showData"
                  className="nav-link text-white"
                  aria-current="page"
                  href="#"
                >
                  Show Post
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-outline-light" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter Name"
                value={user.name}
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput2" className="form-label">
                Age
              </label>
              <input
                type="text"
                name="age"
                className="form-control"
                id="exampleFormControlInput2"
                placeholder="Enter Age"
                value={user.age}
                onChange={handleInput}
              />
            </div>
            <button
              onClick={handleAdd}
              type="button"
              className="btn btn-primary mt-3"
            >
              ADD
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
