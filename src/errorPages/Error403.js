import React from 'react'
import "./Errors.css"
function Error403() {
  return (
     <div className='errorPages'>
          <div id="errorN">
               <div className="errorN">
                    <div className="errorNum">
                         <div></div>
                         <h1>403</h1>
                    </div>
                    <h2>Forbidden</h2>
                    <p>You don't have permission to access this resourse.</p>
               </div>
          </div>
     </div>
  )
}
export default Error403;