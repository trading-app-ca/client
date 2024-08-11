import React, { useEffect, useRef } from 'react';
import HeaderHeroWrapper from '../components/common/HeaderHeroWrapper';
import FeatureCardSection from '../components/Homepage/FeatureCardSection';
import AboutSection from '../components/Homepage/AboutSection';
import HowItWorksSection from '../components/Homepage/HowItWorksSection';
import TestimonialsSection from '../components/Homepage/TestimonialsSection';
import CallToActionSection from '../components/Homepage/CallToActionSection';

const HomePage = () => {
  // Ref to hold references to each section element
  const sectionsRef = useRef([]);

  useEffect(() => {
    // Create an IntersectionObserver instance to handle section visibility
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Add 'visible' class when section comes into view
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing the section after it becomes visible
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
      }
    );

    // Observe each section element
    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      if (sectionsRef.current) {
        sectionsRef.current.forEach((section) => {
          if (section) observer.unobserve(section);
        });
      }
    };
  }, []);

  return (
    <div className="homepage">
      <HeaderHeroWrapper />
      <FeatureCardSection />
      <div id="about" ref={(el) => (sectionsRef.current[0] = el)} className="scroll-animation">
        <AboutSection />
      </div>
      <div id="how-it-works" ref={(el) => (sectionsRef.current[1] = el)} className="scroll-animation">
        <HowItWorksSection />
      </div>
      <div ref={(el) => (sectionsRef.current[2] = el)} className="scroll-animation">
        <TestimonialsSection />
      </div>
      <div ref={(el) => (sectionsRef.current[3] = el)} className="scroll-animation">
        <CallToActionSection />
      </div>
    </div>
  );
};

export default HomePage;
