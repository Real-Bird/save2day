import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fBase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
// import basicProfile from "../image/basic_profile.png";
import loadingGif from "../image/profile_load.gif";
import "../css/styles.css";

const titleEl = document.querySelector("title");
titleEl.innerText = "Save 2Day";

function App() {
  const [today, setToday] = useState(new Date());
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authService, async (user) => {
      if (user) {
        // if (user.photoURL == null) {
        //   await updateProfile(user, {
        //     photoURL: basicProfile,
        //   });
        // }
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          profilePhoto: user.photoURL,
          updateProfile: (args) =>
            updateProfile(user, {
              displayName: user.displayName,
              profilePhoto: user.photoURL,
            }),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      profilePhoto: user.photoURL,
      updateProfile: (args) =>
        updateProfile(user, {
          displayName: user.displayName,
          profilePhoto: user.photoURL,
        }),
    });
  };
  return (
    <div>
      {init ? (
        <>
          <AppRouter
            isLoggedIn={Boolean(userObj)}
            userObj={userObj}
            refreshUser={refreshUser}
            today={today}
          />
        </>
      ) : (
        <img src={loadingGif} alt="loading" />
      )}
    </div>
  );
}

export default App;
