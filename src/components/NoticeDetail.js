import React from "react";

const NoticeHead = ({ notice }) => {
  return (
    <>
      {notice.map((note) => (
        <div key={note.no}>{note.title}</div>
      ))}
    </>
  );
};

export default NoticeHead;
