import React from 'react';
import HeaderHeroWrapper from '../components/common/HeaderHeroWrapper';
import FeatureCardSection from '../components/Homepage/FeatureCardSection';
import AboutSection from '../components/Homepage/AboutSection';
import HowItWorksSection from '../components/Homepage/HowItWorksSection';
import TestimonialsSection from '../components/Homepage/TestimonialsSection';
import CallToActionSection from '../components/Homepage/CallToActionSection';


const HomePage = () => {
	return (
		<div className="homepage">
			<HeaderHeroWrapper />
			<FeatureCardSection />
			<AboutSection />
			<HowItWorksSection />
			<TestimonialsSection />
			<CallToActionSection />
		</div>
	);
};

export default HomePage;
