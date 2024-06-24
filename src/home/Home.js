import React from 'react'
import MainContent from './MainContent'
import Jobs from './Jobs'
import Freelancers from './Freelancers'
import WebsitePrivileges from './WebsitePrivileges'
function Home() {
  return (
    <div className='home'>
      <div className=''>
        <MainContent/>
        <Jobs />
        <Freelancers />
        <WebsitePrivileges/>
      </div>
    </div>
  )
}
export default Home;