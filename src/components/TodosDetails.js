import React, { useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "fBase";
import "components/todo.css";

const TodosDetails = ({ userObj, todoObj }) => {
  const [hotFlag, setHotFlag] = useState(false);
  const [clearLine, setClearLine] = useState("");
  const [clearFlag, setClearFlag] = useState(false);
  const toggleFlag = async (e) => {
    setHotFlag((prev) => !prev);
    const newTodoRef = doc(db, `${userObj.uid}`, `${todoObj.id}`);
    await updateDoc(newTodoRef, {
      hotFlag: hotFlag,
    });
  };
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you wnat to delete this todo?");
    if (ok) {
      await deleteDoc(doc(db, `${userObj.uid}`, `${todoObj.id}`));
    }
  };
  const onClear = (event) => {
    const {
      target: { checked },
    } = event;
    if (checked === true) {
      setClearLine("clear");
      setClearFlag(checked);
    } else {
      setClearLine("");
      setClearFlag(checked);
    }
  };
  return (
    <>
      <div>
        <div key={todoObj.todoId} className={clearFlag ? clearLine : clearLine}>
          <button onClick={toggleFlag}>{todoObj.hotFlag ? "❤" : "🤍"}</button>

          <span>{todoObj.text}</span>
          <input onClick={onClear} type="checkbox" />
          <button onClick={onDeleteClick}>❌</button>
        </div>
      </div>
    </>
  );
};

export default TodosDetails;
