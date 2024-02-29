import React from "react";
import AboutBackgroundImage from "../Assets/st.webp";
import { BsFillPlayCircleFill } from "react-icons/bs";

const About = () => {
  return (
    <div className="about-section-container">
      <div className="about-background-image-container">
        {/* <img src={AboutBackground} alt="" /> */}
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="image"  />
      </div>
      <div className="about-section-text-container">
        {/* <p className="primary-subheading">About</p> */}
        <h1 className="primary-heading">
          Your Trusted Partner In Financial Growth!
        </h1>
        <p className="primary-text">
          Our mission is to provide personalized investment solutions tailored
          to your unique needs and objectives.
        </p>
        <p className="primary-text">
          We believe in open and transparent communication, keeping you informed
          about your investments and financial progress.
        </p>
        <div className="about-buttons-container">
          <button className="secondary-button">Learn More</button>
          <button className="watch-video-button">
            <BsFillPlayCircleFill /> Watch Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
