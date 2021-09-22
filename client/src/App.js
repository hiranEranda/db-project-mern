import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AppNavBar from "./components/layouts/AppNavBar";
import Home from "./components/layouts/Home";
import MakeComplaint from "./components/complaint/MakeComplaint";
import MyComplaints from "./components/complaint/MyComplaints";

import { AuthContext } from "./helpers/AuthContext";

import { useState, useEffect } from "react";
import axios from "axios";

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
            id: res.data.username,
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
            <AppNavBar />
            <Switch>
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
