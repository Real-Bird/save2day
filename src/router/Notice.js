import NoticeHead from "components/NoticeDetail";
import { authService, db } from "fBase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Notice = () => {
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
  return (
    <>
      <div className="notice">
        <h2>Notice</h2>
        <div>
          <NoticeHead notice={notice} />
        </div>
      </div>
    </>
  );
};

export default Notice;
