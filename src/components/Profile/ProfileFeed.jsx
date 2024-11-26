/**
 * eslint-disable react-hooks/exhaustive-deps
 *
 * @format
 */

/** @format */
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Style from "./profileFeed.module.scss";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import { CtxProvider } from "../../context/GlobalState";
import { getToken, getUsername } from "../../utils/js-cookie";
import Loader from "../Loader/Loader";
import Posts from "../Post/Posts";
import { useNavigate, useParams } from "react-router-dom";
import ToProfile from "./ToProfile";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProfileFeed = () => {
  const navigate = useNavigate();
  const {
    user,
    loading,
    setLoading,
    currentUsername,
    editProfileModal,
    setEditProfileModal,
  } = useContext(CtxProvider);
  const { username } = useParams();
  const [isFollowed, setIsFollowed] = useState(false);
  const [data, setData] = useState([]);
  const [isMe, setIsMe] = useState(false);
  const [value, setValue] = useState(0);
  const [error, setError] = useState("");

  const openModal = () => {
    setEditProfileModal(true);
  };

  const handleGoBack = () => {
    navigate(-1);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleFollow = async (targetName) => {
    try {
      let method;
      if (isFollowed) {
        method = "DELETE";
      } else {
        method = "POST";
      }

      const options = {
        method,
        url: `${import.meta.env.VITE_SERVER_API}/follow/${targetName}`,
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

  const reformatDate = (input) => {
    let date = new Date(input);

    let options = {
      year: "numeric",
      month: "long",
    };

    return date.toLocaleDateString("en-US", options);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      let url;
      if (currentUsername == username) {
        url = `${import.meta.env.VITE_SERVER_API}/users/me`;
        setIsMe(true);
      } else {
        url = `${import.meta.env.VITE_SERVER_API}/users/${username}`;
        setIsMe(false);
      }

      const options = {
        method: "GET",
        url,
        headers: {
          Authorization: user,
        },
      };
      const response = await axios.request(options);
      setData(response.data.data);

      const isFollowed = response.data.data.followers.some(
        (follower) => follower.username === getUsername()
      );
      setIsFollowed(isFollowed);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  let firstLetterOfTheName;

  if (isMe) {
    firstLetterOfTheName = currentUsername.toLocaleUpperCase().slice(0, 2);
  } else {
    firstLetterOfTheName = username.toLocaleUpperCase().slice(0, 2);
  }
  return (
    <main>
      {loading ? <Loader /> : null}
      <section className={Style.header}>
        <ArrowBackIcon
          className={Style.header_back_icon}
          fontSize='large'
          onClick={handleGoBack}
        />
        <div className={Style.header_info}>
          <h2>
            {error ? "Profile" : data.name ? data.name : `@${data.username}`}
          </h2>
          <span>{data.posts_count} Posts</span>
        </div>
      </section>
      <section className={Style.body}>
        <section className={Style.profile}>
          <div className={Style.profile_avatar}>
            <Avatar
              sx={{
                bgcolor: "#1d9bf0",
                width: 150,
                height: 150,
                border: "5px solid #fff",
                fontSize: 48,
              }}
              alt={data.name}
              src={data.profile_picture}
            >
              {firstLetterOfTheName}
            </Avatar>
          </div>
          {error ? (
            <></>
          ) : (
            <div className={Style.profile_info}>
              <div className={Style.profile_info_namesAndBtn}>
                <div className={Style.profile_info_namesAndBtn_names}>
                  <strong>{data.name}</strong>
                  <span>@{error ? error : data.username}</span>
                </div>
                {error ? (
                  <></>
                ) : (
                  <Button
                    className={Style.profile_info_namesAndBtn_btn}
                    variant='outlined'
                    onClick={
                      isMe ? openModal : () => toggleFollow(data.username)
                    }
                  >
                    {isMe ? `Edit profile` : isFollowed ? `Unfollow` : `Follow`}
                  </Button>
                )}
              </div>
              <div className={Style.profile_info_bio}>{data.bio}</div>

              <Stack
                className={Style.profile_info_actives}
                direction='row'
                spacing={2}
              >
                <span>
                  <CalendarMonthIcon /> Joined {reformatDate(data.joined_date)}
                </span>
                <span>
                  <a href={`mailto:${data.email}`}>
                    <AttachEmailIcon /> {data.email}
                  </a>
                </span>
              </Stack>
            </div>
          )}
        </section>
        {error ? (
          <div className={Style.error_message}>{error}</div>
        ) : (
          <Box
            sx={{
              width: "100%",
              ".css-19kzrtu": {
                padding: 0,
              },
            }}
          >
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label='basic tabs example'
                sx={{
                  ".MuiTabs-flexContainer": {
                    justifyContent: "space-evenly",
                  },
                }}
              >
                <Tab
                  label={
                    isMe
                      ? `My posts (${data.posts_count})`
                      : `Posts  (${data.posts_count})`
                  }
                  {...a11yProps(0)}
                />
                <Tab
                  label={`${data.followers_count} Followers`}
                  {...a11yProps(1)}
                />
                <Tab
                  label={`${data.following_count} Following`}
                  {...a11yProps(2)}
                />
                {isMe ? <Tab label={`Liked posts`} {...a11yProps(3)} /> : null}
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              {isMe ? (
                <Posts isMe={true} />
              ) : (
                <Posts otherUserPosts={username} />
              )}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <ToProfile data={data.followers} myName={currentUsername} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <ToProfile data={data.following} myName={currentUsername} />
            </CustomTabPanel>
            {isMe ? (
              <CustomTabPanel value={value} index={3}>
                <Posts isLiked={true} />
              </CustomTabPanel>
            ) : null}
          </Box>
        )}
      </section>
    </main>
  );
};

export default ProfileFeed;
