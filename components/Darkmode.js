import Image from 'next/image'
import React, { useState, useEffect } from 'react';

const Darkmode = ({ toggleDarkMode, isDarkMode, setIsDarkmode }) => {
    
   return (
<button className="float-start ms-3 btn btn-dark" onClick={toggleDarkMode}> {isDarkMode ? 'LightMode' : 'DarkMode'}
<Image
                className="float-end ms-1"
                src="/power.svg"
                alt="Wind direction"
                width="30"
                height="30"
              />
</button>
    )
 }
 export default Darkmode;