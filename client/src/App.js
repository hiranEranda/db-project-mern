import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import AppNavBar from "./components/layouts/AppNavBar";
import Home from "./components/layouts/Home";
import MakeComplaint from "./components/complaint/MakeComplaint";
import MyComplaints from "./components/complaint/MyComplaints";

import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <AppNavBar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route
                exact
                path="/makecomplaint"
                component={MakeComplaint}
              ></Route>
              <Route
                exact
                path="/mycomplaints"
                component={MyComplaints}
              ></Route>
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
