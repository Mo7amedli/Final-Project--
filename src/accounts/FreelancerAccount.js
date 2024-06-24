import React from 'react'
import ConfirmPass from './password/ConfirmPass'
import FreelancerInformation from './information/FreelancerInformation'
export default function FreelancerAccount() {
  return (
    <div >
        <div className='d-flex justify-content-center mt-3 row' >
            <nav className='d-flex justify-content-center'>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                    My Info
                    </button>
                    <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                    Password & Security
                    </button>
                </div>
            </nav>
            <div className="tab-content d-flex justify-content-center mt-3 row" id="nav-tabContent">
                <div className="tab-pane fade show active  " id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                    <FreelancerInformation />
                </div>
                <div className="tab-pane fade col-8" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
                    <ConfirmPass />
                </div>
            </div>
        </div>
    </div>
  )
}
