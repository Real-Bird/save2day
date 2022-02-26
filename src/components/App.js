import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fBase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    onAuthStateChanged(authService, async (user) => {
      if (user) {
        if (user.displayName == null) {
          await updateProfile(user, {
            displayName: uuidv4().slice(1, 5),
          })
        } else if (user.photoURL == null) {
          await updateProfile(user, {
            photoURL: "https://github.com/Real-Bird/pb/blob/master/bagic_profile.png?raw=true",
          })
        }
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          profilePhoto: user.photoURL,
          updateProfile: (args) => updateProfile(user, { displayName: user.displayName, profilePhoto: user.photoURL, }),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    })
  }, [])
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      profilePhoto: user.photoURL,
      updateProfile: (args) => updateProfile(user, { displayName: user.displayName, profilePhoto: user.photoURL, }),
    });
  }
  return (
    <div>
      {init ? (
        <>
        <main>
          <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} refreshUser={refreshUser} />
        </main>
        <footer className="footer">
        <div> &copy; {new Date().getFullYear()} Save2Day by Real-Bird</div>
      </footer>
      </>
      ) : "Initializing..."}

    </div>
  );
}

export default App;
