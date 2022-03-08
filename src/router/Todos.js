import React, { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { authService, db } from "fBase";
import { onAuthStateChanged } from "firebase/auth";
import TodosDetails from "components/TodosDetails";
import TodoForm from "components/TodoForm";

const Todos = ({ userObj }) => {
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
      {todoList.map((todo) => (
        <TodosDetails userObj={userObj} todoObj={todo} />
      ))}
      <TodoForm userObj={userObj} />
    </>
  );
};

export default Todos;
