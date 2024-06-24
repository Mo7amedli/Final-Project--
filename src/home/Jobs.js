import React from 'react';
import Slider from 'react-slick';
import { FaCode, FaMobileAlt, FaPaintBrush } from 'react-icons/fa';
import './Home.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const jobPosts = [
  { id: 1, category: 'Web Development', title: 'Build a React Website', price: 500, description: 'Need a fully functional React website with REST API integration.', icon: <FaCode size={24} /> },
  { id: 2, category: 'Mobile App', title: 'Create a Flutter App', price: 700, description: 'Looking for an experienced developer to build a Flutter app for both iOS and Android.', icon: <FaMobileAlt size={24} /> },
  { id: 3, category: 'Graphic Design', title: 'Design a Logo', price: 100, description: 'Need a professional logo design for a new startup.', icon: <FaPaintBrush size={24} /> },
  { id: 4, category: 'Web Development', title: 'Create a Landing Page', price: 300, description: 'Landing page needed for a marketing campaign.', icon: <FaCode size={24} /> },
  { id: 5, category: 'Mobile App', title: 'Fix Bugs in Android App', price: 200, description: 'Need bug fixes and optimizations in an existing Android app.', icon: <FaMobileAlt size={24} /> },
  { id: 6, category: 'Graphic Design', title: 'Create a Brochure', price: 150, description: 'Design a brochure for our new product line.', icon: <FaPaintBrush size={24} /> },
  // Add more job posts as needed
];

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="custom-arrow custom-next-arrow" onClick={onClick}>
      &gt;
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="custom-arrow custom-prev-arrow" onClick={onClick}>
      &lt;
    </div>
  );
};

const JobPosts = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="job-posts">
      <h2>Jobs</h2>
      <Slider {...settings}>
        {jobPosts.map((job) => (
          <div key={job.id} className="jobs-card">
            <div className="job-info">
              <h3>{job.category}</h3>
              <p><strong>Title:</strong> {job.title}</p>
              <p><strong>Price:</strong> ${job.price}</p>
              <p>{job.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default JobPosts;
