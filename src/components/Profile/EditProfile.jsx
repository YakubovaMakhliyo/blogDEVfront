/** @format */

/** @format */
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Style from "./editProfile.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Avatar } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { CtxProvider } from "../../context/GlobalState";
import Loader from "../Loader/Loader";
import { getToken, deleteToken, addToken } from "../../utils/js-cookie";

const EditProfile = () => {
  const { loading, setLoading, setEditProfileModal, editProfileModal } =
    useContext(CtxProvider);
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [file, setFile] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [firstLetterOfTheName, setFirstLetterOfTheName] = useState("");
  const [error, setErrorMsg] = useState("");
  const [currentUsername, setCurrentUsername] = useState("");
  const usernameRegex =
    /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

  const closeModal = () => {
    setEditProfileModal(false);
  };

  function handleChange(e) {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setSelectedFileName(selectedFile.name);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (username && !usernameRegex.test(username.trim()))
      return setErrorMsg("Username format incorrect!");

    try {
      setLoading(true);
      const formData = new FormData();
      file ? formData.append("profile_pic", file) : null;
      username ? formData.append("username", username) : null;
      name ? formData.append("name", name) : null;
      bio ? formData.append("bio", bio) : null;

      const options = {
        method: "PUT",
        url: `${import.meta.env.VITE_SERVER_API}/users/me`,
        headers: {
          Authorization: getToken(),
          "content-type": "multipart/form-data",
        },
        data: formData,
      };

      const response = await axios.request(options);
      const newToken = response.data.data;
      newToken && username ? deleteToken() : null;
      newToken && username
        ? addToken(newToken, username)
        : addToken(newToken, currentUsername);

      newToken && username ? navigate(`/${username}`) : null;
    } catch (error) {
      setErrorMsg(error.response.data.message);
    } finally {
      window.location.reload();
    }

    setLoading(false);
    setFile(null);
    setUsername("");
    setName("");
    setBio("");
  }
  const fetchUser = async () => {
    try {
      const options = {
        method: "GET",
        url: `${import.meta.env.VITE_SERVER_API}/users/me`,
        headers: {
          Authorization: getToken(),
        },
      };

      const response = await axios.request(options);

      setUser(response.data.data);
      const name = response.data.data.name;
      setCurrentUsername(response.data.data.username);
      setFirstLetterOfTheName(name.toLocaleUpperCase().slice(0, 2));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <section
        className={
          editProfileModal
            ? `${Style.login_bg} ${Style.login_bg_active}`
            : Style.login_bg
        }
      ></section>
      <section
        className={
          editProfileModal
            ? `${Style.login} ${Style.login_active}`
            : Style.login
        }
      >
        <div className={Style.login_wrapper}>
          <CloseIcon
            className={Style.close_btn}
            fontSize='large'
            onClick={closeModal}
          />

          <div className={Style.login_wrapper_header}>
            <h2>Edit profile</h2>
            {error ? <div className={Style.errorWrapper}>{error}</div> : null}
            {file || username || name || bio ? (
              <Button variant='contained' onClick={handleSubmit}>
                Save
              </Button>
            ) : (
              <Button variant='contained' disabled>
                Save
              </Button>
            )}
          </div>

          <form className={Style.tweetBox_body}>
            <div className={Style.tweetBox_body_actions}>
              <input
                type='file'
                id='profile'
                accept='image/*'
                onChange={handleChange}
              />
              <label htmlFor='profile'>
                <div className={Style.profile_avatar}>
                  <span></span>
                  <Avatar
                    sx={{
                      bgcolor: "#1d9bf0",
                      width: 150,
                      height: 150,
                      border: "5px solid #fff",
                      fontSize: 48,
                    }}
                    src={user.profile_picture}
                  >
                    {firstLetterOfTheName}
                  </Avatar>
                  <i>
                    <AddAPhotoIcon />
                  </i>
                </div>
              </label>
              {selectedFileName ? (
                <span className={Style.selectedFile}>
                  <RemoveCircleIcon
                    onClick={() => {
                      setFile();
                      setSelectedFileName("");
                    }}
                  />{" "}
                  Selected File: {selectedFileName}{" "}
                </span>
              ) : null}
            </div>
            <input
              type='text'
              placeholder='Change username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type='text'
              placeholder='Change name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type='text'
              placeholder='Change bio'
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </form>
        </div>
      </section>
    </>
  );
};

export default EditProfile;
