import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/layouts/Home";
import MakeComplaint from "./components/complaint/MakeComplaint";
import MyComplaints from "./components/complaint/MyComplaints";

import { AuthContext } from "./helpers/AuthContext";

import { useState, useEffect } from "react";
import axios from "axios";
import AdminHome from "./components/admin/AdminHome";
import AllComplaints from "./components/admin/AllComplaints";
import Sellers from "./components/admin/Sellers";
import AdLogin from "./components/admin/AdLogin";
import Seller from "./components/admin/Seller";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/auth`, {
        headers: { authToken: sessionStorage.getItem("authToken") },
      })
      .then((res) => {
        if (res.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: res.data.username,
            id: res.data.id,
            status: true,
          });
        }
      });
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/admin/login" component={AdLogin}></Route>
              <Route
                exact
                path="/admin"
                component={() => <AdminHome authorized={authState.status} />}
              ></Route>
              <Route
                exact
                path="/admin/complaints"
                component={() => (
                  <AllComplaints authorized={authState.status} />
                )}
              ></Route>
              <Route
                exact
                path="/admin/sellers"
                component={() => <Sellers authorized={authState.status} />}
              ></Route>
              <Route
                exact
                path="/admin/seller"
                component={() => <Seller authorized={authState.status} />}
              ></Route>
              <Route exact path="/" component={Home}></Route>
              <Route
                exact
                path="/makecomplaint"
                component={() => (
                  <MakeComplaint authorized={authState.status} />
                )}
              ></Route>
              <Route
                exact
                path="/mycomplaints"
                component={() => <MyComplaints authorized={authState.status} />}
              ></Route>
            </Switch>
          </div>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
