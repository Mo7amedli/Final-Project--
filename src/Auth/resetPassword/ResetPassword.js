import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { baseUrl } from '../../Api/Api';
function ResetPassword() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token').replace(/\s/g, '+');
  const email = decodeURIComponent(params.get('email'));
  
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };


    const handleSubmit = async (e) => {
      e.preventDefault()
      try{
        const response = await axios.post(`${baseUrl}/resetPassword`, {password, confirmPassword, token, email})
        console.log(response )
        console.log(token)
        console.log(email)
        console.log(password)
        console.log(confirmPassword)
        toast.success('The reset password has been successfully')
        navigate('/signin')
      }catch(err){
        console.log(err.response.data)
      }

    }
  
  return (
    <div className='box-size'>
      <div className='d-flex justify-content-center'>
          <div className='reset-pass row py-5 my-5'>
              <h4>Reset Your Password</h4>
              <form onSubmit={handleSubmit}>
                  
                  <input className='form-control col-9 my-2' type="password" placeholder="New Password" value={password} onChange={handlePasswordChange} required />
                  <input className='form-control col-9 my-2' type="password" placeholder="Confirm Password" 
                      value={confirmPassword} onChange={handleConfirmPasswordChange} required/>
                  <button className='btn btn-primary' type="submit">Reset Password</button>
              </form>
          </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default ResetPassword