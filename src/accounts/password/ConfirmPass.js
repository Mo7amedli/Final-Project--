import React, { useState } from 'react'
import { FaRegCheckCircle } from "react-icons/fa";
import '../CSS.css'
import { AiFillEdit } from "react-icons/ai";
import Password from './ChangePassword';
export default function ConfirmPass() {

    const [showModal, setShowModal] = useState(false);
    const handleEditButtonClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
  
  return (
    <div style={{height:'81vh'}}>
        <h4>Password & security</h4>
        <div className='security-pass'>
            <h4>Authentication options</h4>
            <div className='change-pass my-4'>
                <h5>Password</h5>
                <button onClick={handleEditButtonClick}>
                <AiFillEdit className='eidt-pass' />
                </button>
                <div className='pass-condition d-flex'>
                    <FaRegCheckCircle className='check-pass'/>
                    <div className='check-info'>
                    <label>Password has been set</label>
                    <span>Choose a strong, unique password that's at least 8 characters long.</span>
                    </div>
                </div>
            </div>
        </div>
        <Password show={showModal} onHide={handleCloseModal}/>
    </div>
  )
}
