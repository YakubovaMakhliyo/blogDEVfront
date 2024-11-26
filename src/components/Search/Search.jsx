/** @format */
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import Style from "./search.module.scss";
import axios from "axios";
import { CtxProvider } from "../../context/GlobalState";
import Loader from "../Loader/Loader";
import ToProfile from "../Profile/ToProfile";
import { getUsername } from "../../utils/js-cookie";

const Search = () => {
  const navigate = useNavigate();
  const { loading, setLoading, queryRef, currentUsername } =
    useContext(CtxProvider);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const options = {
        method: "GET",
        url: `${import.meta.env.VITE_SERVER_API}/search`,
        params: {
          query: queryRef.current.value,
        },
      };

      setLoading(true);

      const response = await axios.request(options);
      setResults(response.data.data);
    } catch (error) {
      console.log(error.response);
    } finally {
      setLoading(false);
      setQuery("");
    }
  };
  return (
    <main>
      {loading ? <Loader /> : null}
      <section className={Style.header}>
        <ArrowBackIcon
          className={Style.header_back_icon}
          fontSize='large'
          onClick={handleGoBack}
        />

        <form className={Style.search} onSubmit={handleSearch}>
          <SearchIcon className={Style.search_icon} />
          <input
            type='search'
            placeholder='Search Twitter'
            onChange={(e) => setQuery(e.target.value)}
            ref={queryRef}
          />
        </form>
      </section>
      <section className={Style.body}>
        {results.length === 0 ? (
          <div className={Style.error_message}>No such users</div>
        ) : (
          <ToProfile data={results} myName={currentUsername} />
        )}
      </section>
    </main>
  );
};

export default Search;
