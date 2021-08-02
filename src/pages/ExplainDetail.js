/*
* Explain Page
*
*/

import React from 'react';

//image files (resource)
import DetailImage from '../resource/image/detailPage.jpg'

function ExplainDetail() {
  return (
    <div className="ExplainDetail">
      <img src={DetailImage} alt="detailPage.jpg" style={{width:"100%"}}/>
    </div>
  );
}

export default ExplainDetail;
