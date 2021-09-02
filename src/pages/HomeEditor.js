/*
* Editor Page
*
*/

import React from 'react';

//BootStrap 
import '../components/index.css'

//Component
import EditorNav from '../components/EditorNavbar';
import Editor from '../HomeEditor/Editor'

function HomeEditor() {
  return (
    <div className="HomeEditor">
      <EditorNav fileName="myfiles1"/>
        <Editor />
    </div>
  );
}

export default HomeEditor;
