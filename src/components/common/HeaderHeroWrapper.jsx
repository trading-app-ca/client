import React from 'react';
import Header from '../layout/Header';
import HeroSection from '../Homepage/HeroSection';

const HeaderHeroWrapper = () => {
	return (
		<div className="header-hero-wrapper">
			<Header />
			<HeroSection />
		</div>
	);
};

export default HeaderHeroWrapper;
