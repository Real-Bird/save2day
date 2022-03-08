import { authService, db } from "fBase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Calendar from "router/Calendar";

const Home = ({ userObj }) => {
  const onLogOutClick = () => {
    authService.signOut();
  };
  const userName = userObj.displayName;
  const userProfile = userObj.profilePhoto;
  const [todoList, setTodoList] = useState([]);
  useEffect(() => {
    let isMount = true;
    const q = query(collection(db, `${userObj.uid}`), orderBy("todoId", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todosArr = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      if (isMount) {
        setTodoList(todosArr);
      }
    });
    onAuthStateChanged(authService, (user) => {
      if (user == null) {
        unsubscribe();
      }
    });
    return () => (isMount = false);
  }, []);
  return (
    <div>
      <img src={userProfile} />
      <h2>{userName}</h2>
      <button onClick={onLogOutClick}>Log Out</button>
      <div>
        <p>Today 💥Hot💥 Todo!!!</p>
        {todoList.map(
          (hot) => hot.hotFlag && <div key={hot.todoId}>{hot.text}</div>
        )}
      </div>
      <div>
        <Calendar />
      </div>
    </div>
  );
};
export default Home;
