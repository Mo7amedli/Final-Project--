import React from 'react'
import './Done.css'
import sign from '../image/Done sign.webp'
function Done() {
  return (
    <div className='reg'>
        <img src={sign} alt="done"
        height="250px" />
        <div className="done">
            <div >
                <h2>DONE</h2>
                <p className='check'>Please check your email to reset your password</p>
                <a className='recieve' src='/#'>Didn't receive the email?</a>
            </div>
        </div>
    </div>
  )
}
export default Done;