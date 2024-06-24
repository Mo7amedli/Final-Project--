import React, { useEffect, useState } from 'react';
import './JobPost.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '.././Api/Api';
import Cookie from 'cookie-universal'
import { ToastContainer, toast } from 'react-toastify';
const EditJobPost = () => {
  const navigate = useNavigate();
  let {id} = useParams();

  const cookies = Cookie();
  const token = cookies.get('freelanceCookie')

  //show data in edit
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [durationTime, setDurationTime] = useState('');
  const [price, setPrice] = useState('');

  //fetch my jobs
  useEffect(() => {
    handleEdit();
  }, []);

  const handleEdit = async () => {
    try { 
      const response = await axios.get(`${baseUrl}/api/JobPosts/Get-job-post-by-Id?id=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      setTitle(response.data.title)
      setDescription(response.data.description)
      setPrice(response.data.price)
      /// Extract date and time from durationTime
      const durationDateIso = response.data.durationTime;
      const date = durationDateIso.substring(0, 10)
      setDurationTime(date);
    }catch (error) {
      console.log(error);
    }
  }

  // update job
  const handleUpdateJob = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${baseUrl}/api/JobPosts/update jobpost?id=${id}`,{
        title, description, price, durationTime
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast(`${title} has been updated`)
      navigate('/myjobs')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{minHeight:'90vh', paddingTop:'30px'}}>
      <div className="edit-job-post-container">
        <h2 className='edit-job-post-title'>Edit Job Post</h2>
        <form onSubmit={handleUpdateJob} className="edit-job-post-form">
          <div>
            <label htmlFor="title" className="edit-job-post-label">Title:</label>
            <input type="text" id="title"  value={title} onChange={(e)=>setTitle(e.target.value)} className="edit-job-post-input" required />
          </div>

          <div>
            <label htmlFor="description" className="edit-job-post-label">Description:</label>
            <textarea id="description" value={description} onChange={(e)=>setDescription(e.target.value)} className="edit-job-post-textarea" required />
          </div>

          <div>
            <label htmlFor="price" className="edit-job-post-label">Price:</label>
            <input type="number" id="price" value={price} onChange={(e)=>setPrice(e.target.value)} className="edit-job-post-input" required />
          </div>

          <div>
            <label htmlFor="durationDate" className="edit-job-post-label">Duration Date:</label>
            <input type="date" id="durationDate" value={durationTime} onChange={(e)=>setDurationTime(e.target.value)} className="edit-job-post-input" required />
          </div>

          <Link type='button' className='edit-job-post-cancel' to={'/myjobs'}>Cancel</Link>
          <button type="submit" className="edit-job-post-submit">Update Job Post</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditJobPost;
