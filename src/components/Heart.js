import React, { useState } from "react"
import Heartt from 'react-heart'

export default function Heart() {
    const [active, setActive] = useState(false)
    const handleClich =()=>{
        setActive(!active)
      }
      console.log(active);
  return (
    <div>
      <div style={{width:'50px', height:'50px'}}>
        <Heartt isActive={active} onClick={handleClich} style={{ width: "10x" }}/>
      </div>
    </div>
  )
}
