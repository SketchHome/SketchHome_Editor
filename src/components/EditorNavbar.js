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
import ToggleBtn from './ToggleBtn';

//image source
import simpleLogo from '../resource/image/simple_logo.png';

function EditorNavigation(props) {
    return (
        <div className="EditorNav">
            <Container>
                <Row xs="5" className="marginTop" style={{width: "1920px"}}>
                    <Col xs="1">
                        <a href="/home"><img src={simpleLogo} style={{marginTop:"3px 0px 0px 30px", width:'25px'}}></img></a>
                    </Col>
                    <Col xs="2">
                        <p className="fileName_font">{ props.fileName }</p>
                    </Col>
                    <Col xs="3" style={{width: "200px", margin: "0px 150px 0px -100px"}}>
                        {/*Button list*/}
                        <Button variant="outline-success" className="buttonMargin"><BiUndo/></Button>{' '}
                        <Button variant="outline-success" className="buttonMargin"><BiRedo/></Button>{' '}
                        <Button id="SAVE_btn" variant="outline-success" className="buttonMargin"><BiSave/></Button>{' '}
                    </Col>
                    <Col style={{width: "600px", marginLeft: "-100px"}}>
                        <ToggleBtn
                        btnColor="outline-success"
                        n1="2D 뷰어"
                        n2="1인칭 모드"
                        n3="3D 뷰어"
                        id1="2D_MODE_btn"
                        id2="PersonView_btn"
                        id3="3D_MODE_btn"
                        />
                        <ToggleBtn
                        btnColor="outline-success"
                        n1="Room"
                        n2="Item"
                        n3="Zoom"
                        id1="ROOM_EDIT_MODE_btn"
                        id2="ITEM_EDIT_MODE_btn"
                        id3="ZOOM_MODE_btn"
                        />
                    </Col>
                    <Col>
                        <Button id ="Export_btn" variant="success" style={{position: 'absolute', right: 0, marginRight: "30px"}}><BiScan/> 렌더링 하기</Button>{' '}
                        <Button id="Camera_Info_btn" style={{ width: "240px", display: "none"}}>Get Camera Info</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default EditorNavigation;