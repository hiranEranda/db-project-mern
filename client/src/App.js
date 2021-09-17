import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AppNavBar from "./components/layouts/AppNavBar";
import Home from "./components/layouts/Home";
import MakeComplaint from "./components/complaint/MakeComplaint";
import MyComplaints from "./components/complaint/MyComplaints";

import ViewComplaint from "./components/complaint/ViewComplaint";
import Login from "./components/layouts/Login";
// import Miyu from "./components/products/Miyu";

function App() {
  return (
    <Router>
      <div className="App">
        <AppNavBar />
        <div className="container">
          <Switch>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/" component={Home}></Route>
            <Route
              exact
              path="/makecomplaint"
              component={MakeComplaint}
            ></Route>
            <Route exact path="/mycomplaints" component={MyComplaints}></Route>
            <Route
              exact
              path="/viewcomplaints"
              component={ViewComplaint}
            ></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
