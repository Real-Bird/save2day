import React, { useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "fBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faFire,
  faPenToSquare,
  faArrowRotateBack,
} from "@fortawesome/free-solid-svg-icons";
import "../css/todo.css";

const TodosDetails = ({ userObj, todoObj, today, dateValue }) => {
  const [hotFlag, setHotFlag] = useState(false);
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
    const ok = window.confirm("정말 지우시겠습니까?");
    if (ok) {
      await deleteDoc(doc(db, `${userObj.uid}`, `${todoObj.id}`));
    }
  };
  const onClear = async (event) => {
    const newTodoRef = doc(db, `${userObj.uid}`, `${todoObj.id}`);
    const {
      target: { checked },
    } = event;
    if (checked) {
      await updateDoc(newTodoRef, {
        isClear: checked,
      });
    } else {
      await updateDoc(newTodoRef, {
        isClear: checked,
      });
    }
  };
  const dateString2Time = (dateString) => {
    const temp_date = new Date(dateString);
    return temp_date.getTime();
  };

  return (
    <div
      className={
        todoObj.fullyDate === dateValue.toDateString() ? "todo_list" : undefined
      }
    >
      {todoObj.fullyDate === dateValue.toDateString() && (
        <div
          className={
            todoObj.isClear ? "todo_list__each clear" : "todo_list__each"
          }
        >
          <button
            className="todo_hot"
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
          <input
            id={todoObj.todoId}
            type="checkbox"
            onChange={onClear}
            checked={todoObj.isClear && "checked"}
          />
          <label htmlFor={todoObj.todoId}></label>

          {editing ? (
            <>
              <form className="todos_edit" onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="수정할 내용을 입력하세요."
                  onChange={onChange}
                  value={updateTodo}
                  maxLength="15"
                  required
                  autoFocus
                  className="formInput"
                />
                <button type="submit">
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
              </form>
              <button className="todo_undo" onClick={toggleEditTodo}>
                <FontAwesomeIcon icon={faArrowRotateBack} />
              </button>
            </>
          ) : (
            <>
              <span className="todo_text">{todoObj.text}</span>

              <button
                className="todo_edit"
                type="button"
                onClick={toggleEditTodo}
                disabled={
                  dateString2Time(todoObj.fullyDate) <
                  dateString2Time(today.toDateString())
                    ? "disabled"
                    : null
                }
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
              <button className="todo_trash" onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default TodosDetails;
