import React, { useState } from 'react'
import Heart from 'react-heart'
function JobDetails() {
    const [active, setActive] = useState(true)
  const handleFavoriteClick =()=>{
      setActive(!active)
    }
  return (
    <div className='myfavjob'>
        <div className="job-favs-container">
            <h2 className='mt-2'>My Favourite Jobs</h2>
            <div className="job-fav-container">
              <h3 className="job-fav-s-title">categoryName</h3>
              <p className="job-fav-detail">
                <span className="job-fav-label">Title:</span> title
              </p>
              <p className="job-fav-detail">
                <span className="job-fav-label">Description:</span> description
              </p>
              <p className="job-fav-detail">
                <span className="job-fav-label">Price:</span> price
              </p>
              <p className="job-fav-detail">
                <span className="job-fav-label">Duration:</span> durationTime
              </p>
              <p className="job-fav-detail">
                <span className="job-fav-label">User Name:</span> userFullName
              </p>
              
              <div className="job-fav-s-buttons">
                <button className="hire-s-button">Hire</button>
                <button className='fav-s-button' > 
                  <Heart isActive={active} onClick={handleFavoriteClick} /> 
                </button>
              </div>
            </div>
            <div className="job-fav-container">
              <h3 className="job-fav-s-title">categoryName</h3>
              <p className="job-fav-detail">
                <span className="job-fav-label">Title:</span> title
              </p>
              <p className="job-fav-detail">
                <span className="job-fav-label">Description:</span> description
              </p>
              <p className="job-fav-detail">
                <span className="job-fav-label">Price:</span> price
              </p>
              <p className="job-fav-detail">
                <span className="job-fav-label">Duration:</span> durationTime
              </p>
              <p className="job-fav-detail">
                <span className="job-fav-label">User Name:</span> userFullName
              </p>
              
              <div className="job-fav-s-buttons">
                <button className="hire-s-button">Hire</button>
                <button className='fav-s-button' > 
                  <Heart isActive={active} onClick={handleFavoriteClick} /> 
                </button>
              </div>
            </div>
            <div className="job-fav-container">
              <h3 className="job-fav-s-title">categoryName</h3>
              <p className="job-fav-detail">
                <span className="job-fav-label">Title:</span> title
              </p>
              <p className="job-fav-detail">
                <span className="job-fav-label">Description:</span> description
              </p>
              <p className="job-fav-detail">
                <span className="job-fav-label">Price:</span> price
              </p>
              <p className="job-fav-detail">
                <span className="job-fav-label">Duration:</span> durationTime
              </p>
              <p className="job-fav-detail">
                <span className="job-fav-label">User Name:</span> userFullName
              </p>
              
              <div className="job-fav-s-buttons">
                <button className="hire-s-button">Hire</button>
                <button className='fav-s-button' > 
                  <Heart isActive={active} onClick={handleFavoriteClick} /> 
                </button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default JobDetails