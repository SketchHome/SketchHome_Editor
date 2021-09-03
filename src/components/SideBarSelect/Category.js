import React, { useState } from 'react';
import { Link } from "react-router-dom";

//source
import { SidebarList } from '../SampleData/SidebarList';

//인테리어 tab - 가구 선택 카테고리
function Category() {
    return(
        <div className="scroll">
        <p 
        style={{margin: "40px 0px 20px 40px", fontFamily: "NanumSquare_acR", fontSize: "14px", color: "#A4A4A4"}}>
            ※ 현재 카테고리는 준비 중입니다.
        </p>
        {SidebarList.map((item, index) => {
            return (
                <li key={index} className={item.cName}>
                    <Link to={item.path}>
                    <span>{item.title}</span>
                    </Link>
                </li>
            );
        })}
        </div>
    );
}

export default Category;