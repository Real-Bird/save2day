import { authService, db } from "fBase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NoticeHead = () => {
  const [noticeTitle, setNoticeTitle] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "notice"), orderBy("no", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const noteArr = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setNoticeTitle(noteArr);
    });
    onAuthStateChanged(authService, (user) => {
      if (user == null) {
        unsubscribe();
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <>
      <h2>Notice</h2>
      <ul>
        {noticeTitle
          .sort((a, b) => {
            return b.key - a.key;
          })
          .slice(0, 2)
          .map((note) => (
            <li key={note.key}>
              <Link to={`/note/${note.no}`}><div style={{width: "max-content"}}>{note.title}</div></Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default NoticeHead;
