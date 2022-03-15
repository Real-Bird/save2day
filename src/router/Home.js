import HomeDetail from "components/HomeDetail";
import { authService, db } from "fBase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import CalendarPath from "router/CalendarPath";
import Profile from "router/Profile";
import Quotes from "./Quotes";
import Header from "components/Header";
import "../css/common.css";
import Notice from "components/Notice";

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
    <div className="main_box">
      <header className="up_box">
        <div className="profile">
          <Profile userObj={userObj} />
        </div>
        <Header userObj={userObj} />
        <div>
          <Notice />
        </div>
      </header>
      <main className="middle_box">
        <div className="home">
          <HomeDetail userObj={userObj} today={today} todoList={todoList} />
        </div>
        <div className="calendar">
          <CalendarPath userObj={userObj} todoList={todoList} today={today} />
        </div>
      </main>
      <footer>
        <div className="quotes">
          <Quotes />
        </div>
      </footer>
    </div>
  );
};
export default Home;
