import React, { useState } from "react";
import Calendar from "react-calendar";
import TodoForm from "./TodoForm";
import TodosDetails from "./TodosDetails";
import Modal from "../components/Modal";
import dayjs from "dayjs";
import "../css/calendar.css";

const CalendarDetail = ({ userObj, todoList, today }) => {
  const [state, setState] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [dateValue, setDateValue] = useState(new Date());
  const openModal = (e) => {
    setModalOpen(true);
    setState({
      year: e.getFullYear(),
      month: e.getMonth() + 1,
      date: e.getDate(),
    });
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <Calendar
        formatDay={(locale, date) => dayjs(date).format("D")}
        formatShortWeekday={(locale, date) =>
          dayjs(date).format("ddd").toUpperCase()
        }
        formatMonth={(locale, date) => dayjs(date).format("M")}
        formatYear={(locale, date) => dayjs(date).format("YYYY")}
        formatMonthYear={(locale, date) =>
          dayjs(date).format("YYYY MMM").toUpperCase()
        }
        onClickDay={openModal}
        onChange={setDateValue}
        value={dateValue}
        calendarType="US"
      />
      <Modal
        open={modalOpen}
        close={closeModal}
        header={
          state.year === today.year &&
          state.month === today.month &&
          state.date === today.date
            ? "Today"
            : `${state.year}년 ${state.month}월 ${state.date}일`
        }
      >
        {todoList.map((todo) => (
          <TodosDetails
            key={todo.todoId}
            userObj={userObj}
            todoObj={todo}
            state={state}
            today={today}
          />
        ))}
        {state.year >= today.year &&
        state.month >= today.month &&
        state.date >= today.date ? (
          <TodoForm userObj={userObj} state={state} />
        ) : (
          <></>
        )}
      </Modal>
    </>
  );
};

export default CalendarDetail;
