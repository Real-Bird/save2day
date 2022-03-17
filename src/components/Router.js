import React from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Auth from "router/Auth";
import Home from "router/Home";
import Navigation from "components/Navigation";
import ProfileDetail from "./ProfileDetail";
// import Todos from "router/Todos";

const AppRouter = ({ isLoggedIn, userObj, today, refreshUser }) => {
  return (
    <>
      <Router basename="/">
        {/* {isLoggedIn && <Navigation />} */}
        <Switch>
          {isLoggedIn ? (
            <>
              <Route exact path="/">
                <Home userObj={userObj} today={today} />
              </Route>
              {/* <Route exact path="/todos">
                <Todos
                  userObj={userObj}
                  today={today}
                />
              </Route> */}
              <Route exact path="/profile">
                <ProfileDetail userObj={userObj} refreshUser={refreshUser} />
              </Route>
              <Redirect from="*" to="/" />
            </>
          ) : (
            <>
              <Route exact path="/">
                <Auth />
              </Route>
              <Redirect from="*" to="/" />
            </>
          )}
        </Switch>
      </Router>
    </>
  );
};

export default AppRouter;
