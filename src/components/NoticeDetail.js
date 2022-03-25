import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { authService, db } from "fBase";
import { onAuthStateChanged } from "firebase/auth";
import Header from "./Header";
import { Link } from "react-router-dom";
import "../css/notice.css";

const NoticeDetail = ({ match }) => {
  const [notice, setNotice] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "notice"), orderBy("no", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const noteArr = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setNotice(noteArr);
    });
    onAuthStateChanged(authService, (user) => {
      if (user == null) {
        unsubscribe();
      }
    });
    return () => unsubscribe();
  }, []);
  const note = notice.find((notes) => notes.no === match.params.no);
  const regExp = /\\r\\n|\\r|\\n/g;
  return (
    <div className="note-box">
      <div className="note-header">
        <Link to="/">
          <Header className="header" />
        </Link>
      </div>
      {note && (
        <div key={note.key} className="note-body">
          <span className="note-date">{`${new Date(
            note.regDate.seconds * 1000
          ).getFullYear()}-${
            new Date(note.regDate.seconds * 1000).getMonth() + 1
          }-${new Date(note.regDate.seconds * 1000).getDate()} ${new Date(
            note.regDate.seconds * 1000
          ).getHours()}:${new Date(
            note.regDate.seconds * 1000
          ).getMinutes()}`}</span>
          <h1 className="note-title">{note.title}</h1>
          <span className="note-author">작성자: {note.author}</span>
          <div className="note-text">
            {note.bodyText.replace(regExp, "\n\n")}
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticeDetail;
