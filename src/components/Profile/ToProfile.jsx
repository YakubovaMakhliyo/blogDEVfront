/** @format */
import { useState, useEffect, useContext } from "react";

import Style from "./profileFeed.module.scss";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { CtxProvider } from "../../context/GlobalState";
import { getToken, getUsername } from "../../utils/js-cookie";
import { useNavigate, Link } from "react-router-dom";

const ToProfile = ({ data, myName }) => {
  //   const navigate = useNavigate();
  const { user, loading, setLoading, currentUsername } =
    useContext(CtxProvider);

  const users = data.map((user) => {
    const firstLetterOfTheName = user.name.toLocaleUpperCase().slice(0, 2);

    return (
      <div
        style={
          myName === user.username
            ? { backgroundColor: "rgba(29, 161, 242, 0.1)" }
            : null
        }
        className={Style.user}
        key={user.user_id}
        user_id={user.user_id}
        username={user.username}
      >
        <div className={Style.user_logo}>
          <Avatar
            sx={{ bgcolor: "#1d9bf0", width: 60, height: 60 }}
            alt={user.name}
            src={user.profile_picture}
          >
            {firstLetterOfTheName}
          </Avatar>
        </div>

        <div className={Style.user_namesAndBtn}>
          <div className={Style.user_namesAndBtn_content}>
            <strong>{user.name}</strong>
            <span>@{user.username}</span>
            <div>{user.bio}</div>
          </div>
          <Link to={`/${user.username}`}>
            <Button
              className={Style.user_namesAndBtn_btn}
              variant='contained'
              onClick={() => {
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }}
            >
              Go to Profile
            </Button>
          </Link>
        </div>
      </div>
    );
  });

  return users;
};

export default ToProfile;
