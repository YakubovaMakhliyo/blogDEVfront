/** @format */

/** @format */
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Style from "./login.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../../assets/images/twitter.svg";
import { addToken } from "../../utils/js-cookie";
import { CtxProvider } from "../../context/GlobalState";
import Register from "../Register/Register";

const Login = () => {
  const { isOpen, setIsOpen, isRegister, setIsRegister } =
    useContext(CtxProvider);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const usernameRegex = /^[a-zA-Z0-9_.@]{4,20}$/;

  const handleShowPassword = () => setShowPassword(!showPassword);

  const closeModal = () => {
    setIsOpen(false);
    setIsRegister(false);
  };

  const toRegister = () => {
    setIsRegister(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!login && !password) return setError("Please fill all the fields!");
    if (!usernameRegex.test(login)) return setError("Login format incorrect!");

    try {
      const options = {
        method: "POST",
        url: `${import.meta.env.VITE_SERVER_API}/auth/login`,
        data: {
          login: login.toLowerCase(),
          password: String(password),
        },
      };

      const response = await axios.request(options);
      const token = response.data.token || "";
      addToken(token, login);
      window.location.reload(false);
    } catch (error) {
      setError(error.response.data.error);
    }

    setLogin("");
    setPassword("");
  };

  return (
    <>
      <section
        className={
          isOpen ? `${Style.login_bg} ${Style.login_bg_active}` : Style.login_bg
        }
      ></section>
      <section
        className={
          isOpen ? `${Style.login} ${Style.login_active}` : Style.login
        }
      >
        {isRegister ? (
          <Register />
        ) : (
          <div className={Style.login_wrapper}>
            <CloseIcon
              className={Style.close_btn}
              fontSize='large'
              onClick={closeModal}
            />

            <div className={Style.logo}>
              <img src={Logo} alt='Twitter logo' />
            </div>
            <h1>Log in to Twitter</h1>
            <form onSubmit={handleLogin}>
              <input
                type='text'
                placeholder='Login (username)'
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
              <div className={Style.password_wrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <i
                  onClick={handleShowPassword}
                  className={
                    showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"
                  }
                ></i>
              </div>
              <span className={Style.errorWrapper}>{error}</span>
              <button type='submit'>Log in</button>
            </form>
            <span className={Style.toRegister}>
              Not registered yet? <strong onClick={toRegister}>Register</strong>
            </span>
          </div>
        )}
        {/* <div className={Style.login_wrapper}>
          <button className={Style.close_btn} onClick={closeModal}>
            Close
          </button>
          <div className={Style.logo}>
            <img src={Logo} alt='Twitter logo' />
          </div>
          <h1>Log in to Twitter</h1>
          <form onSubmit={handleLogin}>
            <input
              type='text'
              placeholder='Login (username or email)'
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <div className={Style.password_wrapper}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <i
                onClick={handleShowPassword}
                className={
                  showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"
                }
              ></i>
            </div>
            <span className={Style.errorWrapper}>{error}</span>
            <button type='submit'>Log in</button>
          </form>
          <span className={Style.toRegister}>
            Not registered yet?{" "}
            <Link to='/register'>
              <strong>Register</strong>
            </Link>
          </span>
        </div> */}
      </section>
    </>
  );
};

export default Login;
