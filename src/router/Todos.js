import React, { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { authService, db } from "fBase";
import { onAuthStateChanged } from "firebase/auth";
import TodosDetails from "components/TodosDetails";
import TodoForm from "components/TodoForm";

const Todos = ({ userObj, today, dateValue }) => {
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
    <>
      {todoList.map((todoObj) => (
        <TodosDetails
          key={todoObj.todoId}
          userObj={userObj}
          todoObj={todoObj}
          today={today}
          dateValue={dateValue}
        />
      ))}
    </>
  );
};

export default Todos;
