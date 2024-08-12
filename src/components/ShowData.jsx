import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postUsers, DeleteUser } from "../features/UsersSlice";
import { Link, useNavigate } from "react-router-dom";

function ShowData() {
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const status = useSelector((state) => state.status);
  const [search, setSearch] = useState(""); // State for search query
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postUsers());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h2>Loading...</h2>
      </div>
    );
  }

  function handleUpdate(elem) {
    navigate("/", { state: { elem, isUpdate: true } });
  }

  function handleDelete(id) {
    dispatch(DeleteUser(id));
  }

  function handleSearchChange(e) {
    setSearch(e.target.value.toLowerCase()); // Update search query
  }

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
                <Link
                  to="/"
                  className="nav-link text-white"
                  aria-current="page"
                >
                  Create Post
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/showData"
                  className="nav-link text-white"
                  aria-current="page"
                >
                  Show Post
                </Link>
              </li>
            </ul>
            <form
              className="d-flex"
              role="search"
              onSubmit={(e) => e.preventDefault()} // Prevent default form submission
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={handleSearchChange} // Handle search input change
              />
              <button className="btn btn-outline-light" type="button">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="table-responsive">
              <table className="table table-bordered table-striped text-center">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Age</th>
                    <th scope="col">Update</th>
                    <th scope="col">Button</th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    .filter(
                      (elem) => elem.name.toLowerCase().includes(search) // Filter based on search query
                    )
                    .map((elem) => (
                      <tr key={elem.id}>
                        <td>{elem.id}</td>
                        <td>{elem.name}</td>
                        <td>{elem.age}</td>
                        <td>
                          <button
                            onClick={() => handleUpdate(elem)}
                            className="btn btn-success"
                          >
                            Update
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() => handleDelete(elem.id)}
                            type="button"
                            className="btn btn-warning"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowData;
