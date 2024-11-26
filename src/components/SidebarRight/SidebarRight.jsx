/** @format */
import axios from "axios";
import { useState, useEffect } from "react";
import { getToken, getUsername } from "../../utils/js-cookie";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import ToProfile from "../Profile/ToProfile";
import Style from "./sidebarRight.module.scss";

const SidebarRight = () => {
  const [user, setUser] = useState("");
  const [firstLetterOfTheName, setFirstLetterOfTheName] = useState("");
  const fetchData = async () => {
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
    fetchData();
  }, []);
  console.log(user);
  return (
    <footer>
      <div className={Style.footer}>
        {getToken() ? (
          <Link to={`/${user.username}`}>
            <div className={Style.trends}>
              <div className={Style.user__logo}>
                <Avatar
                  sx={{ bgcolor: "#1d9bf0", width: 60, height: 60 }}
                  alt={user.name}
                  src={user.profile_picture}
                >
                  {firstLetterOfTheName}
                </Avatar>
              </div>
              <h2>{getUsername()}</h2>
            </div>
          </Link>
        ) : null}

        <div className={Style.info}>
          <span>created by Alitor</span>
          <span>© 2023 Twitter</span>
        </div>
      </div>
    </footer>
  );
};

export default SidebarRight;
