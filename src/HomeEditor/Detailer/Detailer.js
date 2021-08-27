import React from "react";

import ItemList from "./ItemList";
import FloorList from "./FloorList";
import WallList from "./WallList";

//시점 변경 : 2D, 3D, 1인칭 모드 (Move 완료)
const ViewMode = (props) => {
    return (
        <div style={{display: props.visible}}>
             {/*<div>mode: <span id="mode_name"></span></div>*/}
                <button id="2D_MODE_btn" style={{ width: "120px" }}>2D MODE</button>
                <button id="3D_MODE_btn" style={{ width: "120px" }}>3D MODE</button>
                <br />
                <button id="PersonView_btn" style={{ width: "240px" }}>Person View MODE</button>
                <br />
        </div>
    )
}

//편집 모드 설정 : 방 편집 모드, 아이템 편집 모드, 확대 축소 모드
const EditMode = (props) => {
    return (
        <div style={{display: props.visible}}>
            <button id="ROOM_EDIT_MODE_btn" style={{ width: "120px" }}>ROOM EDIT MODE</button>
                <button id="ITEM_EDIT_MODE_btn" style={{ width: "120px" }}>ITEM EDIT MODE</button>
                <br />
                <button id="ZOOM_MODE_btn" style={{ width: "240px" }}>ZOOM MODE</button>
                <br />
        </div>
    );
}

//저장, 정보 보여주기 등 동작 : 카메라 정보, 내보내기 버튼, 저장 버튼 (Move 완료)
const GetInfo = (props) => {
    return (
        <div style={{display: props.visible}}>
                <button id="Camera_Info_btn" style={{ width: "240px" }}>Get Camera Info</button>
                <br />
                <button id="Export_btn" style={{ width: "240px" }}>Export</button>
                <br />
                <button id="SAVE_btn" style={{ width: "240px" }}>save</button>
        </div>
    );
}

//조명, 방, 그리드 정보 보여주기 : 방/조명 정보 보여주기, 격자 무늬 ON/OFF
const ShowInfo = (props) => {
    return (
        <div style={{display: props.visible}}>
            {/* 
            <div>Show info</div>
            <button id="Show_room_info" style={{ width: "120px" }}>SHOW ROOM INFO</button>
            <button id="Show_light_info" style={{ width: "120px" }}>SHOW LIGHT INFO</button>
            */}
            <div>Toggle grid</div>
            <button id="show_grid" style={{ width: "120px" }}>TOGGLE GRID</button>
        </div>
    );  
}

//물체 컨트롤 : 물체 삭제, 회전 (h, v)
const MoveThings = (props) => {
    return(
        <div style={{display: props.visible}}>
            <div>target: <span id="target_name"></span></div>
            <button id="REMOVE_btn" style={{ width: "120px" }}>REMOVE</button>
            <br />
            <button id="ROTATE_H_btn" style={{ width: "120px" }}>ROTATE(H)</button>
            <button id="ROTATE_V_btn" style={{ width: "120px" }}>ROTATE(V)</button>
        </div>
    );
}

//천장 설정 : 천장 ON/OFF
const Ceiling = (props) => {
    return (
        <div style={{display: props.visible}}>
            <div>Ceiling : <span id="ceiling_visibility">Invisible</span></div>
            <button id="show_ceiling" style={{ width: "120px" }}>SHOW CEILING</button>
            <button id="hide_ceiling" style={{ width: "120px" }}>HIDE CEILING</button>
        </div>
    );
}

//room, door, window 설정 : 방 추가, 방 넓이 높이 조절, 문/창문 추가하기
const Room = (props) => {
    return(
        <div style={{display: props.visible}}>
            <button id="Add_Room_btn" style={{ width: "240px" }}>Add Room</button>
            room size
                <table>
                    <tbody>
                        <tr>
                            <td>width </td>
                            <td><input id="resize_width" style={{ width: "100px"}} type="range" step="0.1" min="3" max="20" defaultValue="11" /></td>
                            <td><span id="room_width">11</span></td>
                        </tr>
                        <tr>
                            <td>height </td> 
                            <td><input id="resize_height" style={{ width: "100px" }} type="range" step="0.1" min="3" max="20" defaultValue="7" /></td>
                            <td><span id="room_height">7</span></td>
                        </tr>
                    </tbody>
                </table>
        </div>
    );
}

const AddWF = (props) => {
    return (
        <div style={{display: props.visible}}>
            door, window list
            <table>
                <tbody>
                    <tr>
                        <td>door</td>
                        <td><button id="Add_door_btn" item_name="window">add</button></td>
                    </tr>
                    <tr>
                        <td>window</td>
                        <td><button id="Add_window_btn" item_name="door">add</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

//change floor and wall color : 벽지 바닥지 변경하기
const FWColor = (props) => {
    return (
        <div style={{display: props.visible}}>
        <table>
            <tbody>
                <tr>
                    <td>floor color:</td>
                    <td>
                        <input type="radio" id="floor_color_1" name="floor_color" value="#e6e6e6" defaultChecked /><label style={{ "backgroundColor": "#e6e6e6", "color": "#e6e6e6" }} htmlFor="floor_color_1">clr</label>
                        <input type="radio" id="floor_color_2" name="floor_color" value="#ffeebb" /><label style={{ "backgroundColor": "#ffeebb", "color": "#ffeebb" }} htmlFor="floor_color_2">clr</label>
                        <input type="radio" id="floor_color_3" name="floor_color" value="#f8dc81" /><label style={{ "backgroundColor": "#f8dc81", "color": "#f8dc81" }} htmlFor="floor_color_3">clr</label>
                        <input type="radio" id="floor_color_4" name="floor_color" value="#008891" /><label style={{ "backgroundColor": "#008891", "color": "#008891" }} htmlFor="floor_color_4">clr</label>
                        <input type="radio" id="floor_color_5" name="floor_color" value="#a9294f" /><label style={{ "backgroundColor": "#a9294f", "color": "#a9294f" }} htmlFor="floor_color_5">clr</label>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    );  
}

const WallColor = (props) => {
   return (
    <div style={{display: props.visible}}>
    <table>
        <tbody>
            <tr>
                <td>wall color:</td>
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
   );
}
//아이템 : 사이즈 변경
const Item = (props) => {
    return (
        <div style={{display: props.visible}}>
             <div>
                item size
                <table>
                    <tbody>
                        <tr>
                            <td>size: </td>
                            <td><input id="resize_item" style={{ width: "100px" }} type="range" step="0.1" min="3" max="20" defaultValue="11" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

//조명 설정 : 포지션별 조명 설정하기
const Light = (props) => {
    return (
        <div style={{display: props.visible}}>
                light
                <table>
                    <tbody>
                        <tr>
                            <td>light intensity : </td>
                            <td><input type="range" id="set_light_intensity" step="0.1" min="0" max="1.5" defaultValue="0.7"></input></td>
                        </tr>
                        <tr>
                            <td>light position X : </td>
                            <td><input type="number" id="set_light_positionx" step="1" min="0" max="300" defaultValue="0"></input></td>
                        </tr>
                        <tr>
                            <td>light position Y : </td>
                            <td><input type="number" id="set_light_positiony" step="1" min="3" max="300" defaultValue="3"></input></td>
                        </tr>
                        <tr>
                            <td>light position Z : </td>
                            <td><input type="number" id="set_light_positionz" step="1" min="0" max="300" defaultValue="0"></input></td>
                        </tr>
                    </tbody>
                </table>
            </div>
    );
}

export {ViewMode}; //시점 변경 : 2D, 3D, 1인칭 모드
export {EditMode}; //편집 모드 설정 : 방 편집 모드, 아이템 편집 모드, 확대 축소 모드

export {GetInfo}; //저장, 정보 보여주기 등 동작 : 카메라 정보, 내보내기 버튼, 저장 버튼
export {ShowInfo}; //조명, 방, 그리드 정보 보여주기 : 방/조명 정보 보여주기, 격자 무늬 ON/OFF

export {MoveThings}; //물체 컨트롤 : 물체 삭제, 회전 (h, v)
export {FWColor}; //change floor and wall color : 벽지 바닥지 변경하기
export {WallColor}; //벽지 색

export {Room}; //room, door, window 설정 : 방 추가, 방 넓이 높이 조절, 문/창문 추가하기
export {Light}; //조명 설정 : 포지션별 조명 설정하기
export {Item}; //아이템 : 사이즈 변경
export {Ceiling}; //천장 설정 : 천장 ON/OFF

export {AddWF}; //창문 문 추가


/*
export {itemList}; //아이템 목록
export {wallList}; //벽 목록
export {floorList}; //바닥 목록
*/