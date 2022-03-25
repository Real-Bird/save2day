import React from "react";
import "../css/modal.css";
import TodoForm from "./TodoForm";

const Modal = (props) => {
  const { open, close, header, dateValue, userObj, today } = props;
  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>{props.children}</main>
          <footer>
            <TodoForm userObj={userObj} dateValue={dateValue} today={today} />
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;
