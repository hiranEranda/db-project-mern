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
          <div className="form-group">
            <div className="from-item">
              <label>E mail</label>
              <input
                name="email"
                type="text"
                placeholder="email"
                value={state.email}
                onChange={handleData}
              />
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="password"
                value={state.password}
                onChange={handleData}
              />
              <button className="submit">Log-in</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
