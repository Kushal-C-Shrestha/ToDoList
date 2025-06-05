import React from "react";
import './Footer.css'; 

const Footer = () => {
  return (
    <div className="footer-contents">
      <div className="buttons-container active" data-id="personal-buttons_container">
        <button className="footer-buttons" id="delete-button">
          Delete
        </button>
        <button className="footer-buttons" id="complete-button">
          Mark as complete
        </button>
      </div>
    </div>
  );
};

export default Footer;
