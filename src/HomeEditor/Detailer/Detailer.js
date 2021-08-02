import React from "react";

import ItemList from "./ItemList";

const Detailer = () => {
    return (
        <div style={{fontFamily:"NanumSquare_acR", overflow:"scroll", height:"90vh"}}>
            <div>
                <div style={{visibility:"hidden"}}><span id="mode_name"></span></div>
                <button id="2D_MODE_btn" className="smallBtn">2D MODE</button>
                <button id="3D_MODE_btn" className="smallBtn">3D MODE</button>
                <br />
                <button id="PersonView_btn" className="bigBtn">Person View MODE</button>
                <br />
                <button id="EDIT_MODE_btn" className="smallBtn">EDIT MODE</button>
                <button id="ZOOM_MODE_btn" className="smallBtn">ZOOM MODE</button>
                <br />
                <button id="Camera_Info_btn" className="bigBtn">Get Camera Info</button>
                <br />
                <button id="Export_btn" className="bigBtn">Export</button>
            </div>
            <br />
            <div>
                <div style={{visibility:"hidden"}}>target: <span id="target_name"></span></div>
                <button id="REMOVE_btn" className="smallBtn">REMOVE</button>
                <br />
                <button id="ROTATE_H_btn" className="smallBtn">ROTATE(H)</button>
                <button id="ROTATE_V_btn" className="smallBtn">ROTATE(V)</button>
            </div>
            <br />
            <div>
                <p style={{fontFamily: "NanumSquare_acB", fontSize: "18px"}}>방 크기 편집</p>
                <table>
                    <tbody>
                        <tr>
                            <td>넓이: </td>
                            <td><input id="resize_width" className="tinybar" type="range" step="0.1" min="3" max="20" defaultValue="11" /></td>
                        </tr>
                        <tr>
                            <td>높이: </td>
                            <td><input id="resize_height" className="tinybar" type="range" step="0.1" min="3" max="20" defaultValue="7" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br/>
            <div>
                <p style={{fontFamily: "NanumSquare_acB", fontSize: "18px"}}>사물 크기 조정</p>
                <table>
                    <tbody>
                        <tr>
                            <td>size: </td>
                            <td><input id="resize_item" className="tinybar" type="range" step="0.1" min="3" max="20" defaultValue="11" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br />
            <ItemList />
            <br />
            <div>
                <p style={{fontFamily: "NanumSquare_acB", fontSize: "18px"}}>문/창문 편집</p>
                <table>
                    <tbody>
                        <tr>
                            <td>문</td>
                            <td><button id="Add_door_btn" item_name="window" className="tinyBtn">add</button></td>
                        </tr>
                        <tr>
                            <td>창문</td>
                            <td><button id="Add_window_btn" item_name="door" className="tinyBtn">add</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br />
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>바닥 색상:</td>
                            <td>
                                <input type="radio" id="floor_color_1" name="floor_color" value="#e6e6e6" defaultChecked /><label style={{ "backgroundColor": "#e6e6e6", "color": "#e6e6e6" }} htmlFor="floor_color_1">clr</label>
                                <input type="radio" id="floor_color_2" name="floor_color" value="#ffeebb" /><label style={{ "backgroundColor": "#ffeebb", "color": "#ffeebb" }} htmlFor="floor_color_2">clr</label>
                                <input type="radio" id="floor_color_3" name="floor_color" value="#f8dc81" /><label style={{ "backgroundColor": "#f8dc81", "color": "#f8dc81" }} htmlFor="floor_color_3">clr</label>
                                <input type="radio" id="floor_color_4" name="floor_color" value="#008891" /><label style={{ "backgroundColor": "#008891", "color": "#008891" }} htmlFor="floor_color_4">clr</label>
                                <input type="radio" id="floor_color_5" name="floor_color" value="#a9294f" /><label style={{ "backgroundColor": "#a9294f", "color": "#a9294f" }} htmlFor="floor_color_5">clr</label>
                            </td>
                        </tr>
                        <tr>
                            <td>벽 색상:</td>
                            <td>
                                <input type="radio" id="wall_color_1" name="wall_color" value="#c5a880" defaultChecked /><label style={{ "backgroundColor": "#c5a880", "color": "#c5a880" }} htmlFor="wall_color_1">clr</label>
                                <input type="radio" id="wall_color_2" name="wall_color" value="#f88f01" /><label style={{ "backgroundColor": "#f88f01", "color": "#f88f01" }} htmlFor="wall_color_2">clr</label>
                                <input type="radio" id="wall_color_3" name="wall_color" value="#48426d" /><label style={{ "backgroundColor": "#48426d", "color": "#48426d" }} htmlFor="wall_color_3">clr</label>
                                <input type="radio" id="wall_color_4" name="wall_color" value="#487e95" /><label style={{ "backgroundColor": "#487e95", "color": "#487e95" }} htmlFor="wall_color_4">clr</label>
                                <input type="radio" id="wall_color_5" name="wall_color" value="#e9b0df" /><label style={{ "backgroundColor": "#e9b0df", "color": "#e9b0df" }} htmlFor="wall_color_5">clr</label>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Detailer;