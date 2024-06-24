import React, { useEffect, useState } from 'react';
import './JobPost.css'; // Import CSS file
import axios from 'axios';
import { baseUrl } from '.././Api/Api';
import Cookie from 'cookie-universal'
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import moment from 'moment';
const JobPostPage = () => {
  const [myJobs, setMyJobs] = useState([]);

  const cookies = Cookie();
  const token = cookies.get('freelanceCookie')

  //fetch my jobs
  useEffect(() => {
    fetcMyJobs();
  }, []);
  
  const fetcMyJobs = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/JobPosts/Get-All-My-Project-Post`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data)
      setMyJobs(response.data.sort((a, b) => b.id - a.id));
      } catch (error) {
        console.error(error);
      }
    };
    
    // Handle delete job
  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job post?')) {
      try {
        await axios.put(`${baseUrl}/api/JobPosts/Cliend delete job?jobId=${jobId}`, {jobId}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        toast(`Deleted job has been successful`)
        fetcMyJobs();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div style={{minHeight:'86vh'}}>
      <div>
      <h3 className='my-jobs-Title '>My Jobs</h3>
      {myJobs ? (<div>
        {myJobs.map((job)=><div key={job.id}>
        <div >
          <div  className="job-post-container">
            <h3 className="job-post-s-title">{job.categoryName}</h3>
            <p className="job-post-detail"><span className="job-post-label">Title: </span> {job.title}</p>
            <p className="job-post-detail"><span className="job-post-label">Description: </span>  {job.description}</p>
            <p className="job-post-detail"><span className="job-post-label">Price: </span> ${job.price}</p>
            <p className="job-post-detail"><span className="job-post-label">Duration: </span> {moment(job.durationTime).format('DD-MM-YYYY')}</p>
            <div className="job-post-s-buttons btn-group">
              <Link className="btn btn-success" to={`editjob/${job.id}`} >Update</Link>
              <button className="btn btn-danger" onClick={() => handleDeleteJob(job.id)}>
                Delete
              </button>
            </div>
            <Link className='btn-applicant btn btn-primary' to={`applicants/${job.id}`}>Applicant</Link>
          </div>
        </div>
      </div>)}
      </div>) : (
      <div style={{maxWidth:'500px', minHeight:'78vh'}} >
        <h1 className='text-danger font-weight-bold my-5'>There Are No Jobs With This Name</h1>
      </div>
      )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default JobPostPage;
