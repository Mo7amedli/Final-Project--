import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Heart from 'react-heart'
import './Favorites.css'
import axios from 'axios'
import { baseUrl } from '../Api/Api'
import Cookie from 'cookie-universal'
import { Rating } from '@smastrom/react-rating'
function FavFreelancers() {

    const navigate = useNavigate();
    const goToProfile =(id)=>{
     navigate(`/freelancers/Profile/${id}`)
    }

  const [myFavFree, setMyFavFree] = useState([]);
  const cookies = Cookie();
  const token = cookies.get('freelanceCookie')

  useEffect(() => {
    fetchFavFree();
  }, []);
  const fetchFavFree = async()=>{
    try{
      const response = await axios.get(`${baseUrl}/api/FreeFav/Get-My-Fav-Free`,{
        headers: {
           Authorization: `Bearer ${token}`
        }
      })
      console.log(response.data);
      setMyFavFree(response.data)
    }catch(error){
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
  }

  //add and delete fav
  const addAndDeleteFav= async(Fid)=>{
    try{
      const response = await axios.post(`${baseUrl}/api/FreeFav/New-Delete-Fav-Freelancer?Fid=${Fid}`,{ Fid },{
        headers: {
           Authorization: `Bearer ${token}`
        }
      })
      fetchFavFree();
    } catch(error){
      console.log(error.response)
      }
   };
  
   

  return (
      <div className="favcard">
        {Array.isArray(myFavFree) && myFavFree.length > 0?(
          <> 
            {myFavFree.map((data)=>(
              <div key={data.freelancerID} className="fav-free-card">
                <div className="profile-picture">
                  <img src={data.profilePicture} alt={data.fullName} />
                </div>
                <div className="info">
                  <button onClick={()=>goToProfile(data.freelancerID)}>
                    <p className='name'>{data.fullName}</p>
                  </button>
                  <p className='position'>{data.yourTitle}</p>
                  <p>{data.description}</p>
                  <div className="free-fav-s-buttons">
                    <Rating readOnly  style={{ maxWidth: '100px' }} value={data.rate}/>
                    <button className='fav-s-button'>
                    <Heart isActive={data.isFav} onClick={()=>addAndDeleteFav(data.freelancerID)} />
                    </button>
                  </div>
                  <p className='hourly-rate'>hourly Rate</p>
                </div>
        {/*
                <img src={data.profilePicture} alt="Profile" className="profile-picture" />
                <div className="freelancer-info">
                  <div className="title-container">
                    <button onClick={()=>goToProfile(data.freelancerID)} className="full-name">{data.fullName}</button>
                  </div>
                  <p className="title">{data.yourTitle}</p>
                  <p className="hourly-rate">Hourly Rate: ${data.hourlyRate}/houre</p>
                  <p className="description">{data.description}</p>
                  <div className="free-fav-s-buttons">
                    <Rating readOnly  style={{ maxWidth: '100px' }} value={data.rate}/>
                    <button className='fav-s-button'>
                    <Heart isActive={data.isFav} onClick={()=>addAndDeleteFav(data.freelancerID)} />
                    </button>
                  </div>
                </div>
                 */}
              </div>
            ))}
          </>
          ) : (
          <div className='no-freelancer'>
            <h1>There Are No Favorite Freelancers Yet, Add To Favorites First.</h1>
          </div>
        )}
      </div>
  )
}

export default FavFreelancers