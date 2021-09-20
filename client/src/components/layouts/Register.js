import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [state, setState] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
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
        console.log(res.data);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <div className="form-container sign-up-container">
        <form onSubmit={register}>
          <h1>Create Account</h1>
          <input
            type="text"
            name="fname"
            value={state.fname}
            placeholder="First Name"
            onChange={formHandler}
          />
          <input
            type="text"
            name="lname"
            value={state.lname}
            placeholder="Last Name"
            onChange={formHandler}
          />
          <input
            type="email"
            name="email"
            value={state.email}
            placeholder="Email"
            onChange={formHandler}
          />
          <input
            type="password"
            name="password"
            value={state.password}
            placeholder="Password"
            onChange={formHandler}
          />
          <button>Sign Up</button>
          <div></div>
        </form>
      </div>
    </div>
  );
}

export default Register;
