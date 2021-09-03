import React, { useState } from 'react';
import { Link } from "react-router-dom";

//bootstrap
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//icons
import { BsCaretRightFill } from "react-icons/bs";
import { BsCaretLeftFill } from "react-icons/bs";
import { IconContext } from 'react-icons';

//style
import './index.css'

//component
import SideBarDetail from './SideBarDetail';
import SelectBtn from './clickBtn';
import SetCategory from './SideBarSelect/Category';

//Select Component_click시 전환 페이지
import Category from './SideBarSelect/Category';
import Selectitem from './SideBarSelect/Selectitem';
import { propTypes } from 'react-bootstrap/esm/Image';

function Sidebar(props) {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    const [room, setRoom] = useState("");
    const [category, setCate] = useState("none");
    const [furniture, setFur] = useState("none");


    return (
        <>
        <IconContext.Provider value={{ color: "black"}}>
        <nav className={sidebar ? 'nav-menu' : 'nav-menu active'}>
            <ul className="nav-menu-items">
                {/*mode menu*/}
                <li className="navbar-toggle">
                    <SideBarDetail
                        btnColor="outline-success"
                        i1="yes"
                        i2="yes"
                        i3="yes"
                        id1="1" id2="2" id3="3"
                        n1={<div className="category-list">방 설정하기</div>}
                        n2={<div className="category-list">인테리어 하기</div>}
                        n3={<div className="category-list">가구 편집하기</div>}
                        border= "0px"

                        rooms={
                            <SelectBtn 
                            room={props.rooms}
                            showInfo={props.showInfos}
                            wallColor={props.wallColors}
                            wallList={props.wallLists}
                            floorColor={props.floorColors}
                            floorList={props.floorLists}
                            addWf={props.addWfs}
                            moveThing={props.moveThings}
                            ceiling={props.ceilings}
                            light={props.lights}
                        />
                        }
                        categorys={<SetCategory/>}
                        furnitures={props.Items}
                        />
                </li>
            </ul>
             {/*toggle Sidebar*/}
            <div className="toggleBtn">
                {/*<Link to="#" className="menu-bars"></Link>*/}
                <BsCaretRightFill style={{marginTop: "20px", marginLeft: "5px", marginRight: "5px", fontSize: "30px"}} color="#51751B" onClick={showSidebar} />
            </div>
        </nav> 
        
        </IconContext.Provider>
        </>
    );
}

export default Sidebar;