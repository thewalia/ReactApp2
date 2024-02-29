import React from "react";
import St1 from "../Assets/St1.png";
import St2 from "../Assets/St2.png";
import St3 from "../Assets/St3.png";

const Work = () => {
  const workInfoData = [
    {
      image: St1,
      title: "Growth",
      text: "Unlock your financial potential with personalized investment strategies tailored to maximize growth and long-term wealth accumulation.",
    },
    {
      image: St2,
      title: "Expert Financial Advice",
      text: "Gain invaluable insights and guidance from seasoned professionals to navigate the complexities of the market and make informed investment decisions",
    },
    {
      image: St3,
      title: "Stock Market Analysis",
      text: "Stay ahead of market trends with real-time analysis and comprehensive research tools to optimize your portfolio",
    },
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Why Choose Us:</p>
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text">
          Choose us for personalized investment strategies, expert guidance, and
          a commitment to your financial success.
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
