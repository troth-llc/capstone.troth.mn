import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { Header, Footer } from "component";
import { Home, Course, Find, Submission } from "container";
import { User } from "context/user";
import { Offline, Online } from "react-detect-offline";
var dev = !process.env.NODE_ENV || process.env.NODE_ENV === "development";
const App = () => {
  const cookie = Cookies.get("token");
  const [user, setUser] = useState(null);
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        cookie ? (
          <Component {...props} />
        ) : (
          (window.location.href = "https://troth.mn/auth")
        )
      }
    />
  );
  const login = () => {
    if (cookie) {
      axios
        .get("/api/user")
        .then((response) => {
          const { user, msg } = response.data;
          if (user === null || msg) {
            Cookies.remove("token", {
              path: "/",
              domain: `${dev ? window.location.hostname : ".troth.mn"}`,
              secure: dev ? false : true,
            });
            document.location.reload();
          }
          setUser(user);
        })
        .catch((error) => {
          if (error) {
            Cookies.remove("token", {
              path: "/",
              domain: `${dev ? window.location.hostname : ".troth.mn"}`,
              secure: dev ? false : true,
            });
          }
        });
    }
  };
  useEffect(() => {
    login();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <>
      <Offline>
        <div className="offline">
          <span className="material-icons-outlined material-icons">
            cloud_off
          </span>
          You're offline right now. Check your connection.
        </div>
      </Offline>
      <Online>
        <Router>
          <User.Provider value={value}>
            <Header />
            <div className="app">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/course" component={Course} />
                <Route path="/course/:id/:episode" component={Find} />
                <PrivateRoute
                  exact
                  path="/submissions"
                  component={Submission}
                />
              </Switch>
            </div>
            <Footer />
          </User.Provider>
        </Router>
      </Online>
    </>
  );
};

export default App;
