import React, { useState } from 'react';
import { Link } from "react-router-dom";

//source
import { SidebarList } from '../SampleData/SidebarList';

//인테리어 tab - 가구 선택 카테고리
function Category() {
    return(
        <>
        {SidebarList.map((item, index) => {
            return (
                <li key={index} className={item.cName}>
                    <Link to={item.path}>
                    <span>{item.title}</span>
                    </Link>
                </li>
            );
        })}
        </>
    );
}

export default Category;