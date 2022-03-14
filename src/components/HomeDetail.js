import React from "react";
import "../css/home.css";

const HomeDetail = ({ today, todoList }) => {
  return (
    <>
      <div className="hot">Today 💥Hot💥 Todo!!!</div>
      {todoList.map(
        (hot) =>
          hot.hotFlag &&
          hot.createdYear === today.year &&
          hot.createdMonth === today.month &&
          hot.createdDate === today.date && (
            <div key={hot.todoId}>{hot.text}</div>
          )
      )}
    </>
  );
};
export default HomeDetail;
