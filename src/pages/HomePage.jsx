import React from 'react';
import HeroSection from '../components/Homepage/HeroSection';
import FeatureCardSection from '../components/Homepage/FeatureCardSection';
import AboutSection from '../components/Homepage/AboutSection';
import HowItWorksSection from '../components/Homepage/HowItWorksSection';
import TestimonialsSection from '../components/Homepage/TestimonialsSection';
import CallToActionSection from '../components/Homepage/CallToActionSection';


const HomePage = () => {
  return (
    <div className='homepage'>
      <HeroSection />
      <FeatureCardSection />
      <AboutSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CallToActionSection />
    </div>
  );
};

export default HomePage;
