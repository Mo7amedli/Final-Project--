import React, { useEffect, useState } from 'react'
import Heart from 'react-heart'
import './Favorites.css'
import axios from 'axios'
import { baseUrl } from '../Api/Api'
import Cookie from 'cookie-universal'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import MakeOffer from '../Apply Tasks/MakeOffer'
import moment from 'moment'
function MyFavJobs() {

  const navigate = useNavigate();

  const [myFavJobs, setMyFavJobs] = useState([]);
  const cookies = Cookie();
  const token = cookies.get('freelanceCookie')

  useEffect(() => {
    fetchFavJobs();
  }, []);
  const fetchFavJobs = async()=>{
    try{
      const response = await axios.get(`${baseUrl}/api/FavJobPost/Get-My-Fav-JobPosts`,{
        headers: {
           Authorization: `Bearer ${token}`
        }
      })
      console.log(response.data);
      setMyFavJobs(response.data)
    }catch(error){
      const errorPages = error.response.status;
      if (errorPages === 403) {
        navigate('/error403');
      } else if (errorPages === 401) {
        navigate('/error401');
      } else if (errorPages === 500) {
        navigate('/error500');
      }else{
        console.log(error.response);
      }
    }
  }

  //delete fav
  const deleteFav= async(jobId)=>{
    try{
      const response = await axios.post(`${baseUrl}/api/FavJobPost/New-And-Delete-JobPost-Fav?jobId=${jobId}`,{ jobId },{
        headers: {
           Authorization: `Bearer ${token}`
        }
      })
      fetchFavJobs();
      toast.success('The deleting has been successfully.');
    } catch(error){
      console.log(error.response)
      }
   };

   //open modal for apply task
   const [jobPostId, setJobPostId] = useState();
   const [jobPostTitle, setJobPostTile] = useState('');

   const [modalInfoOpen, setModalInfoOpen] = useState(false);
      
   const openInfoModal = (jobId, jobTitle) => {
    setModalInfoOpen(true);
    setJobPostId(jobId);
    setJobPostTile(jobTitle)
  };
   
  const closeInfoModal = () => {
    setModalInfoOpen(false);
  };

   //delete applied task
  const deleteAppliedTask = async (taskId, title) => {
    try {
      const response = await axios.put(`${baseUrl}/api/ApplyTasks/Freelancer-Delete-Task?taskId=${taskId}`, { taskId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchFavJobs();
      toast.success(`The deleting ${title} has been successfully.`);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div style={{minHeight:'88vh'}}>
      <div className="job-posts-container">
        <h2 className='mt-3'>All Job Posts</h2>
        {myFavJobs.length>0 ? (
          <div>{myFavJobs.map(job => (
            <div key={job.jobPostId} className="job-post-container">
              <h3 className="job-post-s-title">{job.categoryName}</h3>
              <p className="job-post-detail">
                <span className="job-post-label">Title:</span> {job.jobPostTiilte}
              </p>
              <p className="job-post-detail">
                <span className="job-post-label">Description:</span> {job.description}
              </p>
              <p className="job-post-detail">
                <span className="job-post-label">Price:</span> {job.price}
              </p>
              <p className="job-post-detail">
                <span className="job-post-label">Duration:</span> {moment(job.durationTime).format('DD-MM-YYYY')}
              </p>
              <p className="job-post-detail">
                <span className="job-post-label">User Name:</span> {job.userName}
              </p>
              
              <div className="job-post-s-buttons">
              {job.isApplied === false ? (
                  <button className="hire-s-button" onClick={() => openInfoModal(job.jobPostId, job.title)}>Hire</button>
                ) : (
                  <button className='hired-s-button' onClick={() => deleteAppliedTask(job.taskId, job.title)}>Hired</button>
                )}
                <button className='fav-s-button' > 
                  <Heart isActive={job.isFav} onClick={()=>deleteFav(job.jobPostId)} style={{ width: "30px" }}/> 
                </button>
              </div>
            </div>
          ))}
          </div>
        ) : (
          <div className='no-jobs'>
              <h1 >There Are No Favorite Jobs Yet, Add To Favorites First.</h1>
          </div>
        )}
        
      </div>
      <MakeOffer isOpen={modalInfoOpen} closeModal={closeInfoModal} jobId={jobPostId} jobTitle={jobPostTitle} token={token} fetchJobs={fetchFavJobs}/>
      <ToastContainer position="top-center"/>
  </div>
  )
}

export default MyFavJobs