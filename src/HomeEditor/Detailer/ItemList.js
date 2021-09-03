import React from "react";
import item_path_list from "../Item/item_path_list.json";

import "./ItemList.css"

const ItemList = () => {
    return (
        <div>
            <b>가구 목록</b>
            <div className="item_table">
                <table>
                    <tbody>
                        {
                            item_path_list.path.map(path =>
                                <tr key={path.split("/").pop()}>
                                    <td style={{padding: "5px"}}>sofa {path.split("/").pop()}</td>
                                    <td style={{padding: "5px"}}><button className="Add_item_btn" item_name={path.split("/").pop()} item_path={path}>추가하기</button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ItemList;