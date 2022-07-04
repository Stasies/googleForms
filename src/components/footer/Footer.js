import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-wrapper">
        <div className="footer-top">
          <button className="send-button">Submit</button>
          <button className="clear-form">Clear form</button>
        </div>
        <div className="warning-message">
          <p>Never submit passwords through Google Forms.</p>
        </div>
        <div className="disclaimer">
          <p>This content is neither created nor endorsed by Google</p>
        </div>
        <div className="google-forms">
          <p>
            <b>Google</b> Forms
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
