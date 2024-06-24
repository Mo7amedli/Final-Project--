import React from 'react'
import './Choose.css'
import { Link, useNavigate } from 'react-router-dom';
function Choose() {
    const navigate = useNavigate();

    function handleSingIn(){
        navigate("/signin")
    }

    function handleClient() {
        navigate("/clientSignup")
      }

    function handleFreelance() {
        navigate("/freelanceSignUp")
      }
  return (
    <div className='box'>
        <div className="box-container">
        <div className="choose">
            <div>
                <h3>Join us as a client or freelance</h3>
                <a className='button' onClick={handleClient} ><p>I am a <span>client</span>, hiring for a project</p></a>
                <a className='button' onClick={handleFreelance}><p>I am a <span>freelance</span>, looking for work</p></a>
            </div>
        </div>
        <div className="toggle-container">
            <div className="toggle">
                <div className="toggle-panel">
                    <h1>Welcome Back!</h1>
                    <p>Enter your personal details to use all of site features</p>
                    <button onClick={handleSingIn} id="login">Sign In</button>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}
export default Choose;