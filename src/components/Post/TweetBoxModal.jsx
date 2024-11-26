/** @format */

import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { getToken } from "../../utils/js-cookie";
import Style from "./tweetBox.module.scss";
import { Avatar, Button } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
import { CtxProvider } from "../../context/GlobalState";
import Loader from "../Loader/Loader";

const TweetBoxModal = () => {
  const { loading, setLoading, tweetBoxModal, setTweetBoxModal } =
    useContext(CtxProvider);
  const [file, setFile] = useState();
  const [postContent, setPostContent] = useState("");
  const [selectedFileName, setSelectedFileName] = useState(0);
  const [user, setUser] = useState({});
  const [firstLetterOfTheName, setFirstLetterOfTheName] = useState("");

  const closeModal = () => {
    setTweetBoxModal(false);
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

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("post_picture", file);
      formData.append("post_content", postContent);

      const options = {
        method: "POST",
        url: `${import.meta.env.VITE_SERVER_API}/posts/create`,
        headers: {
          Authorization: getToken(),
          "content-type": "multipart/form-data",
        },
        data: formData,
      };

      const response = await axios.request(options);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setFile(null);
      window.location.reload();
    }
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
      setFirstLetterOfTheName(name.toLocaleUpperCase().slice(0, 2));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <section
      className={
        tweetBoxModal
          ? `${Style.modal} ${Style.modal_active}`
          : `${Style.modal}`
      }
    >
      <div
        className={
          tweetBoxModal
            ? `${Style.tweetBoxModal} ${Style.tweetBoxModal_active}`
            : `${Style.tweetBoxModal}`
        }
      >
        <CloseIcon className={Style.close_btn} onClick={closeModal} />
        <div className={Style.tweetBoxModal_avatar}>
          <Avatar
            sx={{ bgcolor: "#1d9bf0", width: 60, height: 60 }}
            alt={user.name}
            src={user.profile_picture}
          >
            {firstLetterOfTheName}
          </Avatar>
        </div>
        <form className={Style.tweetBoxModal_body} onSubmit={handleSubmit}>
          <textarea
            className={Style.tweetBoxModal_body_textarea}
            placeholder='What is happening?)'
            onChange={(e) => setPostContent(e.target.value)}
          ></textarea>
          <div className={Style.tweetBoxModal_body_actions}>
            <input
              type='file'
              id='tweetBoxModal'
              accept='image/*'
              onChange={handleChange}
            />
            <label htmlFor='tweetBoxModal'>
              <ImageIcon sx={{ color: "#1D9BF0" }} />
            </label>
            {selectedFileName ? (
              <span>Selected File: {selectedFileName} </span>
            ) : null}
            {postContent || file ? (
              <Button variant='contained' type='submit'>
                Post
              </Button>
            ) : (
              <Button variant='contained' type='submit' disabled>
                Post
              </Button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default TweetBoxModal;
