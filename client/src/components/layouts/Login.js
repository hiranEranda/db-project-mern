import React, { useState } from "react";

function Login() {
  const [state, setstate] = useState({ email: "", password: "" });

  const handleData = (e) => {
    setstate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const login = () => {};
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
