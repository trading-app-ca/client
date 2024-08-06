import React from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/images/hero-image-home.jpeg";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleScroll = (section) => {
    navigate('/');
    setTimeout(() => {
      const sectionElement = document.getElementById(section);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="hero-content">
      <div className="left-container">
        <h1>Trade Cryptocurrencies with Confidence</h1>
        <p>Simulate trading, manage your portfolio, and learn about cryptocurrency trading without any risk.</p>
        <div className="hero-buttons">
          <button onClick={() => navigate('/register')} className="signup lgt-btn btn">Create Account</button>
          <button onClick={() => handleScroll('how-it-works')} className="learn-more drk-btn btn">Learn More</button>
        </div>	
      </div>
      <div className="right-container">
        <img src={heroImage} alt="abstract trading" />
      </div>
    </div>
  );
};

export default HeroSection;
