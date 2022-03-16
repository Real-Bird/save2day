import React from "react";
import { Link } from "react-router-dom";
import "../css/home.css";

const HomeDetail = ({ today, todoList }) => {
  return (
    <>
      <div className="hot">Today 💥Hot💥 Todo!!!</div>
      {todoList.map(
        (hot) =>
          hot.hotFlag &&
          hot.fullyDate === today.toDateString() && (
            <div key={hot.todoId} className="hot_todo">
              {hot.text}
            </div>
          )
      )}
    </>
  );
};
export default HomeDetail;
