import { authService } from "fBase";
import React from "react";
import { Link } from "react-router-dom";

const Profile = ({ userObj }) => {
  const onLogOutClick = () => {
    authService.signOut();
  };
  return (
    <>
      <img src={userObj.profilePhoto} alt="profileImg" />
      <h2>{userObj.displayName}</h2>
      <Link to="/profile">
        <button>Profile Edit</button>
      </Link>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
