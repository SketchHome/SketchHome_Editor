import React, { useState } from 'react';
import { Link } from "react-router-dom";

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
import { BsCaretRightFill } from "react-icons/bs";
import { BsCaretLeftFill } from "react-icons/bs";
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

//style
import './index.css'

//source
import { SidebarList } from './SidebarList';


function Sidebar() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
        <IconContext.Provider value={{ color: "black"}}>

        {/*toggle Sidebar*/}
        <div className="toggleBtn">
            {/*<Link to="#" className="menu-bars"></Link>*/}
            <BsCaretRightFill style={{marginTop: "20px", marginLeft: "10px", fontSize: "30px"}} color="#51751B" onClick={showSidebar} />
        </div>

        {/*test 할때만 toggle unlock :
        className={sidebar ? 'nav-menu active' : 'nav-menu'} 코드 들어가야함*/}
        <nav className='nav-menu active'>
            <ul className="nav-menu-items" onClick={showSidebar}>
                <li className="navbar-toggle">
                    {/*선택 카테고리*/}
                    <Container className="category-list">
                        <Row>
                            <Col></Col>
                            <Col></Col>
                            <Col></Col>
                        </Row>
                    </Container>
                    </li>
                    {SidebarList.map((item, index) => {
                        {/*인테리어 tab - 가구 선택 카테고리*/}
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        );
                    })}
                    <div style={{right: "0", position: "absolute", marginRight: "20px"}}>
                    <BsCaretLeftFill 
                    style={{marginRight: "10px", fontSize: "30px"}}
                    color="#51751B"/>
                    </div>
            </ul>
        </nav> 
        </IconContext.Provider>
        </>
    );
}

export default Sidebar;