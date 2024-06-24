import React, { useEffect, useState } from 'react'
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from 'react-router';
import '../client sign up/ClientSignUp.css'
import Select from 'react-dropdown-select';
import axios from 'axios';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { ToastContainer, toast } from 'react-toastify';
import { baseUrl } from '../../Api/Api';
import cityData from '../../cityData.json'
function FreelanceSignUp() {

    const navigate = useNavigate();
    function handleSingIn(){
        navigate("/signin")
    }

    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [Age, setAge] = useState('');
    const [ZIP, setZIP] = useState('');
    const [YourTitle, setYourTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [Education, setEducation] = useState('');
    const [Experience, setExperience] = useState('');
    const [HourlyRate, setHourlyRate] = useState('');
    const [PortfolioURl, setPortfolioURl] = useState('');
    const [Country, setCountry] = useState();
    const [ProfilePicture, setProfilePicture] = useState(null);
    const [State, setSelectState] = useState();
    const [Address, setAddress] = useState();
    const [PhoneNumber, setPhoneNumber] = useState();

    const [SelectedLanguages, setSelectedLanguages] = useState([])
    const [SelectedSkills, setSelectedSkills] = useState([])

    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState({});

    const [data, setData] = useState(cityData)
    const [getState, setState] = useState([])
    const [cities, setCities] = useState([])

    
    const country = [...new Set(data.map(item=> item.country))];
    country.sort();

    const handleCountry = (e) =>{
        setCountry(e.target.value);
      let states = data.filter(state => state.country === e.target.value); 
      states = [...new Set(states.map(item=>item.subcountry))]
      states.sort();
      setState(states);
    }

    const handleState =(e)=>{
        setSelectState(e.target.value);
      let cities = data.filter(city => city.subcountry === e.target.value)
      setCities(cities)

    }

    const [languageOptions, setLanguageOptions] = useState();
    //fetch skills
    useEffect(() => {
        fetchLanguages();
        fetchSkills();
    }, []);
  
    const fetchLanguages = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/Language/Get-All-Language-With-Id`);
            console.log(response.data);
            setLanguageOptions(response.data)
        } catch (error) {
            console.error(error);
        }
    };

    const handleLanguageChange = (languageOptions) => {
        const selectedLanguageID = languageOptions.map((option) => option.id);
        setSelectedLanguages(selectedLanguageID);
    };


    const [skillOptions, setSkillOptions] = useState();
    //fetch skills
    const fetchSkills = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/Skill/Get-All-SKills-With-Id`);
      console.log(response.data);
      setSkillOptions(response.data)
      
    } catch (error) {
      console.error(error);
    }
  };
    
    const handleLSkillChange = (skillOptions) => {
      const selectedSkillID = skillOptions.map((option) => option.id);
      setSelectedSkills(selectedSkillID);
    };
    
    const handleImageChange = (event) => {
        setProfilePicture(event.target.files[0]);
    };

    const handleNext = () => {
        if (step === 1) {
            const validationErrors = validateFormStep1();
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }
            setErrors({});
        }else if (step === 2){
            const validationErrors = validateFormStep2();
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }
            setErrors({});
        }else if (step === 3){
            const validationErrors = validateFormStep3();
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }
            setErrors({});
        }
        setStep((prevStep) => prevStep + 1);
      };

      const handleBack = () => {
        setStep((prevStep) => prevStep - 1);
      };

      const validateFormStep1 =()=>{
        const errors = {};
        if (!FirstName) {
            errors.firstName = 'First Name is required';
        }
        if (!LastName) {
            errors.lastName = 'Last Name is required';
        }
        if (!Email) {
        errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(Email)) {
        errors.email = 'Email is invalid';
        }      
        if (!Password) {
        errors.password = 'Password is required';
        } else if (Password.length < 8) {
        errors.password = 'Password should be at least 8 characters long';
        } else if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$_.]).{8,}$/.test(Password)){
            errors.password = "Password mut be at least one capital character, small  character, number and special character.";
        }
        if (!ConfirmPassword) {
        errors.confirmPassword = 'Confirm Password is required';
        } else if (ConfirmPassword !== Password) {
        errors.confirmPassword = 'Passwords do not match';
        }
        return errors;
      }

      const validateFormStep2 =()=>{
        const errors = {};
        if (!Age) {
            errors.age = 'Age is required';
        }
        if (!Country) {
            errors.country = 'Country is required';
        }
        if (!State) {
            errors.state = 'State is required';
        }
        if (!Address) {
            errors.state = 'City is required';
        }
        if (!ZIP) {
            errors.zipCode = 'Zip code is required';
        }
        if (!PhoneNumber) {
            errors.PhoneNumber = 'PhoneNumber is required';
        }
        return errors;
      }

      const validateFormStep3 =()=>{
        const errors = {};
        if (!YourTitle) {
            errors.position = 'Position is required';
        }
        if (!Description) {
            errors.description = 'Description is required';
        }
        
        if (SelectedSkills.length === 0) {
            errors.SelectedSkills = 'SelectedSkills code is required';
        }
        if (SelectedLanguages.length === 0) {
            errors.SelectedLanguages = 'Language is required';
        }
        return errors;
      }

    const handleSubmit= async (e)=> {
        e.preventDefault();
        const formData = new FormData();
        formData.append('FirstName', FirstName);
        formData.append('LastName', LastName);
        formData.append('Email', Email);
        formData.append('Password', Password);
        formData.append('ConfirmPassword', ConfirmPassword);
        formData.append('Age', Age);
        formData.append('ZIP', ZIP);
        formData.append('YourTitle', YourTitle);
        formData.append('Description', Description);
        formData.append('Education', Education);
        formData.append('Experience', Experience);
        formData.append('HourlyRate', HourlyRate);
        formData.append('PortfolioURl', PortfolioURl);
        formData.append('Country', Country);
        formData.append('State', State);
        formData.append('Address', Address);
        formData.append('PhoneNumber', PhoneNumber);
        formData.append('file', ProfilePicture);
        SelectedSkills.forEach((skill, index) => {
            formData.append('SelectedSkills', skill); 
          });
        SelectedLanguages.forEach((skill, index) => {
            formData.append('SelectedLanguages', skill); 
          });
        
        try{
            const response = await axios.post(`${baseUrl}/Register-Freelance`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                  },
            })
            console.log(PhoneNumber)
            console.log(response)
            navigate('/reconfirm-email')
            toast.success('Check your Email to confirm the Email')
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
                <div>
                    <div className='progressbar'>
                        <div style={{width: step === 1 ? "25%" : step === 2 ? "50%" : step === 3 ? "75%" : "100%"}}></div>
                    </div>
                </div>
                {step === 1 && (
                    <div className='steps'>
                    <input type="text" name='firstName' value={FirstName} onChange={(e) => setFirstName(e.target.value)} placeholder="FirstName" />
                    {errors.firstName && <span className='error'>{errors.firstName}</span>}
                    <input type="text" name='lastName' value={LastName} onChange={(e) => setLastName(e.target.value)} placeholder="LastName"/>
                    {errors.lastName && <span className='error'>{errors.lastName}</span>}
                    <input type="email" name='email' value={Email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                    {errors.email && <span className='error'>{errors.email}</span>}
                    <input type="password" name='password' value={Password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    {errors.password && <span className='error'>{errors.password}</span>}
                    <input type="password" name='confirmPassword' value={ConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
                    {errors.confirmPassword && <span className='error'>{errors.confirmPassword}</span>}
                    <button type="button" onClick={handleNext}>Next</button>
               </div>
                )}

                {step === 2 && (
                    <div className='steps'>
                    <input type="number" name='age' value={Age} onChange={(e) => setAge(e.target.value)} placeholder="Age"/>
                    {errors.age && <span className='error'>{errors.age}</span>}
                    <select className='form-select my-1' value={Country} onChange={(e)=>handleCountry(e)}>
                        <option value=''>select country</option>
                        {country.map(item=> <option key={item} >{item}</option>)}
                    </select>
                    {errors.country && <span className='error'>{errors.country}</span>}
                    <select className='form-select my-1' value={State} onChange={(e)=>handleState(e)}>
                        <option value=''>select state</option>
                        {getState.map(item=> <option key={item} >{item}</option>)}
                    </select>                    
                    {errors.state && <span className='error'>{errors.state}</span>}
                    <select className='form-select my-1' value={Address} onChange={(e)=>setAddress(e.target.value)}>
                        <option value=''>select city</option>
                        {cities.map(item=> <option key={item.name} >{item.name}</option>)}
                    </select>
                    {errors.city && <span className='erorr'>{errors.city}</span>}
                    <input type="number" name='zipCode' value={ZIP} onChange={(e) => setZIP(e.target.value)} placeholder="Zip code"/>
                    {errors.zipCode && <span className='error'>{errors.zipCode}</span>}
                    <PhoneInput placeholder="Enter Phone number" value={PhoneNumber} onChange={setPhoneNumber}/>
                    {errors.PhoneNumber && <span className='error'>{errors.PhoneNumber}</span>}
                    <button onClick={handleBack}>Back</button>
                    <button type='button' onClick={handleNext}>Next</button>

                </div> 
                )}

                {step === 3 && (
                    <div className='steps'>
                    <input type="text" name='position' value={YourTitle} onChange={(e) => setYourTitle(e.target.value)} placeholder="Position"/>
                    {errors.position && <span className='error'>{errors.position}</span>}
                    <textarea className="form-control" name='description' value={Description} onChange={(e) => setDescription(e.target.value)} placeholder="Description about you"></textarea>
                    {errors.description && <span className='error'>{errors.description}</span>}
                    <Select 
                        placeholder='Select Skills'
                        options={skillOptions}
                        labelField="name"
                        valueField="name"
                        multi
                        onChange={handleLSkillChange}
                        color='#65B741'
                    />
                    {errors.SelectedSkills && <span className='error'>{errors.SelectedSkills}</span>}
                    <Select 
                        placeholder='Select Languages'
                        options={languageOptions}
                        labelField="value"
                        valueField="value"
                        multi
                        onChange={handleLanguageChange}
                        color='#65B741'
                    />
                    {errors.language && <span className='error'>{errors.language}</span>}
                    <input className='form-control' type="file" accept="image/*" name='pictureUrl' onChange={handleImageChange} placeholder="Url of your picture"/>
                    {errors.pictureUrl && <span className='error'>{errors.pictureUrl}</span>}
                    
                    <button onClick={handleBack}>Back</button>
                    <button type='button' onClick={handleNext}>Next</button>

                </div> 
                )}

                {step === 4 && (
                    <div className='steps'>
                    <input type="number" name='hourlyRate' value={HourlyRate} onChange={(e) => setHourlyRate(e.target.value)} placeholder="hourlyRate($.. per hour)"/>
                    <textarea className="form-control" name='education' value={Education} onChange={(e) => setEducation(e.target.value)} placeholder="Education"></textarea>
                    <textarea className="form-control" name='exprirnces' value={Experience} onChange={(e) => setExperience(e.target.value)} placeholder="Exprirnces"></textarea>
                    <input type="url" name='protfolioUrl' value={PortfolioURl} onChange={(e) => setPortfolioURl(e.target.value)} placeholder="Protfolio Url"/>
                    
                    <button onClick={handleBack}>Back</button>
                    <button type='submit'>Submit</button>

                </div> 
                )}
                <ToastContainer />
            </form>
        </div>
        <div className="toggle-sec">
            <div className="toggle">
                <div className="toggle-panel">
                    <h1>Welcome Back!</h1>
                    <p>Enter your personal details to use all of site features</p>
                    <button onClick={handleSingIn} id="login">Sign In</button>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}
export default FreelanceSignUp;