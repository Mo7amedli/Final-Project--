import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { baseUrl } from '../Api/Api';
import axios from 'axios';
import './ProfileCard.css';
import Heartt from 'react-heart'
import { Rating } from '@smastrom/react-rating'
export default function Selected({ name, location, price, rate, image, id }) {
  const [active, setActive] = useState(false)
    const handleClich =()=>{
        setActive(!active)
      }
      
  return (
    <div className="cardPrf">
      <div className="card-image">
        <img src={image} alt={name} />
      </div>
      <div className="card-content">
        <h3>{name}</h3>
        <p>Position: {location}</p>
        <p>Hourly rate: {price}$</p>
        <p style={{ marginLeft:'140px' }}><Rating readOnly  style={{ maxWidth: '100px' }} value={rate}/></p>
      </div>
      <div className="card-buttons">
        <button>Show More</button>
      <div style={{width:'50px', height:'50px'}}>
        <Heartt isActive={active}  style={{ width: "10x" }}/>
      </div>
      </div>
    </div>
  );
}