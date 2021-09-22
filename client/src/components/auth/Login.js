import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../helpers/AuthContext";

function Login() {
  let history = useHistory();

  const { setAuthState } = useContext(AuthContext);

  const [state, setstate] = useState({ email: "", password: "" });
  //const [err, seterr] = useState([]);

  const handleData = (e) => {
    setstate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();
    console.log("login called");
    axios
      .post(`http://localhost:5000/api/auth/login`, state)
      .then((res) => {
        if (res.data.error) return alert(res.data.error);
        sessionStorage.setItem("authToken", res.data.token);
        setAuthState({
          username: res.data.username,
          id: res.data.id,
          status: true,
        });
        history.push("/");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <div className="container">
        <form onSubmit={login}>
          <div className="mb-1">
            <label className="col-form-label">E-mail</label>
            <input
              name="email"
              type="text"
              className="form-control"
              value={state.email}
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
              <button data-bs-dismiss="modal" className="btn btn-primary ">
                Log-in
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
