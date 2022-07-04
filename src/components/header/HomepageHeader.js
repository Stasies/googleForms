import React from "react";
import Logo from "../../img/logo.png";

const HomepageHeader = () => {
  return (
    <div className="header-container-home">
      <div className="header-wrapper">
        <div className="header-top">
          <div className="header-top-title">
            <img src={Logo} className="logo" alt="google forms logo" />
            <span className="header-top-title-text">Forms</span>
          </div>
          <div className="header-top-navigation">
            <div className="header-top-navigation-item">
              <div className="user-icon">A</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageHeader;
