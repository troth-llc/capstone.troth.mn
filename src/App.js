import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from "react-router-dom";
import { Header } from "component";
import { Home } from "container";
const App = () => {
  return (
    <Router>
      <Header />
      <div className="app">
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
