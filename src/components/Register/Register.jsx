/** @format */
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Style from "./register.module.scss";
import Logo from "../../assets/images/twitter.svg";
import { CtxProvider } from "../../context/GlobalState";
import { addToken } from "../../utils/js-cookie";
import Loader from "../Loader/Loader";

const Register = () => {
  const { setIsOpen, setIsRegister, loading, setLoading } =
    useContext(CtxProvider);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const usernameRegex =
    /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const handleShowPassword = () => setShowPassword(!showPassword);

  const closeModal = () => {
    setIsOpen(false);
    setIsRegister(false);
  };

  const toLogin = () => {
    setIsRegister(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username && !email && !password)
      return setError("Please fill all the fields!");

    if (!usernameRegex.test(username.trim()))
      return setError("Username format incorrect!");

    if (!emailRegex.test(email.trim()))
      return setError("Email format incorrect!!");

    if (password !== confirmPassword)
      return setError("Password did not match!");

    if (password.trim().length < 8)
      return setError("Password must not be less than 8 characters");

    try {
      setLoading(true);
      const registerOptions = {
        method: "POST",
        url: `${import.meta.env.VITE_SERVER_API}/auth/register`,
        data: {
          username: username.toLowerCase(),
          email: email.toLowerCase(),
          password: String(password),
        },
      };
      const loginOptions = {
        method: "POST",
        url: `${import.meta.env.VITE_SERVER_API}/auth/login`,
        data: {
          login: username.toLowerCase(),
          password: String(password),
        },
      };

      await axios.request(registerOptions);
      const loginResponse = await axios.request(loginOptions);
      const token = loginResponse.data.token || "";
      addToken(token, username);
      window.location.reload(false);
    } catch (error) {
      setError(error.response.data.error);
    } finally {
      setLoading(false);
    }

    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className={Style.register_wrapper}>
      {loading ? <Loader /> : null}
      <CloseIcon
        className={Style.close_btn}
        fontSize='large'
        onClick={closeModal}
      />
      <div className={Style.register_wrapper_logo}>
        <img src={Logo} alt='Twitter logo' />
      </div>
      <h1>Create an account</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        <input
          type='password'
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <span className={Style.errorWrapper}>{error}</span>
        <button type='submit'>Create account</button>
      </form>
      <span className={Style.toLogin}>
        Do you have an account? <strong onClick={toLogin}>Login</strong>
      </span>
    </div>
  );
};

export default Register;
