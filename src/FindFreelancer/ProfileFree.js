import React, { useEffect, useState } from 'react'
import { IoLocationOutline } from "react-icons/io5";
import './FreelancersPage.css';
import { Rating } from '@smastrom/react-rating'
import { useNavigate, useParams } from 'react-router-dom';
import Cookie from 'cookie-universal'
import axios from 'axios';
import { baseUrl } from '../Api/Api';
import Heart from 'react-heart'
export default function ProfileFree() {
    const navigate = useNavigate();
    let {id} = useParams();
    console.log(id)

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setusername] = useState('');
    const [address, setAddress] = useState('');
    const [age, setAge] = useState('');
    const [description, setDescription] = useState('');
    const [education, setEducation] = useState('');
    const [experience, setExperience] = useState('');
    const [phoneNumber, setPoneNumber] = useState('');
    const [hourlyRate, setHourlyRate] = useState('');
    const [yourTitle, setYourTitle] = useState('');
    const [zip, setZip] = useState('');
    const [portfolioURL, setPortfolioURL] = useState('');
    const [profilePicture, setProfilePicture] = useState();
    const [selectedLangueges, setSelectedLangueges] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [rating, setRating] = useState();
    const [isFav, setIsFav] = useState();

    const cookies = Cookie();
    const token = cookies.get('freelanceCookie')

    //fetch freelancer information
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/Home/Get-Freelancer-By-ID?Fid=${id}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data)
      console.log(response.data.profilePicture)
      setFullName(response.data.fullName);
      setEmail(response.data.email);
      setusername(response.data.username);
      setAddress(response.data.address);
      setAge(response.data.age);
      setPoneNumber(response.data.phoneNumber);
      setHourlyRate(response.data.hourlyRate);
      setDescription(response.data.description);
      setEducation(response.data.education);
      setExperience(response.data.experience);
      setPortfolioURL(response.data.portfolioURl);
      setProfilePicture(response.data.profilePicture);
      setZip(response.data.zip);
      setSelectedSkills(response.data.selectedSkills);
      setSelectedLangueges(response.data.selectedLanguages);
      setYourTitle(response.data.yourTitle);
      setRating(response.data.rate);
      setIsFav(response.data.isFav);
    } catch (error) {
      const errorPages = error.response.status;
      if (errorPages === 403) {
        navigate('/error403');
      } else if (errorPages === 401) {
        navigate('/error401');
      } else if (errorPages === 500) {
        navigate('/error500');
      }else{
        console.log(error.response);
      }
    }
  };

  //add and delete fav
  const addAndDeleteFav= async()=>{
    try{
      const response = await axios.post(`${baseUrl}/api/FreeFav/New-Delete-Fav-Freelancer?Fid=${id}`,{ Fid: id },{
        headers: {
           Authorization: `Bearer ${token}`
        }
      })
      fetchData();
    } catch(error){
      console.log(error.response)
      }
   };

  return (
    <div style={{minHeight: '84vh'}}>
      <div className='account d-flex justify-content-center '>
        <div className="account-info col-lg-10 row "> 
          <div className="head d-flex py-3 " > 
            <div>
              <img className='user-photo' src={profilePicture} alt="photo" style={{width:'100px', height:'100px', borderRadius:'50%'}}/>
            </div>
            <div className='px-3' >
              <span className='d-block my-1' style={{fontWeight:'500'}}>{fullName}</span>
              <span className='d-block my-1'>{username}</span>
              <span className='d-block my-1'><IoLocationOutline className='d-inline'/>{address}</span>
              <Rating readOnly  style={{ maxWidth: '100px' }} value={rating} onChange={setRating}/>
            </div>  
            <button className='pro-fav-s-button'>
              <Heart isActive={isFav} style={{width:"30px"}} onClick={addAndDeleteFav}/>
          </button>  
          </div>
          <div className="row">
            <div className="Skills col-lg-5 py-3">
              <div className='py-2'>
                <h4>Skills</h4>
                {selectedSkills.map((skill)=><span className='skills' key={skill}>{skill}</span>)}
              </div>  
              <div className='py-3'>
                <h4>Languages:</h4>
                {selectedLangueges.map((lang)=><span className='languages' key={lang}>{lang}</span>)}
              </div>
            </div>
            <div className="about col-lg-7 ">
              <div className='d-flex justify-content-between'>
                <div className=" px-2 py-3">
                  <h3 className='py-2'>{yourTitle}</h3>
                  <p className='px-4'>{description}</p>
                </div>  
                {hourlyRate?(
                  <p className='py-4'>{hourlyRate}/hour</p>):
                  (<p></p>)
                }
              </div>
              <h4>PortfolioURL:</h4>
              <a href={portfolioURL} className='linkedin'>portfolioURL</a>
            </div>
          </div>           
        </div>
      </div>
    </div>
  )
}
