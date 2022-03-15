import { authService, storage } from "fBase";
import { updateProfile } from "firebase/auth";
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadString,
} from "firebase/storage";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Header from "./Header";
import "../css/profile.css";
import uploadImg from "../image/upload.png";

const ProfileDetail = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [editNickName, setEditNickName] = useState("");
  const [editPhoto, setEditPhoto] = useState("");
  const [imgFile, setImgFile] = useState("");
  const [toggleEdit, setToggleEdit] = useState(false);
  const fileClear = useRef();
  const history = useHistory();
  const onBack = () => {
    history.push("/");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setEditNickName(value);
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    if (editPhoto === "" && editNickName === "") {
      return;
    }
    event.preventDefault();
    const listRef = ref(storage, `profile/${userObj.uid}`);
    listAll(listRef).then((res) => {
      res.items.forEach((item) => {
        deleteObject(ref(storage, `profile/${userObj.uid}/${item.name}`));
      });
    });
    let editPhotoURL = "";
    if (editPhoto !== "") {
      const attachmentRef = ref(storage, `profile/${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(attachmentRef, editPhoto, "data_url");
      editPhotoURL = await getDownloadURL(response.ref);
    }
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
      setEditNickName("");
    } else if (userObj.profilePhoto !== editPhoto) {
      await updateProfile(authService.currentUser, {
        photoURL: editPhotoURL,
      });
      refreshUser();
      setEditPhoto("");
    }
  };
  const onFileChange = (event) => {
    const {
      target: { files, value },
    } = event;
    setImgFile(value);
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setEditPhoto(result);
    };
    reader.readAsDataURL(files[0]);
  };
  const onClearImgClick = () => {
    setEditPhoto("");
    fileClear.current.value = null;
    setImgFile("");
  };
  const toggleEditBtn = () => setToggleEdit((prev) => !prev);
  return (
    <div className="full_porfile_box">
      <div className="header">
        <Header />
      </div>
      <div className="photo_box">
        <img
          className="photo_box__img"
          src={userObj.profilePhoto}
          alt="userPhoto"
        />
        <span className="display_name">{userObj.displayName}</span>
      </div>
      <div>
        <button onClick={onBack}>뒤로가기</button>
        <button onClick={toggleEditBtn}>
          {toggleEdit ? "수정 취소" : "프로필 수정"}
        </button>
      </div>
      {toggleEdit ? (
        <form className="edit_form" onSubmit={onSubmit}>
          <label htmlFor="EditName">Be able to use 2~8 words </label>
          <input
            onChange={onChange}
            type="text"
            maxLength={8}
            minLength={2}
            placeholder="Do you replace your nick?"
            id="EditName"
          />
          <label htmlFor="attach-file">Change Profile Photos</label>
          <input
            type="text"
            id="fileName"
            value={imgFile}
            ref={fileClear}
            disabled
          />
          <input
            id="attach-file"
            onChange={onFileChange}
            type="file"
            accept="image/*"
            ref={fileClear}
            value={imgFile}
          />

          {editPhoto && (
            <div className="editphoto_box">
              <img
                className="editphoto_box__img"
                src={editPhoto}
                style={{
                  backgroundImage: editPhoto,
                }}
                alt="editPhoto"
              />
              <div onClick={onClearImgClick}>
                <span className="remove_btn">Remove</span>
              </div>
            </div>
          )}
          <input
            type="submit"
            value="Update Profile"
            style={{
              marginTop: 10,
            }}
          />
        </form>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProfileDetail;
