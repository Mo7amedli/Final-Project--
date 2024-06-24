import React, { useState } from 'react'
import { FaGoogle } from "react-icons/fa";
import './SignIn.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookie from 'cookie-universal'
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from '../../Api/Api';
import Loader from '../../components/Loader';

function SignIn() {
    const navigate = useNavigate();
    function navigateSign(){
        navigate('/clientOrfreelance')
    }
    function navigateToForgetPass(){
        navigate('/forgetPassword')
    }
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const cookies = Cookie();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        setError(''); // Reset the error state
    
        try {
          const res = await axios.post(`${baseUrl}/Login`, { email, password });
          const token = res.data.token;
          const role = res.data.role;
          cookies.set('freelanceCookie', token);
          cookies.set('role', role);
          if(role === 'Freelancer'){
            window.location.pathname='/findwork';
          }else if(role === 'User'){
            window.location.pathname='/myjobs'; 
          }else{
            window.location.pathname='/categories'; 
          }
          
          setLoading(false)
          
        } catch (error) {
            setLoading(false)
          if(error.response.status){
            setError(error.response.data); 
          }
        }
      };
    
  return (
    <div className='box'>
        {loading && <Loader />}
        <div className="section">        
            <div className="form-section sign-in">
                <form onSubmit={handleSubmit}>
                    <h1>Sign In</h1>
                    <div className="social-icons">
                        <a href="#" className="icon"><FaGoogle /></a>
                    </div>
                    <span>or use your email password</span>
                    <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} required />
                    <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required />
                    <button className='forgetPass' onClick={navigateToForgetPass}>Forget Your Password?</button>
                    <button>Sign In</button>
                    <p className='error'>{error}</p>
                    <ToastContainer />
                </form>
            </div>
            <div className="toggle-section">
                <div className="toggle">
                    <div className="toggle-panel">
                        <h1>Hello, Friend!</h1>
                        <p>Register with your personal details to use all of site features</p>
                        <button className="button" onClick={navigateSign} id="register">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
export default SignIn ;