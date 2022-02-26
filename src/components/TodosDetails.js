import React, { useState } from "react";

const TodosDetails = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const onChange = (event) => {
    const {
      target: { value }
    } = event;
    setNewTodo(value);
  }
  const onSubmit = () => setTodoList(newTodo);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} type="text" placeholder="오늘의 할 일" />
        <input type="submit" value="입력" />
      </form>
      <ul>
        {todoList.map((todo) => {
          <li key={Date.now()}>
            {todo}
          </li>
        })}
      </ul>
    </>
  )
}

export default TodosDetails;
