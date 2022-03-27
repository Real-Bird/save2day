import React from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Auth from "router/Auth";
import Home from "router/Home";
import NoticeDetail from "./NoticeDetail";
import NoticeHead from "./NoticeHead";
import ProfileDetail from "./ProfileDetail";

const AppRouter = ({ isLoggedIn, userObj, today, refreshUser }) => {
  return (
    <>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          {isLoggedIn ? (
            <>
              <Route exact path={`${process.env.PUBLIC_URL}/`}>
                <Home userObj={userObj} today={today} />
              </Route>
              <Route exact path="/note" component={NoticeHead} />
              <Route path="/note/:no" component={NoticeDetail} />
              <Route exact path="/profile">
                <ProfileDetail userObj={userObj} refreshUser={refreshUser} />
              </Route>
              <Redirect from="*" to="/" />
            </>
          ) : (
            <>
              <Route exact path={`${process.env.PUBLIC_URL}/`}>
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
