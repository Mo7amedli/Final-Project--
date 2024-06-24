import React, { useState } from 'react'
import Cookie from 'cookie-universal'
import { Link, useNavigate } from 'react-router-dom';
import { MdFindInPage } from "react-icons/md"
import { MdUpload } from "react-icons/md";
import { TbCircleLetterJ } from "react-icons/tb";
import { MdAccountCircle } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { TbCircleLetterC } from "react-icons/tb";
import { TbCircleLetterS } from "react-icons/tb";
import { TbCircleLetterL } from "react-icons/tb";
import { MdOutlineFavorite } from "react-icons/md";
import { IoBagRemoveSharp } from "react-icons/io5";
import { FaFileContract } from "react-icons/fa";
import './Home.css'
export default function Sidebar() {

    const navigate = useNavigate();

    const cookies = Cookie();
    const token = cookies.get('freelanceCookie');
    const role = cookies.get('role');

    
    const handleAccount =()=>{
        if(role === 'Freelancer'){
            navigate('/account-freelancer')
        }else if(role === 'User'){
            navigate('/account-user')
        }
        setActive(7)
    }
    
    const handleSignOut =()=>{
        cookies.remove('freelanceCookie')
        cookies.remove('role')
        window.location.pathname='/signin'
    }

    const [active, setActive] = useState();

  return (
    <div className='sidebar'>
        <div className='container-fluid'>
            <div className='row'>
                <div className=' col-2 pt-4' style={{minHeight:'91vh', position: 'fixed', backgroundColor:"#ebeeff", boxShadow:'0 0.125rem 0.50rem rgba(0, 0, 0, 0.075)'}}>
                    <ul className="nav">
                    {token && role === 'Freelancer'? (
                        <>
                            <Link className={active===1 ?"active nav-link " : "nav-link "} onClick={e=>setActive(1)} to={'/findwork'}><MdFindInPage className='d-inline'/>Find work</Link>
                            <Link className={active===2 ?"active nav-link " : "nav-link "} onClick={e=>setActive(2)} to={'/favjobs'}><MdOutlineFavorite className='d-inline'/>Fav jobs</Link>
                            <Link className={active===3 ?"active nav-link " : "nav-link "} onClick={e=>setActive(3)} to={'/appliedTasks'}><IoBagRemoveSharp className='d-inline'/>Applied Tasks</Link>
                            <Link className={active===4 ?"active nav-link " : "nav-link "} onClick={e=>setActive(4)} to={'/acceptedApplicantsFree'}><IoBagRemoveSharp className='d-inline'/>Accepts Tasks</Link>
                        </>
                    ) : (
                    token && role === 'User'? (
                        <>
                        <Link className={active===1 ?"active nav-link " : "nav-link "} onClick={e=>setActive(1)} to={'/freelancers'}><MdFindInPage className='d-inline' /> Find freelancer</Link>
                        <Link className={active===2 ?"active nav-link " : "nav-link "} onClick={e=>setActive(2)} to={'/favfreelancers'}><MdOutlineFavorite className='d-inline'/> Freelancers</Link>
                        <Link className={active===3 ?"active nav-link " : "nav-link "} onClick={e=>setActive(3)} to={'/createjob'}><MdUpload className='d-inline'/> Upload job</Link>
                        <Link className={active===4 ?"active nav-link " : "nav-link "} onClick={e=>setActive(4)} to={'/myjobs'}><TbCircleLetterJ className='d-inline'/> My jobs</Link>
                        <Link className={active===5 ?"active nav-link " : "nav-link "} onClick={e=>setActive(5)} to={'/acceptedApplicantsClient'}><TbCircleLetterJ className='d-inline'/> Accepted Applications</Link>
                        <Link className={active===6 ?"active nav-link " : "nav-link "} onClick={e=>setActive(6)} to={'/all-contracts'}><FaFileContract className='d-inline'/> Contracts</Link>
                        
                        </>
                    ) : token && role === 'Admin'? (
                        <>
                        <Link className={active===1 ?"active nav-link " : "nav-link "} onClick={e=>setActive(1)} to={'/categories'}><TbCircleLetterC className='d-inline'/> Categories</Link>
                        <Link className={active===2 ?"active nav-link " : "nav-link "} onClick={e=>setActive(2)} to={'/skills'}><TbCircleLetterS className='d-inline'/> Skills</Link>
                        <Link className={active===3 ?"active nav-link " : "nav-link "} onClick={e=>setActive(3)} to={'/Languages'}><TbCircleLetterL className='d-inline'/> Languages</Link>
                        </>
                    ) : null
                    )}
                        {token?(
                            <div className='bottom-sidebar'>
                                <button className={active===7 ?"active nav-link " : "nav-link "} onClick={handleAccount}><MdAccountCircle className='d-inline'/> Account</button>
                                <button className="nav-link " onClick={handleSignOut}><RiLogoutCircleLine className='d-inline'/> Sign out</button>
                            </div>
                        ) : null}
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}
