/** @format */
import { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Main from "./components/Home";
import Home from "./components/Home/Home";
import Loader from "./components/Loader/Loader";
import Login from "./components/Login/Login";
import TweetBoxModal from "./components/Post/TweetBoxModal";
import EditProfile from "./components/Profile/EditProfile";

// import Profile from "./components/Profile";
import ProfileFeed from "./components/Profile/ProfileFeed";
import Search from "./components/Search/Search";
// import Register from "./components/Register/Register";
import SidebarLeft from "./components/SidebarLeft/SidebarLeft";
import SidebarRight from "./components/SidebarRight/SidebarRight";
import { CtxProvider } from "./context/GlobalState";

const Router = () => {
  const { isOpen, isRegister, tweetBoxModal, editProfileModal } =
    useContext(CtxProvider);

  useEffect(() => {
    if (isOpen || isRegister || tweetBoxModal || editProfileModal) {
      document.body.classList.add("disable-scroll");
    } else {
      document.body.classList.remove("disable-scroll");
    }

    return () => {
      document.body.classList.remove("disable-scroll");
    };
  }, [isOpen, isRegister, tweetBoxModal, editProfileModal]);

  return (
    <BrowserRouter>
      <Login />
      <TweetBoxModal />
      <EditProfile />
      <div className='container'>
        <SidebarLeft />
        <Routes>
          <Route path='*' element={<Navigate to={"/"} />} />
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/:username' element={<ProfileFeed />} />
        </Routes>
        <SidebarRight />
      </div>
    </BrowserRouter>
  );
};

export default Router;
