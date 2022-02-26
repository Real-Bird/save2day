import { authService } from "fBase";
import React from "react";
import Calendar from "router/Calendar";

const Home = ({ userObj }) => {
  const onLogOutClick = () => {
    authService.signOut();
  }
  const userName = userObj.displayName;
  const userProfile = userObj.profilePhoto;

  return (
    <div>
      <img src={userProfile} />
      <h2>{userName}</h2>
      <button onClick={onLogOutClick}>Log Out</button>
      <div>
        <Calendar />
      </div>
    </div>
  )
}
export default Home;