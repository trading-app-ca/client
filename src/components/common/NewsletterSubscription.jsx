import React, { useState } from 'react';

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setMessage('Thank you for subscribing!');
      setEmail('');
    } else {
      setMessage('Please enter a valid email address.');
    }
  };

  return (
    <div className="newsletter">
      <h3>Subscribe to our newsletter</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Subscribe</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default NewsletterSubscription;
