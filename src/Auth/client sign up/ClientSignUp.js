import React, { useEffect, useState } from 'react'
import './ClientSignUp.css'
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from 'react-router';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { baseUrl } from '../../Api/Api';

function ClientSignUp() {
    const navigate = useNavigate();
    function handleSingIn(){
        navigate("/signin")
    }

    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [Country, setCountry] = useState();
    const [data, setData] = useState([])
    const [getState, setState] = useState([])
    const [errors, setErrors] = useState({});


    const validateForm = () => {
        const newErrors = {};
        if (!FirstName) {
            newErrors.FirstName = 'First Name is required';
        }
        
        if (!LastName) {
            newErrors.LastName = 'Last Name is required';
        }
        
        if (!Email) {
        newErrors.Email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(Email)) {
        newErrors.Email = 'Email is invalid';
        }
        
        if (!Password) {
        newErrors.Password = 'Password is required';
        } else if (Password.length < 8) {
        newErrors.Password = 'Password should be at least 8 characters long';
        }
        
        if (!ConfirmPassword) {
        newErrors.ConfirmPassword = 'Confirm Password is required';
        } else if (ConfirmPassword !== Password) {
        newErrors.ConfirmPassword = 'Passwords do not match';
        }

        if (!Country) {
            newErrors.country = 'Country is required';
        }
        
        return newErrors;
    };

    useEffect(()=>{
        axios.get('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json').then(res=>setData(res.data)).catch(err=>console.log(err))
    },[])
    const country = [...new Set(data.map(item=> item.country))];
    country.sort();

    const handleCountry = (e) =>{
        setCountry(e.target.value);
      let states = data.filter(state => state.country === e.target.value); 
      states = [...new Set(states.map(item=>item.subcountry))]
      states.sort();
      setState(states);
    }
    const model = {
        FirstName,
        LastName,
        Email,
        Password,
        ConfirmPassword,
        Country
      };
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const newErrors = validateForm();
        setErrors(newErrors);
        try{
            const response = await axios.post(`${baseUrl}/Register-User`, model, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            console.log(response )
            navigate('/reconfirm-email')
            toast.success('Check your Email to confirm the Email');
        }
        catch(err){
            console.log(err)
        }
    }

    
  return (
    <div className='box'>
        <div className="sec" id="sec">
            <div className="sign-up">
                <form onSubmit={handleSubmit}>
                    <h1>Create Account</h1>
                    <div className="social-icons">
                    <a href="#" className="icon"><FaGoogle /></a>
                    </div>
                    <span>or use your Email for registeration</span>
                    <input type="text" placeholder="FirstName" name='FirstName' value={FirstName} onChange={(e) => setFirstName(e.target.value)}/>
                    {errors.FirstName && <span className='erorr'>{errors.FirstName}</span>}
                    <input type="text" placeholder="LastName" name='LastName' value={LastName} onChange={(e) => setLastName(e.target.value)}/>
                    {errors.LastName && <span className='erorr'>{errors.LastName}</span>}
                    <input type="Email" placeholder="Email" name='Email' value={Email} onChange={(e) => setEmail(e.target.value)}/>
                    {errors.Email && <span className='erorr'>{errors.Email}</span>}
                    <input type="Password" placeholder="Password" name='Password' value={Password} onChange={(e) => setPassword(e.target.value)}/>
                    {errors.Password && <span className='erorr'>{errors.Password}</span>}
                    <input type="Password" placeholder="Confirm Password" name='ConfirmPassword' value={ConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    {errors.ConfirmPassword && <span className='erorr'>{errors.ConfirmPassword}</span>}
                    <select className='form-select my-1' value={Country} onChange={(e)=>handleCountry(e)}>
                            <option value=''>select country</option>
                            {country.map(item=> <option key={item} >{item}</option>)}
                        </select>
                        {errors.country && <span className='error'>{errors.country}</span>}
                    <button type='submit'>Sign Up</button>
                </form>
            </div>
            <div className="toggle-sec">
                <div className="toggle">
                    <div className="toggle-panel">
                        <h1>Welcome Back!</h1>
                        <p>Enter your personal details to use all of site features</p>
                        <button type='button' onClick={handleSingIn} id="login">Sign In</button>
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer />
    </div>
  )
}
export default ClientSignUp;