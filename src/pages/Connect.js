/*
* Connnection Page
*
*/

import React from 'react';

//component
import Navbar from '../components/Navbar'

function Connnect() {
  return (
    <div>
      <Navbar/>
      <div className="Connnect" style={{fontFamily:"NanumSquare_acR", display: "grid", placeItems: "center", minHeight: "90vh"}}>
      <p>Connect US! SKETCH HOME</p>
    </div>
    </div>
  );
}

export default Connnect;
