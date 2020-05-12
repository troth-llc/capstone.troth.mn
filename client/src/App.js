import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from "react-router-dom";
import { Header, Footer } from "component";
import { Home, Course, Find } from "container";
const App = () => {
  return (
    <Router>
      <Header />
      <div className="app">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/course" component={Course} />
          <Route path="/course/:id/:episode" component={Find} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
