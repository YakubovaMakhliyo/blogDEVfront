/** @format */

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Style from "./sidebarLeft.module.scss";
import Home from "../../assets/images/home.svg";
import Profile from "../../assets/images/profile.svg";
import Twitter from "../../assets/images/twitter.svg";
import Logout from "../../assets/images/log_out.svg";
import SearchIcon from "@mui/icons-material/Search";
import { CtxProvider } from "../../context/GlobalState";
import { deleteToken, getUsername } from "../../utils/js-cookie";

const SidebarLeft = () => {
  const navigate = useNavigate();
  const { user, setIsOpen, setTweetBoxModal } = useContext(CtxProvider);

  const openModal = () => {
    setIsOpen(true);
  };

  const logOut = () => {
    deleteToken();
    navigate("/");
    window.location.reload();
  };

  return (
    <header>
      <div className={Style.header}>
        <Link to='/'>
          <div className={Style.logo}>
            <img src={Twitter} alt='logo-twitter' />
          </div>
        </Link>
        <div className={Style.menuForDesktop}>
          <ul>
            <NavLink to='/'>
              <li>
                <div className='img'>
                  <img src={Home} alt='Home' />
                </div>
                <div className='text'>Home</div>
              </li>
            </NavLink>
            <NavLink to={"/search"}>
              <li>
                <div className='img'>
                  <SearchIcon />
                </div>
                <div className='text'>Search</div>
              </li>
            </NavLink>
            {user ? (
              <NavLink to={`/${getUsername()}`}>
                <li
                  onClick={() => {
                    setTimeout(() => {
                      window.location.reload();
                    }, 1000);
                  }}
                >
                  <div className='img'>
                    <img src={Profile} alt='Profile' />
                  </div>
                  <div className='text'>Profile</div>
                </li>
              </NavLink>
            ) : (
              <li onClick={openModal}>
                <div className='img'>
                  <img src={Profile} alt='Profile' />
                </div>
                <div className='text'>Profile</div>
              </li>
            )}

            {user ? (
              <NavLink to={"/"}>
                <li onClick={logOut}>
                  <div className='img'>
                    <img src={Logout} alt='Log out' />
                  </div>

                  <div className='text'> Log out </div>
                </li>
              </NavLink>
            ) : (
              <li onClick={openModal}>
                <div className='img'>
                  <img src={Logout} alt='Log out' />
                </div>

                <div className='text'> Log in </div>
              </li>
            )}
          </ul>
        </div>
        <div className={Style.menuForTablet}>
          <ul className={Style.forTablet}>
            <NavLink to='/'>
              <li>
                <div className='img'>
                  <img src={Home} alt='Home' />
                </div>
                <div className='text'></div>
              </li>
            </NavLink>

            <NavLink to={"/search"}>
              <li>
                <div className='img'>
                  <SearchIcon />
                </div>
                <div className='text'></div>
              </li>
            </NavLink>

            {user ? (
              <NavLink to={`/${getUsername()}`}>
                <li
                  onClick={() => {
                    setTimeout(() => {
                      window.location.reload();
                    }, 1000);
                  }}
                >
                  <div className='img'>
                    <img src={Profile} alt='Profile' />
                  </div>
                  <div className='text'></div>
                </li>
              </NavLink>
            ) : (
              <li onClick={openModal}>
                <div className='img'>
                  <img src={Profile} alt='Profile' />
                </div>
                <div className='text'></div>
              </li>
            )}

            {user ? (
              <NavLink to={"/"}>
                <li onClick={logOut}>
                  <div className='img'>
                    <img src={Logout} alt='Log out' />
                  </div>

                  <div className='text'></div>
                </li>
              </NavLink>
            ) : (
              <li onClick={openModal}>
                <div className='img'>
                  <img src={Logout} alt='Log out' />
                </div>

                <div className='text'></div>
              </li>
            )}
          </ul>
        </div>
        <div className={Style.menuForMobile}>
          <ul className={Style.forMobile}>
            <NavLink to='/'>
              <li>
                <div className='img'>
                  <img src={Home} alt='Home' />
                </div>
                <div className='text'>Home</div>
              </li>
            </NavLink>

            <NavLink to={"/search"}>
              <li>
                <div className='img'>
                  <SearchIcon />
                </div>
                <div className='text'></div>
              </li>
            </NavLink>

            {user ? (
              <NavLink to={`/${getUsername()}`}>
                <li
                  onClick={() => {
                    setTimeout(() => {
                      window.location.reload();
                    }, 1000);
                  }}
                >
                  <div className='img'>
                    <img src={Profile} alt='Profile' />
                  </div>
                  <div className='text'></div>
                </li>
              </NavLink>
            ) : (
              <li onClick={openModal}>
                <div className='img'>
                  <img src={Profile} alt='Profile' />
                </div>
                <div className='text'></div>
              </li>
            )}

            {user ? (
              <NavLink to={"/"}>
                <li onClick={logOut}>
                  <div className='img'>
                    <img src={Logout} alt='Log out' />
                  </div>

                  <div className='text'></div>
                </li>
              </NavLink>
            ) : (
              <li onClick={openModal}>
                <div className='img'>
                  <img src={Logout} alt='Log out' />
                </div>

                <div className='text'></div>
              </li>
            )}
          </ul>
        </div>
        <div
          className={Style.btnForDesktop}
          onClick={() => {
            user ? setTweetBoxModal(true) : openModal();
          }}
        >
          Post
        </div>
        <div
          className={Style.btnForTablet}
          onClick={() => {
            user ? setTweetBoxModal(true) : openModal();
          }}
        >
          <i className='fa-solid fa-feather'></i>
        </div>
      </div>
    </header>
  );
};

export default SidebarLeft;
