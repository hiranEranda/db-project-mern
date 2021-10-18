import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";

function AdNavBar() {
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
            Ceyloan Smart Consumer - ADMIN Panel
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
            {authState.status ? (
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link to="#" className="nav-link">
                    Welcome {authState.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item" onClick={logOut}>
                  <Link to="/" className="nav-link">
                    Log out
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Client area
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default AdNavBar;
