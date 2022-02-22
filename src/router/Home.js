import { authService } from "fBase";
import React from "react";

const Home = ({ userObj }) => {
  const onLogOutClick = () => {
    authService.signOut();
  }
  const userName = userObj.displayName;
  const userProfile = userObj.profilePhoto;
  console.log(userProfile)
  return (
    <div>
      <img src={userProfile} />
      <h2>{userName}</h2>
      <button onClick={onLogOutClick}>Log Out</button>
    </div>
  )
}
export default Home;