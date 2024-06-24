import React from 'react';
import Slider from 'react-slick';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import './Home.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const freelancers = [
  { id: 1, name: 'John Doe', title: 'Frontend Developer', description: 'Experienced in React and Angular.', hourlyRate: 40, rating: 4, profilePic: 'https://via.placeholder.com/100', isFavorite: false },
  { id: 2, name: 'Jane Smith', title: 'Backend Developer', description: 'Specializes in Node.js and Python.', hourlyRate: 50, rating: 5, profilePic: 'https://via.placeholder.com/100', isFavorite: true },
  { id: 3, name: 'Sam Johnson', title: 'Full Stack Developer', description: 'Proficient in MERN stack.', hourlyRate: 45, rating: 3, profilePic: 'https://via.placeholder.com/100', isFavorite: false },
  // Add more freelancers as needed
];

const Freelancers = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (oldIndex, newIndex) => handleBeforeChange(oldIndex, newIndex),
    afterChange: (currentIndex) => handleAfterChange(currentIndex),
  };

  const handleBeforeChange = (oldIndex, newIndex) => {
    console.log(`Before slide change from ${oldIndex} to ${newIndex}`);
  };

  const handleAfterChange = (currentIndex) => {
    console.log(`After slide change to slide ${currentIndex}`);
  };

  const toggleFavorite = (id) => {
    const updatedFreelancers = freelancers.map((freelancer) =>
      freelancer.id === id ? { ...freelancer, isFavorite: !freelancer.isFavorite } : freelancer
    );
    // In a real app, you would update the state or make an API call
    console.log(updatedFreelancers);
  };

  return (
    <div className="freelancers">
      <h2>Freelancers</h2>
      <Slider {...settings}>
        {freelancers.map((freelancer) => (
          <div key={freelancer.id} className="freelancer-card">
            <div className="freelancer-profile-section">
              <img src={freelancer.profilePic} alt={freelancer.name} className="freelancer-profile-pic" />
              <p className="freelancer-profile-text">Profile</p>
            </div>
            <div className="freelancer-info">
              <h3>{freelancer.name}</h3>
              <p><strong>Position:</strong> {freelancer.title}</p>
              <p><strong>Hourly rate:</strong> ${freelancer.hourlyRate}</p>
              <div className="freelancer-rating">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    color={index < freelancer.rating ? "#ffc107" : "#e4e5e9"}
                  />
                ))}
              </div>
              <div className="freelancer-actions">
                <button className="show-more-btn">Show More</button>
                <button onClick={() => toggleFavorite(freelancer.id)} className="freelancer-fav-btn">
                  {freelancer.isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const NextArrow = ({ onClick }) => (
  <div className="custom-arrow custom-next-arrow" onClick={onClick}>
    &gt;
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="custom-arrow custom-prev-arrow" onClick={onClick}>
    &lt;
  </div>
);

export default Freelancers;
