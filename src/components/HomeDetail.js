import React from "react";

const HomeDetail = ({ today, todoList }) => {
  return (
    <>
      <p>Today 💥Hot💥 Todo!!!</p>
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
