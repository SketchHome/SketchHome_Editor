/*
* Editor Page
*
*/

import React from 'react';

import Editor from '../HomeEditor/Editor'

//component
import EditorNav from '../components/EditorNavbar';

function HomeEditor() {
  return (
    <div className="HomeEditor">
      <EditorNav/>
      <Editor />
    </div>
  );
}

export default HomeEditor;
