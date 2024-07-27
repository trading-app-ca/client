import React from "react";
import MainBackground from "../common/MainBackground";


const HeroSection = () => {
	return (
		<MainBackground>
			<div className="hero-content">
				<h1>Trade Cryptocurrencies with Confidence</h1>
				<p>Simulate trading, manage your portfolio, and learn about cryptocurrency trading without any risk.</p>
				<div>
					<button>Create Account</button>
					<button>Learn More</button>
				</div>
			</div>
		</MainBackground>
	);
};

export default HeroSection;