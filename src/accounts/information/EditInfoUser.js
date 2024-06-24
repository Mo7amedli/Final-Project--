import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cookie from 'cookie-universal'
import { baseUrl } from '../../Api/Api';
import { ToastContainer, toast } from 'react-toastify';
export default function EditInfoUser({ isOpen, closeModal }) {
    

    //call country and sort it
    const [data, setData] = useState([])
    useEffect(()=>{
        axios.get('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json').then(res=>setData(res.data)).catch(err=>console.log(err))
    },[])
    const country = [...new Set(data.map(item=> item.country))];
    country.sort();

    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Country, setCountry] = useState();

    //get token
    const cookies = Cookie();
    const token = cookies.get('freelanceCookie')

    //fetch user data
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
        setCountry(response.data.country);
      } catch (error) {
        console.error(error);
      }
    };

    //update user data
    const updateProfileInfo = async()=>{
      const formData = new FormData();
      formData.append('FirstName', FirstName);
      formData.append('LastName', LastName);
      formData.append('Country', Country);
      try{
        const response = await axios.post(`${baseUrl}/api/Account/Change-Country-For-User`,formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          }
      });
      window.location.reload();
      }catch(err){
        console.log(err)
      }
    }
      
  return (
    <div>
        <div className={`modal ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
        <div className="modal-dialog" > 
          <div className="modal-content" style={{marginLeft:'80px', marginTop:'100px'}}>
            <div className="modal-header">
              <h5 className="modal-title">Update Information</h5>
              <button type="button" className="btn-close" onClick={closeModal}></button>
            </div>
            <div className="modal-body">
              <div className="mb-1">
                <label className='form-label mb-1' >First Name</label>
                <input type="text" className="form-control" value={FirstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="mb-1">
                <label className='form-label mb-1'>Last Name</label>
                <input type="text" className="form-control" value={LastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
              <div className="mb-1">
              <label className='form-label mb-1'>Select Country</label>
                <select className='form-select my-1' value={Country} onChange={(e)=>setCountry(e.target.value)}>
                  <option value=''>select country</option>
                  {country.map(item=> <option key={item} >{item}</option>)}
                </select>
              </div>
              
            </div>
            <div className="modal-footer">
              <button type="button" className='btn btn-secondary' onClick={closeModal}>Close</button>
              <button type="button" className='btn btn-primary' onClick={updateProfileInfo} >Save</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center"/>
    </div>
  )
}
