import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "fBase";
import "../css/todo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePen } from "@fortawesome/free-solid-svg-icons";

const TodoForm = ({ userObj, dateValue, today }) => {
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
      fullyDate: dateValue.toDateString(),
      fullyTime: dateValue.getTime(),
      nickName: userObj.displayName,
      text: newTodo,
      todoId: Date.now(),
      hotFlag: false,
      isClear: false,
    };
    await addDoc(collection(db, `${userObj.uid}`), docRef);
    setNewTodo("");
  };

  return (
    <>
      <form className="todos_submit" onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="할 일을 등록하세요.(최대 15자)"
          maxLength="15"
          value={newTodo}
          disabled={dateValue < today ? true : false}
        />
        <button type="submit" disabled={dateValue < today ? true : false}>
          <FontAwesomeIcon icon={faSquarePen} />
        </button>
      </form>
    </>
  );
};

export default TodoForm;
