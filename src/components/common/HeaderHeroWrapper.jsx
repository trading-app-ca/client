import React from 'react';
import Header from '../layout/Header';
import HeroSection from '../Homepage/HeroSection';
import MainBackground from './MainBackground';

const HeaderHeroWrapper = () => {
	return (
		<MainBackground>
			<Header />
			<HeroSection />
		</MainBackground>
	);
};

export default HeaderHeroWrapper;
