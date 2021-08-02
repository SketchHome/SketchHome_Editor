import React, { Component } from "react";

import './TopMenu.css';

import logo from '../../image/logo.png';

/*
 * 위 컴포넌트는 상위 메뉴입니다. 
 */
class TopMenu extends Component {
    render() {
        return (
            <div className="TopMenu">
                <table>
                    <tbody>
                        <tr>
                            <td className="Section_1">
                                <img className="Logo" src={logo} alt="logo" />
                            </td>
                            <td className="Section_2">
                                <div className="Title">SketchHome</div>
                                <div className="Subtitle">내 집을 가장 내 집 답게 만드는 방법</div>
                            </td>
                            <td className="Section_3">
                                <div className="TopMenuItem" style={{ fontWeight: "bold" }}>에디터</div>
                                <div className="TopMenuItem">커뮤니티</div>
                                <div className="TopMenuItem">스토어</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="Hr"></div>
                {/* <div className="Section_1">
                    <div>logo</div>
                </div>
                <div className="Section_2">
                    <div className="Wrapper">
                        <div className="Title">SketchHome</div>
                        <div className="Subtitle">내 집을 가장 내 집 답게 만드는 방법</div>
                    </div>
                </div>
                <div className="Section_3">
                    <div className="TopMenuItem">에디터</div>
                    <div className="TopMenuItem">커뮤니티</div>
                    <div className="TopMenuItem">스토어</div>
                </div> */}
            </div>
        );
    }
}

export default TopMenu;
