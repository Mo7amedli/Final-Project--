import React, { useEffect, useState } from 'react'
import Cookie from 'cookie-universal'
import axios from 'axios';
import { baseUrl } from '../../Api/Api';
import '.././CSS.css'
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-dropdown-select';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { IoLocationOutline } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
export default function Test() {

  const navigate = useNavigate();
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setusername] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
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
     //call token 
  const cookies = Cookie();
  const token = cookies.get('freelanceCookie')

    //fetch freelancer information
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/Account/Freelancer-Account`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data.profilePicture)
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setEmail(response.data.email);
      setusername(response.data.username);
      setRating(response.data.rate);
      setCountry(response.data.country);
      setState(response.data.state);
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
    } catch (error) {
      const errorPages = error.response.status;
      if (errorPages === 403) {
        navigate('/error403');
      } else if (errorPages === 401) {
        navigate('/error401');
      } else if (errorPages === 500) {
        navigate('/error500');
      } else{
        console.log(error.response)
      }
    }
  };

  const [rating, setRating] = useState()

  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const handleCloseImg = () => {
    setOpen(false);
  };

  const handleOpenImg = () => setOpen(true);
  const handleImageUpload = (event) => {
    setImageFile(event.target.files[0]);
  };
  
  const submitImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
  
      await axios.post(`${baseUrl}/api/Account/ChangeProfilePicture-FreeLancer`, formData,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      handleCloseImg();
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const navigateToEdit = () =>{
    navigate('/edit-freelancer');
  }

  // add skills and languages
  const [show, setShow] = useState(false);

  const handleCloseSkiLang = () => {
    setShow(false);
  };
  const[languages, setLanguages] = useState([])
  const[skills, setSkills] = useState([])
  const handleShow = (lang, skil) => {
    setShow(true);
    setLanguages(lang);
    setSkills(skil);
  }

  useEffect(() => {
    if (languages.length > 0) {
      setSelectedLangueges(languages);
    }
    if (skills.length > 0) {
      setSelectedSkills(skills);
    }
  }, [languages, skills]);

  const [AddedLanguages, setAddedLanguages] = useState([])
  const [AddedSkills, setAddedSkills] = useState([])
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

  const handleLanguageChange = (languageOptions) => {
    const selectedLanguageID = languageOptions.map((option) => option.id);
    setAddedLanguages(selectedLanguageID);
  };
  const handleLSkillChange = (skillOptions) => {
    const selectedSkillID = skillOptions.map((option) => option.id);
    setAddedSkills(selectedSkillID);
  };

  const handleAdding = async ()=> {
    const formData = new FormData();
    AddedSkills.forEach((skill, index) => {
        formData.append('SelectedSkills', skill); 
      });
    AddedLanguages.forEach((skill, index) => {
        formData.append('SelectedLanguages', skill); 
      });
    
    console.log(selectedLangueges);
    console.log(selectedSkills);
  }
  return (
    <div className='AccFree row' style={{minHeight:'81vh'}}>
        <div className=' col-12 row d-flex justify-content-center'>
            <div className=' col-10 row d-flex justify-content-between'>
                <div className='rate col-4 py-3 ' style={{background:"white"}}>
                    <div className='d-flex justify-content-center'>
                        <img className='user-photo' src='https://t4.ftcdn.net/jpg/00/65/10/47/360_F_65104718_x17a76wzWKIm3BlhA6uyYVkDs9982c6q.jpg' alt="photo" style={{width:'100px', height:'100px', borderRadius:'50%'}}/>
                        <button >
                          <AiFillEdit className="edit-img" onClick={handleOpenImg} />
                        </button>
                    </div>
                    {/* modal of edit image */}
                    <div className={`modal fade${open ? ' show' : ''}`} style={{ display: open ? 'block' : 'none' }}>
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="imageModalLabel">Upload Profile Picture</h5>
                            <button type="button" className="btn-close" onClick={handleCloseImg} aria-label="Close"></button>
                          </div>
                          <div className="modal-body">
                            <input type="file" className="form-control" id="imageInput" onChange={handleImageUpload} />
                          </div>
                          <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" onClick={handleCloseImg}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={submitImageUpload}>Upload</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='d-flex justify-content-center mt-2 left-info'>
                        <div className='text-center'>
                            <span className='d-block mb-1' style={{fontWeight:'600'}}>{firstName} {lastName}</span>
                            <span className='d-block mb-1'>{username}</span>
                            <span className='d-block mb-2'><IoLocationOutline className='d-inline'/>{country}-{state}-{address}</span>
                            <div className='mx-4'>
                              <Rating readOnly  style={{ maxWidth: '150px' }} value={rating} onChange={setRating}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col-8' >
                    <div className='FreeInfo mr-3'>
                        <span className='d-block'>Age:</span>
                        <p className='mb-1'>{age}</p>
                        <span className='d-block'>phone:</span>
                        <p className='mb-1'>{phoneNumber}</p>
                        <span className='d-block '>Zip Code:</span>
                        <p className='mb-1'>{zip}</p>
                        <span className='d-block'>Your Title:</span>
                        <p className='mb-1'>{yourTitle}</p>
                        <span className='d-block'>Description:</span>
                        <p className='mb-1'>{description}</p>

                        {education !== null && education !== 'null' ? (
                          <div>
                            <span className='d-block'>Education:</span>
                            <p className='mb-1'>{education}</p>
                          </div>
                        ) : null}
                        
                        {experience !== null && experience !== 'null' ? (
                          <div>
                            <span className='d-block'>Experience:</span>
                            <p className='mb-1'>{experience}</p>
                          </div>
                        ) : null}
                        
                        <span className='d-block'>PortfolioURl:</span>
                        <a href={portfolioURL} className='mb-1'>portfolioURL</a>
                        <FaUserEdit className='edit-info'onClick={navigateToEdit}/>
                    </div>

                    <div className='Skill-lang'>
                    <span className=' d-block '>Languages:</span>
                        <div style={{margin:"10px 0 0 30px"}}>
                            {selectedLangueges.map((lang,index)=><span className='languages' key={index}>{lang}</span>)}
                        </div>
                        <span className='d-block'>Skills:</span>
                        <div style={{margin:"10px 0 0 30px"}}>
                        {selectedSkills.map((skill, index)=><span className='skills' key={index}>{skill}</span>)}
                        </div>
                        <IoIosAddCircle className="edit-skill-lang" onClick={()=>{
                          handleShow(selectedSkills, selectedLangueges);
                          }
                        } />
                    </div>
                    
                    {/* modal for skills and languages */}
                    <div className={`modal fade${show ? ' show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" className="btn-close" onClick={handleCloseSkiLang} aria-label="Close"></button>
                          </div>
                          <div className="modal-body" >
                          <Select 
                            placeholder='Search for skills to add'
                            options={skillOptions}
                            labelField="name"
                            valueField="name"
                            values={selectedSkills}
                            multi
                            onChange={handleLSkillChange}
                            color='#65B741'
                            style={{ zIndex: 1000 }}
                            />
                          <Select 
                              placeholder='Search for languages to add'
                              options={languageOptions}
                              labelField="value"
                              valueField="value"
                              values={selectedLangueges}
                              multi
                              onChange={handleLanguageChange}
                              color='#65B741'
                              style={{ zIndex: 900 }}
                          />
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleCloseSkiLang}>
                              Close
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleAdding}>
                              Save changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}
