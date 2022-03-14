import HomeDetail from "components/HomeDetail";
import { authService, db } from "fBase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import CalendarPath from "router/CalendarPath";
import Profile from "router/Profile";
import Quotes from "./Quotes";
import "../css/common.css";

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
        <div className="super_title">
          <h1 className="title">Save 2Day</h1>
          <div className="copyright">&copy; 2022 Save2Day by Real-Bird</div>
        </div>
        <div className="notice">
          <h4>Notice</h4>
          <ul>
            <li>추가할 예정</li>
            <li>기간은 미정</li>
          </ul>
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
