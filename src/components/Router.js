import React from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Calendar from "router/Calendar";
import Auth from "router/Auth";
import Home from "router/Home";


const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <>
      <Router>
        <Switch>
          {isLoggedIn ? (
            <>
              <Route exact path="/">
                <Home userObj={userObj} />
              </Route>
              <Route exact path="/calendar">
                <Calendar />
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
  )
}

export default AppRouter;