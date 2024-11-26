/** @format */
import { useContext } from "react";
import "../App.css";

import SidebarLeft from "./SidebarLeft/SidebarLeft";
import SidebarRight from "./SidebarRight/SidebarRight";
import Home from "./Home/Home";
import { CtxProvider } from "../context/GlobalState";
// import Modal from "./SidebarLeft/Modal";
import Login from "./Login/Login";

const Main = () => {
  const { isOpen } = useContext(CtxProvider);
  return (
    <div className='container'>
      {isOpen ? <Login /> : <></>}
      <SidebarLeft />
      <Home />
      <SidebarRight />
    </div>
  );
};

export default Main;
