import React from "react";
import floor_path_list from "../texture/floor_path_list.json";

import "./FloorList.css"

const FloorList = () => {
    return (
        <div>
            floor list
            <div className="floor_table">
                <table>
                    <tbody>
                        {
                            floor_path_list.path.map(path =>
                                <tr key={path.split("/").pop()}>
                                    <td> {path.split("/").pop().split("_").pop()}</td>
                                    <td><button className="Add_floor_btn" item_name={path.split("/").pop()} item_path={path}>add</button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FloorList;