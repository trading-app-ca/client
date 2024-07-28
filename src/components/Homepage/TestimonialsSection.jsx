import React from "react";

const testimonials = [
    {
        quote: "Crypto Trader has helped me understand trading better without losing money.",
        user: "User A",
        rating: 4
    },
    {
        quote: "The best way to practice cryptocurrency trading!",
        user: "User B",
        rating: 5
    }
];

function TestimonialsSection() {
    return (
        <div className="testimonials-section">
            <div className="testimonials-content">
                <h2>Testimonials</h2>
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="testimonial">
                        <p className="quote">"{testimonial.quote}" - <span className="user">{testimonial.user}</span></p>
                        <p className="rating">Average Rating: 
                            {'★'.repeat(testimonial.rating)}
                            {'☆'.repeat(5 - testimonial.rating)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TestimonialsSection;
