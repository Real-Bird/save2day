import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
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
              <FontAwesomeIcon icon={faFire} color="red" />
              {hot.text}
            </div>
          )
      )}
    </>
  );
};
export default HomeDetail;
