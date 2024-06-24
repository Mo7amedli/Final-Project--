import React from 'react'
import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { baseUrl } from '../../Api/Api';
import Cookie from 'cookie-universal'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function Password({ show, onHide }) {

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [errorRes, setErrorRes] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!oldPassword) {
      newErrors.oldPassword = 'Password is required';
    } else if (oldPassword.length < 8) {
      newErrors.oldPassword = 'Password should be at least 8 characters long';
    }

    if (!newPassword) {
      newErrors.newPassword = 'Password is required';
    }  else if (newPassword.length < 8) {
      newErrors.newPassword = 'Password should be at least 8 characters long';
    } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$_.]).{8,}$/.test(newPassword)) {
      newErrors.newPassword = "Password mut be at least one capital character, small character, number and special character.";
    }

    if (!confirmNewPassword) {
      newErrors.confirmNewPassword = 'Confirm Password is required';
    } else if (confirmNewPassword!== newPassword) {
      newErrors.confirmNewPassword = 'Passwords do not match';
    }
    return newErrors;
  }


  //get token
  const cookies = Cookie();
  const token = cookies.get('freelanceCookie')

  const handeleChangePass = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);
    try{
      const response = await axios.post(`${baseUrl}/api/Account/ChangePassword-All`, {oldPassword, newPassword, confirmNewPassword},{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      onHide();
      toast.success('Password Changed')
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setErrorRes('');
      setErrors();
    }catch(err){
      console.log(err.response.data)
      if(err.response.data === "Failed to change password"){
        setErrorRes('The old password not correct')
      }else{
        setErrorRes('')
      }
      
    }
  };

  return (
    <div>
      {show && (
      <div className={`modal ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="passwordModalLabel">Edit Password</h5>
              <button className="btn-close" onClick={onHide}>
              </button>
            </div>
            <div className="modal-body">
              <form >
                <div >
                  <label htmlFor="oldPassword">Old Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="oldPassword"
                    value={oldPassword}
                    onChange={(e)=>setOldPassword(e.target.value)}
                  />
                </div>
                {errors.oldPassword && <p className='text-danger'>{errors.oldPassword}</p>}
                <div >
                  <label htmlFor="newPassword">Current Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e)=>setNewPassword(e.target.value)}
                  />
                </div>
                {errors.newPassword && <p className='text-danger'>{errors.newPassword}</p>}
                <div >
                  <label htmlFor="confirmNewPassword">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmNewPassword"
                    value={confirmNewPassword}
                    onChange={(e)=>setConfirmNewPassword(e.target.value)}
                  />
                </div>
                {errors.confirmNewPassword && <p className='text-danger'>{errors.confirmNewPassword}</p>}
              </form>
            </div>
            {errorRes && <p className='text-danger text-center'>{errorRes}</p>}
            <div className="modal-footer">
              <button type="button" className='btn btn-secondary' onClick={onHide}>Close</button>
              <button type="button" onClick={handeleChangePass} className='btn btn-primary' >Save</button>
            </div>
          </div>
        </div>
      </div>
      )}
      <ToastContainer position="top-center"/>
    </div>
  )
}