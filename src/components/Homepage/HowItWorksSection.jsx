import React from "react";
import stepsImage from '../../assets/images/howitworks-section-image.jpeg';
import number1 from '../../assets/icons/number-1.png';
import number2 from '../../assets/icons/number-2.png';
import number3 from '../../assets/icons/number-3.png';
import number4 from '../../assets/icons/number-4.png';

const steps = [
    {
        number: 1,
        title: 'Sign Up',
        description: 'Create an account',
        icon: number1
    },
    {
        number: 2,
        title: 'Deposit',
        description: 'Add virtual funds to your account.',
        icon: number2
    },
    {
        number: 3,
        title: 'Trade',
        description: 'Buy and sell cryptocurrencies.',
        icon: number3
    },
    {
        number: 4,
        title: 'Manage',
        description: 'Monitor your portfolio and track performance.',
        icon: number4
    }
];

function HowItWorksSection() {
    return (
        <div className="how-it-works-section">
            <div className="how-it-works-content">
                <div className="steps">
                    <h2>How It Works</h2>
                    {steps.map((step) => (
                        <div key={step.number} className="step">
                            <img src={step.icon} alt={`Step ${step.number}`} className="step-icon" />
                            <div className="step-info">
                                <h3 className="step-title">{step.title}</h3>
                                <p className="step-description">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="steps-image">
                    <img src={stepsImage} alt="How it works steps" />
                </div>
            </div>
        </div>
    );
}

export default HowItWorksSection;
