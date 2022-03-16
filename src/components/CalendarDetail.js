import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import TodoForm from "./TodoForm";
import TodosDetails from "./TodosDetails";
import Modal from "../components/Modal";
import dayjs from "dayjs";
import "../css/calendar.css";
import Todos from "router/Todos";

const CalendarDetail = ({ userObj, todoList, today }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [dateValue, setDateValue] = useState(new Date());
  const [dateTodo, setDateTodo] = useState([{}]);

  useEffect(() => {
    todoList.map((item) => {
      setDateTodo((prev) => [
        ...prev,
        { date: item.fullyDate, flag: item.hotFlag },
      ]);
    });
    return dateTodo;
  }, []);

  const openModal = () => {
    setModalOpen(true);
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
        tileContent={({ date, view }) => {
          if (dateTodo.find((item) => item.date === date.toDateString())) {
            return (
              <>
                <div className="flex justify-center items-center absoluteDiv">
                  {dateTodo.find(
                    (item) =>
                      item.flag === true && item.date === date.toDateString()
                  ) && <div className="hot-dot"></div>}
                  <div className="nomal-dot"></div>
                </div>
              </>
            );
          }
        }}
        calendarType="US"
      />
      <Modal
        open={modalOpen}
        close={closeModal}
        header={
          dateValue.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)
            ? "Today"
            : `${dateValue.getFullYear()}년 ${
                dateValue.getMonth() + 1
              }월 ${dateValue.getDate()}일`
        }
      >
        <Todos
          todoList={todoList}
          userObj={userObj}
          dateValue={dateValue}
          today={today}
        />
      </Modal>
    </>
  );
};

export default CalendarDetail;
