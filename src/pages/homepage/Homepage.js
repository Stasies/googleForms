import React from "react";
import Header from "../../components/header/Header";
import HomepageHeader from "../../components/header/HomepageHeader";
import Recent from "../../components/recent/Recent";
import Start from "../../components/start/Start";
import "./homepage.css";

const Homepage = () => {
  return (
    <div className="home-container">
      <HomepageHeader />
      <Start />
      <Recent />
    </div>
  );
};

export default Homepage;
