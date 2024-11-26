/**
 * eslint-disable react-hooks/exhaustive-deps
 *
 * @format
 */

/** @format */
import { useState, useContext } from "react";
import Style from "./home.module.scss";
import Posts from "../Post/Posts";
import TweetBox from "../Post/TweetBox";
import { CtxProvider } from "../../context/GlobalState";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

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

const Home = () => {
  const { user } = useContext(CtxProvider);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <main>
      <Box
        sx={{
          width: "100%",
          ".css-19kzrtu": {
            padding: 0,
          },
          ".css-1gsv261": {
            borderBottom: "0px",
          },
        }}
      >
        <div className={Style.header}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label='basic tabs example'
              sx={{
                ".MuiTabs-flexContainer": {
                  justifyContent: "space-around",
                  padding: "20px",
                },
                ".MuiButtonBase-root": {
                  fontSize: "21px",
                },
              }}
            >
              <Tab label={user ? `For you` : `Posts`} {...a11yProps(0)} />
              {user ? <Tab label={`Following`} {...a11yProps(1)} /> : null}
            </Tabs>
          </Box>
        </div>
        {user ? <TweetBox /> : null}
        <CustomTabPanel value={value} index={0}>
          <Posts isPublic={true} />
        </CustomTabPanel>
        {user ? (
          <CustomTabPanel value={value} index={1}>
            <Posts isFollowing={true} />
          </CustomTabPanel>
        ) : null}
      </Box>
    </main>
  );

  // return (
  //   <main>
  //     <div className={Style.header}>
  //       <h1>Home</h1>
  //     </div>
  //     {user ? <TweetBox /> : null}
  //     <Posts isPublic={true} />
  //   </main>
  // );
};

export default Home;
