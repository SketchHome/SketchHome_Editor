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

        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className="nav-menu-items" onClick={showSidebar}>
                <li className="navbar-toggle">
                <BsCaretLeftFill 
                style={{marginTop: "20px", marginLeft: "10px", fontSize: "30px"}}
                color="#51751B"/>
                </li>
                {/*push list (Data)*/}
                {SidebarList.map((item, index) => {
                    return (
                        <li key={index} className={item.cName}>
                            <Link to={item.path}>
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav> 
        </IconContext.Provider>
        </>
    );
}

export default Sidebar;