import React from "react";

function AboutSection() {
    return (
        <div className="about-section">
            <div className="about-content">
                <h2>About Crypto Trader</h2>
                <section>
                    <h3>Our Mission</h3>
                    <p>To provide a safe, educational platform for aspiring traders to learn and practice cryptocurrency trading without financial risk.</p>
                </section>
                <section>
                    <h3>Our Team</h3>
                    <p>A dedicated group of cryptocurrency enthusiasts and professionals.</p>
                    <ul>
                        <li><strong>Sam:</strong> Full Stack Developer passionate about trading and back-end development and database management.</li>
                        <li><strong>Lucy:</strong> Full Stack Developer with expertise in front-end development.</li>
                    </ul>
                </section>
                <section>
                    <h3>The Problem</h3>
                    <p>Cryptocurrency trading is complex and intimidating for beginners, with high risks of financial loss due to market volatility and inexperience.</p>
                </section>
                <section>
                    <h3>Our Solution</h3>
                    <p>Crypto Trader offers a simulated trading environment with realistic features and portfolio management tools. Users can learn to analyse market trends, make informed trading decisions, and manage investments effectively, all without risking real money.</p>
                </section>
            </div>
        </div>
    );
}

export default AboutSection;
