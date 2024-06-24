import React from 'react'
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { Rating } from '@smastrom/react-rating'
import Heart from 'react-heart'
export default function Card(props) {
    
  return (
    <div className='favcard'>
      <div className="fav-free-card"> 
        <div className="profile-picture">
          <img src="https://www.bing.com/images/search?view=detailV2&ccid=Fz332QZH&id=DE823A68F713812E18DCA95FB76E5351C5F1B55C&thid=OIP.Fz332QZHPMJWy882It_ZYgHaE8&mediaurl=https%3a%2f%2fi.etsystatic.com%2f19662454%2fr%2fil%2fb065fd%2f2401067828%2fil_fullxfull.2401067828_b2up.jpg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.173df7d906473cc256cbcf3622dfd962%3frik%3dXLXxxVFTbrdfqQ%26pid%3dImgRaw%26r%3d0&exph=2003&expw=3000&q=lap&simid=608030399122972269&FORM=IRPRST&ck=D686227F999E2DAB0390A8FC0B091B79&selectedIndex=2&itb=0" alt="Ramsey Harper" />
        </div>
        <div className="info">
          <p className='name'>Ramsey Harper</p>
          <p className='position'>GRAPHIC DESIGNER</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere a
            tempore, dignissimos odit accusantium repellat quidem, sit molestias
            dolorum placeat quas debitis ipsum esse rerum?
          </p>
          <div className="free-fav-s-buttons">
            <Rating readOnly  style={{ maxWidth: '100px' }} />
            <button className='fav-s-button'>
            <Heart isActive={1}  />
            </button>
          </div>
          <p className='hourly-rate'>hourly Rate</p>
        </div>
        
      </div>
    </div>
  )
}
