import React, { useState } from "react";
import Calendar from "react-calendar";
import Modal from "../components/Modal";
import dayjs from "dayjs";
import "../css/calendar.css";
import Todos from "router/Todos";

const CalendarDetail = ({ userObj, todoList, today }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [dateValue, setDateValue] = useState(new Date());
  const arrowBtnAll = document.querySelectorAll(
    ".react-calendar__navigation__arrow"
  );
  arrowBtnAll.forEach((btn) => {
    btn.style.fontFamily = "Courier New";
    btn.style.fontSize = "1.2em";
  });
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
          return (
            <>
              {todoList.map(
                (hot) =>
                  hot.hotFlag &&
                  hot.fullyDate === date.toDateString() && (
                    <span className="hot-dot"></span>
                  )
              )}
              {todoList.map(
                (hot) =>
                  hot.hotFlag === false &&
                  hot.fullyDate === date.toDateString() && (
                    <span className="nomal-dot"></span>
                  )
              )}
            </>
          );
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
        userObj={userObj}
        dateValue={dateValue}
        today={today}
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
