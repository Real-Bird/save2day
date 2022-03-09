import { authService, db } from "fBase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import CalendarPath from "router/CalendarPath";

const Home = ({ userObj, today }) => {
  const onLogOutClick = () => {
    authService.signOut();
  };
  const userName = userObj.displayName;
  const userProfile = userObj.profilePhoto;
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    // let isMount = true;
    // if (isMount) {
    const q = query(collection(db, `${userObj.uid}`), orderBy("todoId", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todosArr = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodoList(todosArr);
    });
    onAuthStateChanged(authService, (user) => {
      if (user == null) {
        unsubscribe();
      }
    });
    // }
    return () => unsubscribe();
  }, []);
  return (
    <>
      <img src={userProfile} alt="profileImg" />
      <h2>{userName}</h2>
      <button onClick={onLogOutClick}>Log Out</button>
      <div>
        <p>Today 💥Hot💥 Todo!!!</p>
        {todoList.map(
          (hot) =>
            hot.hotFlag &&
            hot.createdYear === today.year &&
            hot.createdMonth === today.month &&
            hot.createdDate === today.date && (
              <div key={hot.todoId}>{hot.text}</div>
            )
        )}
      </div>
      <div>
        <CalendarPath userObj={userObj} todoList={todoList} today={today} />
      </div>
    </>
  );
};
export default Home;
