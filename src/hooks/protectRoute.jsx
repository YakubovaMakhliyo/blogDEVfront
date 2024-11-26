/** @format */
import { getToken } from "../utils/js-cookie";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectRoute = () => {
  const navigate = useNavigate();
  const token = getToken("token");
  return token ? <Outlet /> : navigate("/login");
};

export default ProtectRoute;
