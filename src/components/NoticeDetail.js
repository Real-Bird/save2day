import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { authService, db } from "fBase";
import { onAuthStateChanged } from "firebase/auth";
import Header from "./Header";
import { Link } from "react-router-dom";

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
  return (
    <>
      <Link to="/">
        <Header />
      </Link>
      {note && (
        <div key={note.key}>
          <h1>{note.title}</h1>
          <span>{note.author}</span>
          <div>{note.bodyText}</div>
        </div>
      )}
    </>
  );
};

export default NoticeDetail;
