import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";

import axios from "axios";

function Register() {
  let history = useHistory();

  const { setAuthState } = useContext(AuthContext);

  const [state, setState] = useState({
    nic: "",
    fname: "",
    lname: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  const formHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const register = (e) => {
    e.preventDefault();

    console.log("reg called");

    axios
      .post("http://localhost:5000/api/auth/reg", state)
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
        <form onSubmit={register}>
          <div className="mb-1">
            <label className="col-form-label">NIC Number</label>
            <input
              type="text"
              name="nic"
              className="form-control"
              value={state.nic}
              onChange={formHandler}
            />
          </div>
          <div className="mb-1">
            <label className="col-form-label">First Name</label>
            <input
              type="text"
              name="fname"
              className="form-control"
              value={state.fname}
              onChange={formHandler}
            />
          </div>
          <div className="mb-1">
            <label className="col-form-label">Last Name</label>
            <input
              type="text"
              name="lname"
              className="form-control"
              value={state.lname}
              onChange={formHandler}
            />
          </div>
          <div className="mb-1">
            <label className="col-form-label">Address</label>
            <input
              type="text"
              name="address"
              className="form-control"
              value={state.address}
              onChange={formHandler}
            />
          </div>
          <div className="mb-1">
            <label className="col-form-label">Phone Number</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              value={state.phone}
              onChange={formHandler}
            />
          </div>
          <div className="mb-1">
            <label className="col-form-label">E-mail</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={state.email}
              onChange={formHandler}
            />
          </div>
          <div className="mb-1">
            <label className="col-form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={state.password}
              onChange={formHandler}
            />
          </div>
          <div className="modal-footer">
            <button data-bs-dismiss="modal" className="btn btn-primary ">
              Sign-up
            </button>
          </div>
          <div></div>
        </form>
      </div>
    </div>
  );
}

export default Register;
