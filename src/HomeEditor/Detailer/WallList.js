import React from "react";
import wall_path_list from "../texture/wall_path_list.json";

import "./WallList.css"

const WallList = () => {
    console.log(wall_path_list)
    return (
        <div>
            wall texture list
            <div className="wall_texture_table">
                <table>
                    <tbody>
                        {
                            wall_path_list.path.map(path => 
                                <tr key={path.split("/").pop()}>
                                    <td>{path.split("/").pop()}</td>
                                    <td><button className="Add_wall_texture_btn" texture_name={path.split("/").pop()} texture_path = {path}>add</button></td>
                                </tr>
                            )
                        }   
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default WallList;