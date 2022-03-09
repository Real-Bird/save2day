import React from "react";
import CalendarDetail from "components/CalendarDetail";

const CalendarPath = ({ todoList, userObj, today }) => {
  return (
    <>
      <CalendarDetail todoList={todoList} userObj={userObj} today={today} />
    </>
  );
};

export default CalendarPath;
