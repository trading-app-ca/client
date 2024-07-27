import React from 'react';
import Header from '../layout/Header';
import HeroSection from '../Homepage/HeroSection';
import MainBackground from './MainBackground';

const HeaderHeroWrapper = () => {
	return (
		<MainBackground>
			 <div className="header-hero-wrapper">
				<Header />
				<HeroSection />
			</div>
		</MainBackground>
	);
};

export default HeaderHeroWrapper;
