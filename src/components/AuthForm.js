import { authService } from "fBase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import Header from "./Header";
import "../css/auth.css";

const AuthForm = () => {
  const [authId, setAuthId] = useState("");
  const [password, setPassword] = useState("");
  const [nickName, setNickName] = useState("");
  const [error, setError] = useState("");
  const [idErr, setIdErr] = useState("");
  const [pwdErr, setPwdErr] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [isBlurOut, setIsBlurOut] = useState("hidden");
  const regExpId = /\w+.@save.2day/g;
  const regExpPwd = /[a-zA-Z0-9]{8,20}[!@#$%^&*]{1,}/g;

  document.addEventListener("mouseup", () => setError(""));
  const onChange = (event) => {
    const {
      target: { value, id },
    } = event;
    if (id === "id") {
      setAuthId(`${value}@save.2day`);
    } else if (id === "pwd") {
      setPassword(value);
    } else if (id === "nickname") {
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
      if (regExpId.exec(authId) === null) {
        setIdErr("영어와 숫자만 가능합니다.");
        return;
      } else if (regExpPwd.exec(password) === null) {
        setPwdErr("영숫자 + 특수문자(!@#$%^&*)만 가능합니다.");
        return;
      } else if (newAccount && nickName === "") {
        return;
      }
      data = createUserWithEmailAndPassword(authService, authId, password)
        .then(async (data) => {
          await updateProfile(data.user, {
            displayName: nickName,
          });
        })
        .catch((e) => {
          setError(e.message);
        });
    } else {
      data = signInWithEmailAndPassword(authService, authId, password).catch(
        (error) => {
          console.log(error);
          setError("아이디/비밀번호를 다시 확인해주세요.");
        }
      );
    }
  };
  const newAccountClick = () => {
    setNewAccount((prev) => !prev);
    setIsBlurOut("text-blur-out");
  };
  return (
    <div className="auth-root">
      <div className="auth-header">
        <Header />
      </div>
      <div className="auth-form">
        <form onSubmit={onSubmit}>
          <label htmlFor="id">
            아이디{idErr && <span className="error">: {idErr}</span>}
          </label>
          <input
            onChange={onChange}
            type="text"
            placeholder="ex. abc"
            maxLength="16"
            id="id"
          />

          <label htmlFor="pwd">
            비밀번호{pwdErr && <span className="error">: {pwdErr}</span>}
          </label>
          <input
            onChange={onChange}
            type="password"
            placeholder="8~20자"
            minLength="8"
            maxLength="20"
            id="pwd"
          />

          <label
            className={newAccount ? "text-focus-in" : isBlurOut}
            htmlFor="nickname"
          >
            별명
          </label>
          <input
            className={newAccount ? "text-focus-in" : isBlurOut}
            onChange={onChange}
            type="text"
            minLength="2"
            maxLength="12"
            placeholder="2~12자"
            id="nickname"
          />
          <input
            className={newAccount ? "a" : "b"}
            type="submit"
            value={newAccount ? "등록" : "로그인"}
          />
        </form>
      </div>
      <input
        className={newAccount ? "a" : "b"}
        type="button"
        onClick={newAccountClick}
        value={newAccount ? "로그인" : "등록"}
      />
      <div className={error ? "fberr-open" : "fberr-close"}>{error}</div>
    </div>
  );
};

export default AuthForm;
