import React from 'react'

export default function Error500() {
  return (
    <div className='errorPages' style={{paddingTop:'170px'}}>
        <h1>500</h1>
  <h2>Unexpected Error <b>:</b></h2>
  <h2 style={{marginBottom:'50px', fontSize:"20px"}}>Internal server error</h2>
  <div className="gears">
    <div className="gear one">
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
    </div>
    <div className="gear two">
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
    </div>
    <div className="gear three">
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
    </div>
  </div>
  
    </div>
  )
}
