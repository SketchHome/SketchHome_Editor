import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../resource/image/sketchhome_logo_origin.png';
import { BsFillBookmarkFill } from "react-icons/bs";
import { BsFillBellFill } from "react-icons/bs";
import { BsFillBagFill } from "react-icons/bs";
import './index.css'
import KakaoLogin from './Login/SocialLogin';

function Navigation() {
    return (
        <div className="Navigation" style={{fontFamily: "NanumSquare_acR"}}>
            <br />
            <Navbar bg="light" variant="light" style={{marginTop: '-25px'}}> 
                <Navbar.Brand href="/home"><img src={logo} style={{marginLeft:'30px', width:'120px'}}></img></Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="home">홈</Nav.Link>
                <p style={{margin: "7.5px", marginRight:"-5px", color:"#A4A4A4"}}>|</p>
                <Nav.Link href="editor" style={{marginLeft:'15px'}}>홈에디터</Nav.Link>
                <p style={{margin: "7.5px", marginRight:"-5px", color:"#A4A4A4"}}>|</p>
                <Nav.Link href="recommand" style={{marginLeft:'15px'}}>공간 추천</Nav.Link>
                <p style={{margin: "7.5px", marginRight:"-5px", color:"#A4A4A4"}}>|</p>
                <Nav.Link href="connect" style={{marginLeft:'15px'}}>고객센터</Nav.Link>
                </Nav>
                
                {/*Kakao social Login function btn*/}
                <KakaoLogin/>
                
                {/*
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-primary" style={{marginLeft:'10px'}}>Search</Button>
                    <BsFillBookmarkFill size='20' style={{marginLeft:'10px'}}></BsFillBookmarkFill>
                    <BsFillBellFill size='20' style={{marginLeft:'10px'}}></BsFillBellFill>
                    <BsFillBagFill size='20' style={{marginLeft:'10px'}}></BsFillBagFill>
                </Form>
                */}
            </Navbar>

        </div>
    );
}

export default Navigation;