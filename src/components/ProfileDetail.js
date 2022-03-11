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

const ProfileDetail = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [editNickName, setEditNickName] = useState("");
  const [editPhoto, setEditPhoto] = useState("");
  const [imgFile, setImgFile] = useState("");
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
  return (
    <>
      <img src={userObj.profilePhoto} alt="userPhoto" />
      <h2>{userObj.displayName}</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="EditName">Be able to use 2~8 words </label>
        <input
          onChange={onChange}
          type="text"
          maxLength={8}
          minLength={2}
          placeholder="Do you replace your nick?"
          name="EditName"
        />
        <label htmlFor="attach-file">
          <span>Change Profile Photos</span>
        </label>
        <input
          id="attach-file"
          onChange={onFileChange}
          type="file"
          accept="image/*"
          ref={fileClear}
          value={imgFile}
        />
        {editPhoto && (
          <div>
            <img
              src={editPhoto}
              style={{
                backgroundImage: editPhoto,
              }}
              alt="editPhoto"
            />
            <div onClick={onClearImgClick}>
              <span>Remove</span>
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
      <button onClick={onBack}>Home</button>
    </>
  );
};

export default ProfileDetail;
