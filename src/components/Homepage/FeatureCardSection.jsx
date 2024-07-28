import React from 'react';
import tradingChartsIcon from '../../assets/icons/trading-charts.png';
import simulatedTradeIcon from '../../assets/icons/simulated-trade.png';
import performanceIcon from '../../assets/icons/performance.png';
import secureAccountIcon from '../../assets/icons/secure-account.png';

const features = [
    {
        icon: tradingChartsIcon,
        title: 'Real-Time Cryptocurrency Charts',
        description: 'View real-time cryptocurrency charts and stay updated with the latest trends.'
    },
    {
        icon: simulatedTradeIcon,
        title: 'Simulated Trading Environment',
        description: 'Practice trading in a simulated environment without any risk.'
    },
    {
        icon: performanceIcon,
        title: 'Performance Metrics',
        description: 'Track your performance and improve your trading strategies with detailed metrics.'
    },
    {
        icon: secureAccountIcon,
        title: 'Secure Account Management',
        description: 'Manage your account securely with our top-notch security features.'
    }
];

const FeatureCardSection = () => {
    return (
        <div className="feature-card-section">
            <div className="feature-card-wrapper">
                {features.map((feature, index) => (
                    <div key={index} className="feature-card">
                        <img src={feature.icon} alt={feature.title} className="feature-icon" />
                        <h3 className="feature-title">{feature.title}</h3>
                        <p className="feature-description">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeatureCardSection;
