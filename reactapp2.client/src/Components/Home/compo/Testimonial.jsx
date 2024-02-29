import React from "react";
import ProfilePic from "../Assets/St4.png";
import { AiFillStar } from "react-icons/ai";
import { Height } from "@mui/icons-material";

const Testimonial = () => {
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Testimonial</p>
        <h1 className="primary-heading">What They Are Saying</h1>
        <p className="primary-text">
          Life-changing expertise, trusted advisors, and tangible
          results—couldn't be happier!
        </p>
      </div>
      <div className="testimonial-section-bottom">
        <img src={ProfilePic} alt="image" style="width:auto"/>
        <p>
          From hesitant investor to confident saver, their guidance made all the
          difference. Transparent, knowledgeable, and always available for
          support.
        </p>
        <div className="testimonials-stars-container">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
        <h2>Virat Kohli</h2>
      </div>
    </div>
  );
};

export default Testimonial;
