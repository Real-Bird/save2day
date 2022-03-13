import { authService } from "fBase";
import React from "react";
import { Link } from "react-router-dom";
import "../css/profile.css";

const Profile = ({ userObj }) => {
  const onLogOutClick = () => {
    authService.signOut();
  };
  return (
    <>
      <div className="profile_box">
        <img src={userObj.profilePhoto} alt="profileImg" />
        <div className="profile_box__name">
          <h2>{userObj.displayName}</h2>
          <Link to="/profile">
            <button>Profile Edit</button>
          </Link>
          <button onClick={onLogOutClick}>Log Out</button>
        </div>
      </div>
    </>
  );
};

export default Profile;
