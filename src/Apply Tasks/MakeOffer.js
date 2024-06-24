import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { baseUrl } from '../Api/Api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MakeOffer = ({ isOpen, closeModal, jobId, jobTitle, token, fetchJobs }) => {

  const [price, setPrice] = useState();
  const [offerDescription, setOfferDescription] = useState('');
  const navigate = useNavigate();
  const resetForm = () => {
    setPrice('');
    setOfferDescription('');
  };

  const applyOnTheTask = async () => {
    try{
      const response = await axios.post(`${baseUrl}/api/ApplyTasks/Freelancer-Apply-For-Task`,
        { jobId, price, offerDescription },
        {
            headers: {
            Authorization: `Bearer ${token}`
            }
        })
        navigate('/appliedTasks')
        toast.success(`The applying on ${jobTitle} has been successfully.`);
        fetchJobs();
        closeModal();
        resetForm();
      } catch(error){
        console.log(error.response)
        }
  };

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
        <div className="modal-dialog">
        <div className="modal-content" style={{marginLeft:'80px', marginTop:'100px'}}>
            <div className="modal-header">
              <h5 className="modal-title">Make Offer</h5>
              <button type="button" className="btn-close" onClick={() => {
              closeModal();
              resetForm(); 
            }}></button>
            </div>
            <div className="modal-body">
                <div>
                    <label htmlFor="offerAmount" className='form-label'>Offer Amount:</label>
                    <input
                    className='form-control'
                    type="number"
                    id="offerAmount"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="offerMessage" className='form-label'>Offer Message:</label>
                    <textarea style={{minHeight:'100px'}}
                    className='form-control'
                    id="offerMessage"
                    value={offerDescription}
                    onChange={(e) => setOfferDescription(e.target.value)}
                    required
                    />
                </div>
            </div>
            <div className="modal-footer">
              <button type="button" className='btn btn-secondary' onClick={() => {
              closeModal();
              resetForm();
              }}>Close</button>
              <button type="button" className='btn btn-primary' onClick={applyOnTheTask} >Save</button>
            </div>
        </div>
        </div>
        <ToastContainer position="top-center"/>
    </div>
  );
};

export default MakeOffer;