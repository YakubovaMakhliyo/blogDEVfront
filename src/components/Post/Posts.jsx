/**
 * eslint-disable react-hooks/exhaustive-deps
 *
 * @format
 */

/** @format */
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Style from "./posts.module.scss";
import CommentIcon from "@mui/icons-material/Comment";
import Avatar from "@mui/material/Avatar";
import Loader from "../Loader/Loader";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { CtxProvider } from "../../context/GlobalState";
import { getToken } from "../../utils/js-cookie";
import { Link } from "react-router-dom";
import { getUsername } from "../../utils/js-cookie";

const Posts = ({ isPublic, isFollowing, isMe, otherUserPosts, isLiked }) => {
  const { currentUsername } = useContext(CtxProvider);
  const [likedPosts, setLikedPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getPostID = (postId) => {
    setSelectedPostId(postId);
    handleOpen();
  };

  const toggleLike = async (postId, isLiked) => {
    try {
      let method;
      if (isLiked) {
        method = "DELETE";
      } else {
        method = "POST";
      }

      const options = {
        method,
        url: `${import.meta.env.VITE_SERVER_API}/likes/${postId}`,
        headers: {
          authorization: getToken(),
        },
      };

      const response = await axios.request(options);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
    }
  };

  async function handleDelete(e) {
    try {
      setLoading(true);

      const options = {
        method: "DELETE",
        url: `${import.meta.env.VITE_SERVER_API}/posts/${selectedPostId}`,
        headers: {
          Authorization: getToken(),
        },
      };

      const response = await axios.request(options);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  }

  let url;
  let token;

  if (isPublic) {
    url = `${import.meta.env.VITE_SERVER_API}/posts/public`;
  }

  if (isFollowing) {
    url = `${import.meta.env.VITE_SERVER_API}/posts/followed-posts`;
    token = getToken();
  }

  if (isMe) {
    url = `${import.meta.env.VITE_SERVER_API}/posts/my-posts`;
    token = getToken();
  }

  if (otherUserPosts) {
    url = `${import.meta.env.VITE_SERVER_API}/users/${otherUserPosts}`;
  }
  if (isLiked) {
    url = `${import.meta.env.VITE_SERVER_API}/likes`;
  }

  const options = {
    method: "GET",
    url,
    headers: {
      Authorization: getToken(),
    },
    params: {
      page: "1",
      limit: "100",
    },
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.request(options);
      if (otherUserPosts) {
        setData(response.data.data.posts);
        const likedPosts = response.data.data.posts.map((post) => {
          return post.likedUsers.some(
            (user) => user.username === getUsername()
          );
        });

        setLikedPosts(likedPosts);
      } else {
        setData(response.data.data);
      }
      if (isPublic) {
        const likedPosts = response.data.data.map((post) => {
          return post.likedUsers.some(
            (user) => user.username === getUsername()
          );
        });

        setLikedPosts(likedPosts);
      }
      if (isLiked || isFollowing) {
        const likedPosts = response.data.data.map((post) => {
          return post.likedUsers.some(
            (user) => user.username === getUsername()
          );
        });

        setLikedPosts(likedPosts);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const tweets = data.map((post, index) => {
    const name = post.owner_the_post.name;
    const firstLetterOfTheName = name.toLocaleUpperCase().slice(0, 2);
    const isLiked = likedPosts[index];

    return (
      <div
        className={Style.card}
        key={post.post_id}
        post_id={post.post_id}
        username={post.owner_the_post.username}
      >
        <Link to={`/${post.owner_the_post.username}`}>
          <div className={Style.user__logo}>
            <Avatar
              sx={{ bgcolor: "#1d9bf0", width: 60, height: 60 }}
              alt={post.owner_the_post.name}
              src={post.owner_the_post.profile_picture}
            >
              {firstLetterOfTheName}
            </Avatar>
          </div>
        </Link>
        <div className={Style.textCnt}>
          <Link to={`/${post.owner_the_post.username}`}>
            <div className={Style.user__info}>
              <p>
                <strong>{post.owner_the_post.name}</strong> @
                {post.owner_the_post.username.toLowerCase()} ·{" "}
                {post.post_created_date.slice(5)}
              </p>
              {isMe ? (
                open && selectedPostId === post.post_id ? (
                  <div>
                    <CheckIcon
                      onClick={handleDelete}
                      className={Style.user__info_checkIcon}
                    />
                    <ClearIcon onClick={handleClose} />
                  </div>
                ) : (
                  <DeleteIcon onClick={() => getPostID(post.post_id)} />
                )
              ) : null}
            </div>
          </Link>
          <div className={Style.user__content}>
            <p>{post.post_content}</p>
          </div>
          <div className={Style.postPicture}>
            {" "}
            {post.post_picture ? (
              <img src={post.post_picture} alt='post picture' />
            ) : null}
          </div>
          <div className={Style.user__actives}>
            <div
              className={
                isLiked
                  ? `${Style.likes} ${Style.likes_active}`
                  : `${Style.likes}`
              }
              onClick={() => toggleLike(post.post_id, isLiked)}
            >
              <i className='fa-solid fa-heart'></i>
              {post.likes}
            </div>
            <div className={Style.retweets}>
              <i>
                <CommentIcon />
              </i>
              {post.comments_count}
            </div>
            {/* <div className={Style.views}>
              <i className='fa-solid fa-eye'></i>
              {post.views}
            </div> */}
          </div>
        </div>
      </div>
    );
  });

  return <div className={Style.body}>{tweets}</div>;
};

export default Posts;
