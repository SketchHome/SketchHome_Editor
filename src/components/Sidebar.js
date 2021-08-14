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

//source
import { SidebarList } from './SidebarList';

//component
import ToggleBtn from './toggleBtn';
import SelectBtn from './clickBtn';
import SearchBar from './SearchBar';

//interior tab
function interior() {

}

function Sidebar() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
        <IconContext.Provider value={{ color: "black"}}>

        {/*test 할때만 toggle unlock :
        className={sidebar ? 'nav-menu active' : 'nav-menu'} 코드 들어가야함*/}
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className="nav-menu-items">
                {/*mode menu*/}
                <li className="navbar-toggle">
                    <ToggleBtn
                        btnColor="outline-success"
                        i1="yes"
                        i2="yes"
                        i3="yes"
                        n1={<div className="category-list">방 설정하기</div>}
                        n2={<div className="category-list">인테리어 하기</div>}
                        n3={<div className="category-list">가구 편집하기</div>}
                        border= "0px"
                        />
                </li>
                {/*room - select btn bar*/}
                <li className="category-select">
                    <SelectBtn/>
                </li>
                <div className="scroll">
                    <SearchBar/>
                    {/*인테리어 tab - 가구 선택 카테고리*/}
                    {/*SidebarList.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        );
                    })}
                    */}
                </div>
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