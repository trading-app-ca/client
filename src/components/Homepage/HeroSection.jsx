import React from "react";
import MainBackground from "../common/MainBackground";
import heroImage from "../../assets/images/hero-image-home.jpeg";

const HeroSection = () => {
  return (
    <MainBackground>
      <div className="hero-content">
        <div className="left-container">
          <h1>Trade Cryptocurrencies with Confidence</h1>
          <p>Simulate trading, manage your portfolio, and learn about cryptocurrency trading without any risk.</p>
          <div className="hero-buttons">
            <button className="signup lgt-btn btn">Create Account</button>
            <button className="learn-more drk-btn btn">Learn More</button>
          </div>	
        </div>
        <div className="right-container">
          <img src={heroImage} alt="abstract trading" />
        </div>
      </div>
    </MainBackground>
  );
};

export default HeroSection;
