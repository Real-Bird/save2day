import React, { useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "fBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faFire } from "@fortawesome/free-solid-svg-icons";
import "../css/todo.css";

const TodosDetails = ({ userObj, todoObj, today, dateValue }) => {
  const [clearLine, setClearLine] = useState("");
  const [hotFlag, setHotFlag] = useState(false);
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
    if (updateTodo === "") {
      return;
    }
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

  const dateString2Time = (dateString) => {
    const temp_date = new Date(dateString);
    return temp_date.getTime();
  };
  return (
    <>
      {editing ? (
        <div className="todos_edit">
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
          <input type="button" onClick={toggleEditTodo} value="취소" />
        </div>
      ) : (
        <div>
          {todoObj.fullyDate === dateValue.toDateString() && (
            <div className={isClear ? clearLine : ""}>
              <button
                onClick={toggleFlag}
                disabled={
                  dateString2Time(todoObj.fullyDate) <
                  dateString2Time(today.toDateString())
                    ? "disabled"
                    : null
                }
              >
                {todoObj.hotFlag ? (
                  <FontAwesomeIcon icon={faFire} color="red" />
                ) : (
                  <FontAwesomeIcon icon={faFire} />
                )}
              </button>
              <input onClick={onClear} type="checkbox" />
              <span>{todoObj.text}</span>
              <input
                type="button"
                onClick={toggleEditTodo}
                disabled={
                  dateString2Time(todoObj.fullyDate) <
                  dateString2Time(today.toDateString())
                    ? "disabled"
                    : null
                }
                value="Edit"
              />
              <button onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TodosDetails;
