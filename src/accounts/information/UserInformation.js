import React, { useEffect, useState } from 'react'
import Cookie from 'cookie-universal'
import axios from 'axios';
import { baseUrl } from '../../Api/Api';
import { FaUserEdit } from "react-icons/fa";
import '../CSS.css'
import EditInfoUser from './EditInfoUser';
import { useNavigate } from 'react-router-dom';
function Information() {

  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setusername] = useState('');
  const [country, setCountry] = useState('');

  const cookies = Cookie();
  const token = cookies.get('freelanceCookie')

  //fetch freelancer information
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/Account/User-Account`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setEmail(response.data.email);
      setusername(response.data.username);
      setCountry(response.data.country);
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

    //open modal for edit user information
    const [modalInfoOpen, setModalInfoOpen] = useState(false);
      
    const openInfoModal = () => {
      setModalInfoOpen(true);
    };
    
    const closeInfoModal = () => {
      setModalInfoOpen(false);
    };
    
  return (
    <div className='bg-acc'>
        <h3>My Info</h3>
        <div className='Account'>
          <div className='row mx-5'>
            <div className='Acc-info'>
                <label>Name:</label>
                <p>{firstName} {lastName}</p>
                <label>User Name:</label>
                <p>{username}</p>
                <label>Email:</label>
                <p>{email}</p>
                <label>Country:</label>
                <p>{country}</p>
            </div>
          </div>
          <FaUserEdit className='edit-user' onClick={openInfoModal}/>
        </div>
        <EditInfoUser isOpen={modalInfoOpen} closeModal={closeInfoModal} />
    </div>
  )
}
export default Information;