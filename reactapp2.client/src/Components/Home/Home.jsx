import React from "react";
// import BannerBackground from "../Assets/home-banner-background.png";
import { Link } from "react-router-dom";
import BannerImage from "./Assets/St5.jpg";
import Navbar from "./compo/Navbar";
import { FiArrowRight } from "react-icons/fi";
import About from "./compo/About";
import Contact from "./compo/Contact";
import Footer from "./compo/Footer";
import Testimonial from "./compo/Testimonial";
import Work from "./compo/Work";
import "./Home.css";

export const Home = () => {
  return (
    <div className="App">
      <div className="home-container">
        <Navbar />
        <div className="home-banner-container">
          <div className="home-bannerImage-container">
            {/* <img src={BannerBackground} alt="" /> */}
          </div>
          <div className="home-text-section">
            <h1 className="primary-heading">
              Get Started and Secure Financial Future!
            </h1>
            <p className="primary-text">
              -Evaluate finances, set goals, and budget smartly. <br />
              -Diversify investments, plan for retirement, manage risk. <br />
              -Seek expert advice, stay informed, adjust plans as needed.
              <br />
              -Save for emergencies, insure adequately for protection. <br />{" "}
              -Stay disciplined, patient, and proactive for financial security.
            </p>

            <Link to={"/Register"}>
              <button className="secondary-button">
                Sign up now <FiArrowRight />{" "}
              </button>
            </Link>
          </div>
          <div className="home-image-section">
            <img src={BannerImage} alt="" />
          </div>
        </div>
        <About />
        <Work />
        <Testimonial />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};
