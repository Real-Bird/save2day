import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TodoForm from "./TodoForm";
import TodosDetails from "./TodosDetails";
import Modal from "../components/Modal";

const CalendarDetail = ({ userObj, todoList, today }) => {
  const [state, setState] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

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
      <Calendar onClickDay={openModal} calendarType="US" />
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
