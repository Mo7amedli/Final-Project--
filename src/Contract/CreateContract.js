import React, { useState } from 'react';
import './ContractForm.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../Api/Api';
import Cookie from 'cookie-universal'
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../components/Loader';
const CreateContract = () => {
  const [Price, setPrice] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [TremsAndCondetions, setTremsAndCondetions] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const cookies = Cookie();
  const token = cookies.get('freelanceCookie');

  const { FreelancerId, JopPostId } = useParams();

  const createContract = async() =>{
    const StartDate= new Date(startDate).toISOString();
    const EndDate = new Date(endDate).toISOString();
    setLoading(true)
    try{
      const response = await axios.post(`${baseUrl}/api/Contract/Create-New-Contract`, {
        TremsAndCondetions, Price, StartDate, EndDate, JopPostId, FreelancerId
      }  ,{
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      })
      setLoading(false)
      navigate(`/all-contracts`)
    }catch(error){
      setLoading(false)
      console.log(error);
    }
  }

  return (
    <div className='contract'>
      <div style={{marginLeft:'-200px'}}>
        {loading && <Loader />}
      </div>
      <div className="form-container">
        <h2>Create Contract</h2>
          <div className="form-group">
            <label>Price:</label>
            <input className="form-input"
              type="number"
              name="price"
              value={Price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="form-group date-group">
            <div className="date-input">
              <label>Start Date:</label>
              <input className="form-input"
                type="date"
                name="StartDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group date-group"> 
            <div className="date-input">
              <label>End Date:</label>
              <input className="form-input"
                type="date"
                name="EndDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Terms and Conditions:</label>
            <textarea style={{minHeight:'50px'}}
              name="tremsAndCondetions"
              value={TremsAndCondetions}
              onChange={(e) => setTremsAndCondetions(e.target.value)}
            />
          </div>
          <button type="button" className="sb-btn" onClick={createContract}>Crete</button>
      </div>
      <ToastContainer position="top-center"/>
    </div>
  );
};

export default CreateContract;