import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "fBase";
import { useHistory } from "react-router-dom";
import "components/todo.css";

const TodoForm = ({ userObj }) => {
  const history = useHistory();
  const [newTodo, setNewTodo] = useState("");
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTodo(value);
  };

  const onSubmit = async (event) => {
    if (newTodo === "") {
      return;
    }
    event.preventDefault();
    const docRef = {
      createdYear: new Date().getFullYear(),
      createdMonth: new Date().getMonth() + 1,
      createdDate: new Date().getDate(),
      nickName: userObj.displayName,
      text: newTodo,
      todoId: Date.now(),
      hotFlag: false,
    };
    await addDoc(collection(db, `${userObj.uid}`), docRef);
    setNewTodo("");
  };
  const onHistory = () => history.push("/");
  return (
    <>
      <form onSubmit={onSubmit}>
        <span onClick={onHistory} className="back">
          🔙
        </span>
        <input
          onChange={onChange}
          type="text"
          placeholder="오늘의 할 일"
          value={newTodo}
        />
        <input type="submit" value="입력" />
      </form>
    </>
  );
};

export default TodoForm;
