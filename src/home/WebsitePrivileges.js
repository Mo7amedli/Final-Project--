import React from 'react';
import './Home.css';

const WebsitePrivileges = () => {
  return (
    <div className="privileges-section">
      <h2>Why Choose Us?</h2>
      <div className="privileges-container">
        <div className="privilege-card">
          <div className="privilege-icon">&#128187;</div> 
          <h3>Expert Freelancers</h3>
          <p>We provide a platform for top-tier freelancers from around the globe, ensuring the highest quality of work for your projects.</p>
        </div>
        <div className="privilege-card">
          <div className="privilege-icon">&#128176;</div>
          <h3>Affordable Pricing</h3>
          <p>Get the best value for your money with competitive pricing and flexible payment options.</p>
        </div>
        <div className="privilege-card">
          <div className="privilege-icon">&#128202;</div> 
          <h3>Scalable Solutions</h3>
          <p>Our platform offers scalable solutions to meet the needs of both small businesses and large enterprises.</p>
        </div>
        <div className="privilege-card">
          <div className="privilege-icon">&#128295;</div>
          <h3>24/7 Support</h3>
          <p>Our dedicated support team is available around the clock to assist you with any issues or questions.</p>
        </div>
        <div className="privilege-card">
          <div className="privilege-icon">&#128218;</div> 
          <h3>Resource Library</h3>
          <p>Access a comprehensive library of resources and tutorials to help you get the most out of our platform.</p>
        </div>
        <div className="privilege-card">
          <div className="privilege-icon">&#128272;</div> 
          <h3>Secure Transactions</h3>
          <p>Experience peace of mind with our secure transaction system that protects your payments and data.</p>
        </div>
      </div>
      <button className="join-us-btn">Join Us</button>
    </div>
  );
};

export default WebsitePrivileges;
