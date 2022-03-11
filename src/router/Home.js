import HomeDetail from "components/HomeDetail";
import { authService, db } from "fBase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import CalendarPath from "router/CalendarPath";
import Profile from "router/Profile";

const Home = ({ userObj, today }) => {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
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
    return () => unsubscribe();
  }, []);
  return (
    <>
      <Profile userObj={userObj} />
      <div>
        <HomeDetail userObj={userObj} today={today} todoList={todoList} />
      </div>
      <div>
        <CalendarPath userObj={userObj} todoList={todoList} today={today} />
      </div>
    </>
  );
};
export default Home;
