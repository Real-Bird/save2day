import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import "../css/home.css";

const HomeDetail = ({ today, todoList }) => {
  return (
    <>
      <div className="hot">Today 💥Hot💥 Todo!!!</div>
      {todoList
        .sort((a, b) => a.isClear + 1 - (b.isClear + 1))
        .map(
          (hot) =>
            hot.hotFlag &&
            hot.fullyDate === today.toDateString() && (
              <div
                key={hot.todoId}
                className={hot.isClear ? "hot_todo clear" : "hot_todo"}
              >
                <FontAwesomeIcon
                  icon={faFire}
                  className={hot.isClear ? "hot_fire done" : "hot_fire fire"}
                />
                <span className="hot_text">{hot.text}</span>
              </div>
            )
        )}
    </>
  );
};
export default HomeDetail;
