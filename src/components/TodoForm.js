import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "fBase";
import { useHistory } from "react-router-dom";
import "components/todo.css";

const TodoForm = ({ userObj, state }) => {
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
      createdYear: state.year,
      createdMonth: state.month,
      createdDate: state.date,
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
          placeholder="할 일을 등록하세요."
          value={newTodo}
        />
        <input type="submit" value="입력" />
      </form>
    </>
  );
};

export default TodoForm;
