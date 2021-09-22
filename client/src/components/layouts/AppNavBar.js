import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import Login from "../auth/Login";

function AppNavBar() {
  const { authState, setAuthState } = useContext(AuthContext);

  const logOut = () => {
    sessionStorage.removeItem("authToken");
    setAuthState({ username: "", id: 0, status: false });
    alert("logged out");
  };

  return (
    <div className="">
      <nav className="navbar navbar-expand-md navbar-dark bg-dark py-2">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Ceyloan Smart Consumer
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navmenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navmenu">
            <ul className="navbar-nav ms-auto">
              {authState.status && (
                <li className="nav-item">
                  <Link to="#" className="nav-link">
                    Welcome {authState.username}
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/makecomplaint" className="nav-link">
                  Make complaint
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/mycomplaints" className="nav-link">
                  My complaints
                </Link>
              </li>
            </ul>
            {authState.status ? (
              <ul className="navbar-nav mr-auto">
                <li className="nav-item" onClick={logOut}>
                  <Link to="/" className="nav-link">
                    Log out
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav mr-auto">
                {/* <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Log in
                  </Link>
                </li> */}
                <li className="nav-item">
                  <Link
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#loginModal"
                    className="nav-link"
                  >
                    USER-Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/login" className="nav-link">
                    ADMIN-Login
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
      {/* ----------------------------------------------------------------------------------------------------- */}
      {/* Log in Modal */}
      <div className="">
        <div
          className="modal fade"
          id="loginModal"
          aria-labelledby="loginModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="loginModalLabel">
                  Log in
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p className="lead">Enter your Credentials to log in</p>
                <Login />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppNavBar;
