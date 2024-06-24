import React, { useEffect, useState } from 'react';
import './JobPost.css'; // Import CSS file
import axios from 'axios';
import { baseUrl } from '../Api/Api';
import Cookie from 'cookie-universal'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const JobPostForm = () => {

  const navigate = useNavigate();

  //get categories
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/Category/Get-All-Categories-With-Id`);
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [title, setTitle] = useState('')
  const [description, setDEscription] = useState('')
  const [price, setPrice] = useState()
  const [categoryId, setCategoryId] = useState()
  const [durationTime, setDurationTime] = useState('')

  const cookies = Cookie();
  const token = cookies.get('freelanceCookie')
  
  const handleSubmit = async (e) => {
    try {
      const res = await axios.post(`${baseUrl}/api/JobPosts/Cliend  PostJob`, { 
        title, 
        description,
        price,
        categoryId,
        durationTime
      }, {
        headers: { Authorization : `Bearer ${token}` }
      });
      toast('success')
      console.log(res)
      navigate('/myjobs')
    }catch (error) {
      console.log(error.response.data); 
    }  
  };

  return (
    <div style={{minHeight:'90vh'}}>
      <div className='create-job'>
        <div className="form-create-job mt-3">
          <h3 className='create-job-title'>Creating Job</h3>
          <form >
            <label htmlFor="title" className="form-label">Title:</label>
            <input type="text" id="title" name="title" value={title} onChange={(e)=>setTitle(e.target.value)} className="form-input" required />

            <label htmlFor="description" className="form-label">Description:</label>
            <textarea id="description" name="description" value={description} onChange={(e)=>setDEscription(e.target.value)} className="form-textarea" required />

            <label htmlFor="price" className="form-label">Price:</label>
            <input type="number" id="price" name="price" value={price} onChange={(e)=>setPrice(e.target.value)} className="form-input" required />

            <label htmlFor="categoryId" className="form-label">Category:</label>
            <select className="form-input" id='categoryId' value={categoryId} onChange={(e)=>setCategoryId(e.target.value)}>
              <option value=''>select</option>
              {categories.map((item)=>(<option key={item.id} value={item.id}>{item.name}</option>))}
            </select> 
            <label htmlFor="durationDate" className="form-label">Duration Date:</label>
            <input className='form-input' id='durationDate' type="date" value={durationTime} onChange={(e)=>setDurationTime(e.target.value)} />
            
            <button className='form-submit' onClick={handleSubmit} type='button'>CREATE</button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default JobPostForm;
