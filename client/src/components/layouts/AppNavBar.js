import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";

function AppNavBar() {
  const { authState, setAuthState } = useContext(AuthContext);

  const logOut = () => {
    sessionStorage.removeItem("authToken");
    setAuthState({ username: "", id: 0, status: false });
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
      <div className="container">
        <Link to="/" className="navbar-brand">
          clientpanel
        </Link>
        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav mr-auto">
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
              <li className="nav-item">
                <button onClick={logOut}>
                  <Link to="/" className="nav-link">
                    Log out
                  </Link>
                </button>
              </li>
              <h1> {authState.username}</h1>
            </ul>
          ) : (
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Log in
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default AppNavBar;
