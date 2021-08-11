import React from 'react';

//bootstrap
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//icons
import { BiUndo } from "react-icons/bi";//rollforward
import { BiRedo } from "react-icons/bi"; //rollback
import { BiSave } from "react-icons/bi"; //save
import { BiScan } from "react-icons/bi"; //scan


//style
import './index.css'

//component
import ToggleBtn from './toggleBtn';

//image source
import simpleLogo from '../resource/image/simple_logo.png';

function EditorNavigation(props) {
    return (
        <div className="EditorNav" className="EditorNav">
            <container>
                <Row xs="5" className="marginTop">
                    <Col xs="1">
                        <a href="/home"><img src={simpleLogo} style={{marginTop: "3px", marginLeft:'30px', width:'25px'}}></img></a>
                    </Col>
                    <Col>
                        <p className="fileName_font">{ props.fileName }</p>
                    </Col>
                    <Col xs="3">
                        {/*Button list*/}
                        <Button variant="outline-success" className="buttonMargin"><BiUndo/></Button>{' '}
                        <Button variant="outline-success" className="buttonMargin"><BiRedo/></Button>{' '}
                        <Button variant="outline-success" className="buttonMargin"><BiSave/></Button>{' '}
                    </Col>
                    <Col>
                        <ToggleBtn
                        btnColor="outline-success"
                        n1="2D 뷰어"
                        n2="편집 모드"
                        n3="3D 뷰어"
                        />
                    </Col>
                    <Col>
                        <Button variant="success" style={{position: 'absolute', right: 0, marginRight: "30px"}}><BiScan/> 렌더링 하기</Button>{' '}
                    </Col>
                </Row>
            </container>
        </div>
    );
}

export default EditorNavigation;