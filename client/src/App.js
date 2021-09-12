import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import AppNavBar from "./components/layouts/AppNavBar";

//import store from "./redux/store";

function App() {
  return (
    //<Provider>
    <Router>
      <div className="App">
        <AppNavBar />
        <div className="container">
          <h1>hello</h1>
        </div>
      </div>
    </Router>
    //</Provider>
  );
}

export default App;
