import React, { useEffect, useState } from 'react';
import './ContractForm.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { baseUrl } from '../Api/Api';
import axios from 'axios';
import Cookie from 'cookie-universal'
import { ToastContainer, toast } from 'react-toastify';
const ContractDetails = () => {

  //const {id} = useParams();
  const location = useLocation();
  const params = useParams();
  const id = params.id;

  const Id = id.split('=')[1];
console.log(Id);
  
  const navigate = useNavigate();
  const [contract, setContract] = useState({});

  const cookies = Cookie();
  const token = cookies.get('freelanceCookie')

  //fetch jobs
  useEffect(() => {
    fetcContract();
  }, []);
  
  const fetcContract = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/Contract/findByJobPostId?id=${Id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data)
      setContract(response.data);
      } catch (error) {
        const errorPages = error.response.status;
        if (errorPages === 403) {
          navigate('/error403');
        } else if (errorPages === 401) {
          navigate('/error401');
        } else if (errorPages === 500) {
          navigate('/error500');
        }
        else{
          console.log(error.response);
        }
      }
    };

  const [email, setEmail] = useState('');
  const confirmTheContract = async()=>{
    try{
      await axios.post(`${baseUrl}/api/Contract/SubmitContract`,{ email },{
        headers: {
           Authorization: `Bearer ${token}`,
           "Content-Type": "multipart/form-data"
        }
      })
      navigate('/account-freelancer')
      toast.success('success. Check your Favorite Box.');
    } catch(error){
      console.log(error.response)
      }
   };
  return (
    <div className='contract'>
      <div className="contract-details">
        <h2>Contract Details</h2>
        <div className="detail">
          <label>Price: </label>
          <span>{contract.price}</span>
        </div>
        <div className="detail">
          <label>Project Details: </label>
          <span>{contract.projectDetails}</span>
        </div>
        <div className="detail">
          <label>Start Date: </label>
          <span>{contract.startDate}</span>
        </div>
        <div className="detail">
          <label>End Date: </label>
          <span>{contract.endDate}</span>
        </div>
        <div className="detail">
          <label>Terms and Conditions: </label>
          <span>{contract.tremsAndCondetions}</span>
        </div>
        
        <div className="form-groups">
          <label>Signature: </label>
          <input
            type="email"
            name="signature"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            placeholder="Enter signature"
            required
          />
          <button className='confirm' onClick={confirmTheContract}>Confirm</button>
        </div>
      </div>
      <ToastContainer position="top-center"/>
    </div>
  );
};

export default ContractDetails;
