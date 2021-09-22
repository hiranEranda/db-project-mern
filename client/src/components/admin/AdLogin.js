import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../helpers/AuthContext";
import AdNavBar from "./AdNavBar";

function AdLogin() {
  let history = useHistory();

  const { setAuthState } = useContext(AuthContext);

  const [state, setstate] = useState({ adName: "", password: "" });

  const handleData = (e) => {
    setstate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();
    console.log("admin login called");
    axios
      .post(`http://localhost:5000/api/admin/adlogin`, state)
      .then((res) => {
        if (res.data.error) return alert(res.data.error);
        sessionStorage.setItem("authToken", res.data.token);
        setAuthState({
          username: res.data.username,
          id: res.data.id,
          status: true,
        });
        history.push("/admin");
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <AdNavBar />
      <div className="container">
        <div className="d-flex justify-content-center">
          <div className="card w-50 border-secondary mt-5">
            <div className="card-body">
              <form onSubmit={login}>
                <div className="mb-1">
                  <label className="col-form-label">E-mail</label>
                  <input
                    name="adName"
                    type="text"
                    className="form-control"
                    value={state.adName}
                    onChange={handleData}
                  />
                </div>
                <div className="mb-1">
                  <label className="col-form-label">Password</label>
                  <input
                    name="password"
                    type="password"
                    className="form-control"
                    value={state.password}
                    onChange={handleData}
                  />
                  <div className="modal-footer">
                    <button
                      data-bs-dismiss="modal"
                      className="btn btn-primary "
                    >
                      Log-in
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdLogin;
