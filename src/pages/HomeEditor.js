/*
* Editor Page
*
*/

import React from 'react';

//BootStrap 
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../components/index.css'

//Image soruce
import houseImage from '../resource/image/house.jpg';
import startImage from '../resource/image/start.jpg';
import sample1 from '../resource/image/inteior1.jpg'

//Component
import Editor from '../HomeEditor/Editor'

function HomeEditor() {
  return (
    <div className="HomeEditor">
        <Editor />
    </div>
  );
}

export default HomeEditor;
