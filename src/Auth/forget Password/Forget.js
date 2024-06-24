import React from 'react'
import logo from '..//image/logo.png'
import './Forget.css'
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../Api/Api';
function Forget() {
    const navigate = useNavigate();
    function haveNoAcc(){
        navigate('/clientOrfreelance')
    }
    const [email, setEmail] = useState('');
    
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
  };
    
    const handleSubmit = async(e) => {
        e.preventDefault();
    
        try {
            const res = await axios.post(`${baseUrl}/Forgot-Password?email=${email}`)
            toast.success("Check your email");
        } catch (error) {
          console.log(error);
          
        }
    };
  return (
    <div className='box-size'>
      <div className='forget d-flex justify-content-center'>
          <div className="cont py-4">
          <form onSubmit={handleSubmit}>
              <div>
                  <h1><img src={logo} alt='logo'/>Task Sync</h1>
                  <p> Enter the email address and we'll send you a link to reset your password</p>
              </div>
              <div className='row d-flex justify-content-center'>
              <input className='form-control ' type="email" placeholder="Email" value={email} onChange={handleEmailChange} required />
              </div>
              <div className='confirm'>
                <div>
                  <a className="goToAcc" onClick={haveNoAcc} >Don't have an account?</a>
                </div>
                <div>
                  <button className='btn btn-primary' type='submit'>Send</button>
                </div>
              </div>
              <ToastContainer />
          </form>
          </div>
      </div> 
    </div>
  )
}
export default Forget;