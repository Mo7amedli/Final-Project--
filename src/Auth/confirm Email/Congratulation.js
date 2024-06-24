import React from 'react';
import './Congratulation.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { baseUrl } from '../../Api/Api';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import logo from '..//image/logo.png'

function Congratulation() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token').replace(/\s/g, '+');
  const encodedToken = encodeURIComponent(token);
  const email = decodeURIComponent(params.get('email'));
  
  const handleConfirm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/Confirm-Email?token=${encodedToken}&email=${email}`);
      navigate('/signin')
      toast.success("Congratulation you joined us")
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className='box-size'>
        <div className='forget d-flex justify-content-center'>
          <div className="cont py-5">
            <form onSubmit={handleConfirm}>
                <div >
                    <h1><img src={logo} alt='logo'/>Task Sync</h1>
                    <p> Click on the confirm button to cnfirm the email.</p>
                </div>
                <div className='confirm'>
                    <button className='btn btn-primary' type='submit'>Confirm</button>
                </div>
            </form>
          </div>
        </div>
        <ToastContainer />
    </div>
  )
}
export default Congratulation;