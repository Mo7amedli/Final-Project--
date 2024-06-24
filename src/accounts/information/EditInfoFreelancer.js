import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { baseUrl } from '../../Api/Api';
import Cookie from 'cookie-universal';
import { FaPerson } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";
import { FaBriefcase } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import { BsGeoAlt } from "react-icons/bs";
import { BsLink45Deg } from "react-icons/bs";
import cityData from '../../cityData.json'
import { Link, useNavigate } from 'react-router-dom';
export default function EditInfoFreelancer() {

  const navigate = useNavigate();
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Age, setAge] = useState('');
  const [ZIP, setZIP] = useState('');
  const [YourTitle, setYourTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Education, setEducation] = useState('');
  const [Experience, setExperience] = useState('');
  const [HourlyRate, setHourlyRate] = useState('');
  const [PortfolioURl, setPortfolioURl] = useState('');
  const [Country, setCountry] = useState('');
  const [State, setSelectState] = useState();
  const [Address, setAddress] = useState();
  const [PhoneNumber, setPhoneNumber] = useState();

  const [data, setData] = useState(cityData);
  const [getState, setState] = useState([]);
  const [cities, setCities] = useState([]);

  const country = [...new Set(data.map((item) => item.country))];
  country.sort();

  useEffect(() => {
    handleCountry({ target: { value: Country } });
    handleState({ target: { value: State } });
  }, [Country, State]);
  const handleCountry = (e) => {
    setCountry(e.target.value);
    let states = data.filter((state) => state.country === e.target.value);
    states = [...new Set(states.map((item) => item.subcountry))];
    states.sort();
    setState(states);
  };

  const handleState = (e) => {
    setSelectState(e.target.value);
    let cities = data.filter((city) => city.subcountry === e.target.value);
    setCities(cities);
  };

  const cookies = Cookie();
  const token = cookies.get('freelanceCookie');

  //fetch freelancer information
  useEffect(() => {
    fetchData();
    
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/Account/Freelancer-Account`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setCountry(response.data.country);
      setSelectState(response.data.state);
      setAddress(response.data.address);
      setAge(response.data.age);
      setPhoneNumber(response.data.phoneNumber);
      setHourlyRate(response.data.hourlyRate);
      setDescription(response.data.description);
      setEducation(response.data.education);
      setExperience(response.data.experience);
      setPortfolioURl(response.data.portfolioURl);
      setZIP(response.data.zip);
      setYourTitle(response.data.yourTitle);
    } catch (error) {
      console.error(error);
    }
  };

  const updateProfileInfo = async () => {
    const formData = new FormData();
    formData.append('FirstName', FirstName);
    formData.append('LastName', LastName);
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
    try {
      const response = await axios.post(
        `${baseUrl}/api/Account/Change-Name-Phone-Age-Language-ZIP-Address-Experience-Education-PortfolioURl-Description-YourTitle-HourlyRate-Freelancer`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      navigate('/account-freelancer')
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container" style={{ minHeight: '90vh', paddingTop: '20px' }}>
    <div className="row justify-content-center">
      <div className="col-md-12 col-lg-10">
        <h1 className="mb-4 text-center">Edit Profile</h1>
        
        <div className="row mb-3">
          <div className="col-md-5">
            <label className="form-label">First Name</label>
            <div className="input-group">
              <span className="input-group-text"><FaPerson /></span>
              <input type="text" className="form-control" placeholder="John" value={FirstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
          </div>
          <div className="col-md-5">
            <label className="form-label">Last Name</label>
            <div className="input-group">
              <span className="input-group-text"><FaPerson /></span>
              <input type="text" className="form-control" placeholder="Doe" value={LastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
          </div>
          <div className="col-md-2">
            <label className="form-label">Age</label>
            <div className="input-group">
              <span className="input-group-text"><CiCalendar /></span>
              <input type="number" className="form-control" value={Age} onChange={(e) => setAge(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-3">
            <label className="form-label">Your Position</label>
            <div className="input-group">
              <span className="input-group-text"><FaBriefcase /></span>
              <input type="text" className="form-control" placeholder="Software Engineer" value={YourTitle} onChange={(e) => setYourTitle(e.target.value)} />
            </div>
          </div>
          <div className="col-md-3">
            <label className="form-label">Hourly Rate</label>
            <div className="input-group">
              <span className="input-group-text"><BsCashCoin /></span>
              <input type="text" className="form-control" placeholder="$50" value={HourlyRate} onChange={(e) => setHourlyRate(e.target.value)} />
            </div>
          </div>
          <div className="col-md-3">
            <label className="form-label">Zip Code</label>
            <div className="input-group">
              <span className="input-group-text"><BsGeoAlt /></span>
              <input type="text" className="form-control" placeholder="12345" value={ZIP} onChange={(e) => setZIP(e.target.value)} />
            </div>
          </div>
          <div className="col-md-3 mt-2">
            <label className="form-label">Phone Number</label>
            <div>
              <PhoneInput value={PhoneNumber} onChange={setPhoneNumber} />
            </div>
          </div>
        </div>
        
        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">Select Country</label>
            <select className="form-select" value={Country} onChange={(e) => handleCountry(e)}>
              <option value=''>Select country</option>
              {country.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Select State</label>
            <select className="form-select" value={State} onChange={(e) => handleState(e)}>
              <option value=''>Select state</option>
              {getState.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
          <div className="col-md-4">
          <label className="form-label">Select City</label>
            <select className="form-select" value={Address} onChange={(e) => setAddress(e.target.value)}>
              <option value=''>Select city</option>
              {cities.map((item) => <option key={item.name}>{item.name}</option>)}
            </select>
          </div>
        </div>
        
        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">Description</label>
            <textarea className="form-control" placeholder="Brief description about yourself" value={Description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Education</label>
            <textarea className="form-control" placeholder="Your education background" value={Education} onChange={(e) => setEducation(e.target.value)} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Experience</label>
            <textarea className="form-control" placeholder="Your work experience" value={Experience} onChange={(e) => setExperience(e.target.value)} />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4 offset-md-4"> 
            <label className="form-label">Portfolio URL</label>
            <div className="input-group">
              <span className="input-group-text"><BsLink45Deg /></span>
              <input type="text" className="form-control" placeholder="https://yourportfolio.com" value={PortfolioURl} onChange={(e) => setPortfolioURl(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 text-start"> {/* Left side for "Back to Profile" button */}
            <Link className="btn btn-secondary btn-lg" to={'/account-freelancer'}>Back to Profile</Link>
          </div>
          <div className="col-md-6 text-end"> {/* Right side for "Update Profile" button */}
            <button className="btn btn-primary btn-lg" onClick={updateProfileInfo}>Update Profile</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}