import React, { useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "fBase";
import "components/todo.css";

const TodosDetails = ({ userObj, todoObj, today, state }) => {
  const [hotFlag, setHotFlag] = useState(false);
  const [clearLine, setClearLine] = useState("");
  const [isClear, setIsClear] = useState(false);
  const [editing, setEditing] = useState(false);
  const [updateTodo, setUpdateTodo] = useState("");
  const toggleFlag = async (e) => {
    setHotFlag((prev) => !prev);
    const newTodoRef = doc(db, `${userObj.uid}`, `${todoObj.id}`);
    await updateDoc(newTodoRef, {
      hotFlag: hotFlag,
    });
  };
  const toggleEditTodo = () => setEditing((prev) => !prev);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setUpdateTodo(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const newTodoRef = doc(db, `${userObj.uid}`, `${todoObj.id}`);
    await updateDoc(newTodoRef, {
      text: updateTodo,
    });
    setEditing(false);
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
      setIsClear(checked);
    } else {
      setClearLine("");
      setIsClear(checked);
    }
  };
  return (
    <>
      {editing ? (
        <div>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your Todo"
              onChange={onChange}
              value={updateTodo}
              required
              autoFocus
              className="formInput"
            />
            <input type="submit" value="Edit" />
          </form>
          <button onClick={toggleEditTodo}>Cancel</button>
        </div>
      ) : (
        <div>
          {todoObj.createdYear === state.year &&
            todoObj.createdMonth === state.month &&
            todoObj.createdDate === state.date && (
              <div className={isClear ? clearLine : ""}>
                <button onClick={toggleFlag}>
                  {todoObj.hotFlag ? "❤" : "🤍"}
                </button>
                <input onClick={onClear} type="checkbox" />
                <span>{todoObj.text}</span>
                <input
                  type="button"
                  onClick={toggleEditTodo}
                  disabled={
                    todoObj.createdDate < today.date ? "disabled" : null
                  }
                  value="Edit"
                />
                <button onClick={onDeleteClick}>❌</button>
              </div>
            )}
        </div>
      )}
    </>
  );
};

export default TodosDetails;
