import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fBase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
// import { v4 as uuidv4 } from "uuid";
import basicProfile from "../image/basic_profile.png";
import loadingGif from "../image/profile_load.gif";

function App() {
  const date = new Date();
  const fullDate = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
  };
  const [today, setToday] = useState(fullDate);
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const titleEl = document.querySelector("title");
  titleEl.innerText = "Save 2 Days";
  useEffect(() => {
    onAuthStateChanged(authService, async (user) => {
      if (user) {
        if (user.photoURL == null) {
          await updateProfile(user, {
            photoURL: basicProfile,
          });
        }
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
          <main>
            <AppRouter
              isLoggedIn={Boolean(userObj)}
              userObj={userObj}
              refreshUser={refreshUser}
              today={today}
            />
          </main>
          <footer className="footer">
            <div> &copy; 2022 Save2Day by Real-Bird</div>
          </footer>
        </>
      ) : (
        <img src={loadingGif} alt="loading" />
      )}
    </div>
  );
}

export default App;
