import { authService } from "fBase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";

const AuthForm = () => {
  const [authId, setAuthId] = useState("");
  const [password, setPassword] = useState("");
  const [nickName, setNickName] = useState("");
  const [error, setError] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const onChange = (event) => {
    const {
      target: { value, name }
    } = event
    if (name === "id") {
      setAuthId(value);
    } else if (name === "pwd") {
      setPassword(value);
    } else if (name === "nickname") {
      setNickName(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (authId === "" || password === "") {
      return;
    }
    let data;
    if (newAccount) {
      data = createUserWithEmailAndPassword(authService, authId, password, nickName).catch((e) => {
        setError(e.message);
      });
    } else {
      data = signInWithEmailAndPassword(authService, authId, password).catch((error) => {
        setError(error.message);
      });
    }
  };
  const newAccountClick = () => setNewAccount((prev) => !prev);
  return (
    <>

      <div>
        <form onSubmit={onSubmit}>
          <input onChange={onChange} type="email" placeholder="Id" name="id" />
          <input onChange={onChange} type="password" placeholder="Password" minLength="8" maxLength="20" name="pwd" />
          {newAccount && <input onChange={onChange} type="text" placeholder="NickName" name="nickname" />}
          <input type="submit" value={newAccount ? "Sign up" : "Log in"} />
          {error && <span>{error}</span>}
        </form>
        <button onClick={newAccountClick}>{newAccount ? "Go To Log In!" : "Go To Sign Up!"}</button>
      </div>
    </>
  )
}

export default AuthForm;
