import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import AppNavBar from "./components/layouts/AppNavBar";
import Dashboard from "./components/layouts/Dashboard";

//import store from "./redux/store";

function App() {
  return (
    //<Provider>
    <Router>
      <div className="App">
        <AppNavBar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Dashboard}></Route>
          </Switch>
        </div>
      </div>
    </Router>
    //</Provider>
  );
}

export default App;
