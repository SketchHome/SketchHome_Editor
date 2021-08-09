/*
* Explain Page
*
*/

import React from 'react';

//component
import Navbar from '../components/Navbar'

//image files (resource)
import DetailImage from '../resource/image/detailPage.jpg'

function ExplainDetail() {
  return (
    <div className="ExplainDetail">
       <Navbar/>
      <img src={DetailImage} alt="detailPage.jpg" style={{width:"100%"}}/>
    </div>
  );
}

export default ExplainDetail;
