import React from "react";
import item_path_list from "../Item/item_path_list.json";

import "./ItemList.css"

const ItemList = () => {
    return (
        <div>
            <p style={{fontFamily: "NanumSquare_acB", fontSize: "18px"}}>가구 목록</p>
            <div className="item_table">
                <table>
                    <tbody>
                        {
                            item_path_list.path.map(path =>
                                <tr key={path.split("/").pop()}>
                                    <td>sofa {path.split("/").pop()}</td>
                                    <td><button className="Add_item_btn" item_name={path.split("/").pop()} item_path={path} className="tinyBtn">add</button></td>
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