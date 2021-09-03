import React from "react";

//wall & floor List
import { itemList_wall } from "../../components/SampleData/itemList_wall";
import { itemList_floor } from "../../components/SampleData/itemList_floor";
import ItemList from "./ItemList";

//component
import Selectitem from '../../components/SideBarSelect/Selectitem';

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
            {/** 
            <div>Show info</div>
            <button id="Show_room_info" style={{ width: "120px" }}>SHOW ROOM INFO</button>
            <button id="Show_light_info" style={{ width: "120px" }}>SHOW LIGHT INFO</button>
            
            <div><h5>그리드 설정</h5></div>
            <button id="show_grid" className="category-select-btns" style={{ width: "370px", backgroundColor: "#A8BA8D"}}>그리드 표시하기</button>
            */} 
        </div>
    );  
}

//물체 컨트롤 : 물체 삭제, 회전 (h, v)
const MoveThings = (props) => {
    return(
        <div style={{display: props.visible}}>
            <br/>
            <div><h5>대상 물체에 대해</h5> <span id="target_name"></span></div>
            <button id="REMOVE_btn" className="category-select-btns" style={{ width: "370px"}}>지우기</button>
            <br />
            <button id="ROTATE_H_btn" className="category-select-btns" style={{ width: "370px"}}>상하 회전하기(H)</button>
            <button id="ROTATE_V_btn" className="category-select-btns" style={{ width: "370px"}}>좌우 회전하기(V)</button>
        </div>
    );
}

//천장 설정 : 천장 ON/OFF
const Ceiling = (props) => {
    return (
        <div style={{display: props.visible}}>
            <div>천장 <span id="ceiling_visibility">Invisible</span></div>
            <button id="show_ceiling" className="category-select-btns" style={{ width: "370px", backgroundColor: "#A8BA8D"}}>천장 보이기</button>
            <button id="hide_ceiling" className="category-select-btns" style={{ width: "370px"}}>천장 없애기</button>
        </div>
    );
}

//room, door, window 설정 : 방 추가, 방 넓이 높이 조절, 문/창문 추가하기
const Room = (props) => {
    return(
        <div>
            <div>선택하고 있는 물체  <span id="target_name"></span></div> <br/>
            <button id="Add_Room_btn" className="category-select-btns" style={{ width: "370px" }}>방 추가하기</button>
            <br/>
            <div style={{display: props.visible}}>
            {/** 
            <div>Show info</div>
            <button id="Show_room_info" style={{ width: "120px" }}>SHOW ROOM INFO</button>
            <button id="Show_light_info" style={{ width: "120px" }}>SHOW LIGHT INFO</button>
            */}
            <button id="show_grid" className="category-select-btns" style={{ width: "370px", backgroundColor: "#A8BA8D"}}>그리드 표시하기</button>
        </div>
        <br/>
            <h5>방 사이즈</h5>
                <table>
                    <tbody>
                        <tr>
                            <td>넓이</td>
                            <td><input id="resize_width" style={{ width: "260px", height:"20px", marginLeft: "20px"}} type="range" step="0.1" min="3" max="20" defaultValue="11" /></td>
                            <td><span id="room_width">11</span> m</td>
                        </tr>
                        <tr>
                            <td>높이</td> 
                            <td><input id="resize_height" style={{ width: "260px", marginLeft: "20px", height:"20px" }} type="range" step="0.1" min="3" max="20" defaultValue="7" /></td>
                            <td><span id="room_height">7</span> m</td>
                        </tr>
                    </tbody>
                </table>
                <br/>
        </div>
    );
}

const AddWF = (props) => {
    return (
        <div>
            <div style={{color: "#A4A4A4"}}>※ 벽을 클릭한 뒤에, 추가하실 것을 눌러주세요.</div> <br/>
            <table>
                <tbody>
                    <tr>
                        <td><button id="Add_door_btn" item_name="window" className="category-select-btns" style={{ width: "370px", backgroundColor: "#A8BA8D"}}>문 추가하기</button></td>
                    </tr>
                    <tr>
                        <td><button id="Add_window_btn" item_name="door" className="category-select-btns" style={{ width: "370px", backgroundColor: "#A8BA8D"}}>창문 추가하기</button></td>
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
                    <td>바닥 색 선택</td>
                    <td>
                        <div className="ColorPicker">
                            <input type="radio" id="floor_color_1" name="floor_color" value="#e6e6e6" defaultChecked /><label style={{ "backgroundColor": "#e6e6e6", "color": "#e6e6e6" }} htmlFor="floor_color_1">clr</label>
                            <input type="radio" id="floor_color_2" name="floor_color" value="#ffeebb" /><label style={{ "backgroundColor": "#ffeebb", "color": "#ffeebb" }} htmlFor="floor_color_2">clr</label>
                            <input type="radio" id="floor_color_3" name="floor_color" value="#f8dc81" /><label style={{ "backgroundColor": "#f8dc81", "color": "#f8dc81" }} htmlFor="floor_color_3">clr</label>
                            <input type="radio" id="floor_color_4" name="floor_color" value="#008891" /><label style={{ "backgroundColor": "#008891", "color": "#008891" }} htmlFor="floor_color_4">clr</label>
                            <input type="radio" id="floor_color_5" name="floor_color" value="#a9294f" /><label style={{ "backgroundColor": "#a9294f", "color": "#a9294f" }} htmlFor="floor_color_5">clr</label>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <Selectitem Lists={itemList_floor}/> {/*texture 부분에 추가하기*/}
    </div>
    );  
}

const WallColor = (props) => {
   return (
    <div style={{width: "100%", height: "100%", marginBottom: "200px"}}>
    <table>
        <tbody>
            <tr>
                <td>벽지 색 선택</td>
                <td>
                <div className="ColorPicker">
                <input type="radio" id="wall_color_1" name="wall_color" value="#c5a880" defaultChecked /><label style={{ "backgroundColor": "#c5a880", "color": "#c5a880" }} htmlFor="wall_color_1">clr</label>
                    <input type="radio" id="wall_color_2" name="wall_color" value="#f88f01" /><label style={{ "backgroundColor": "#f88f01", "color": "#f88f01" }} htmlFor="wall_color_2">clr</label>
                    <input type="radio" id="wall_color_3" name="wall_color" value="#48426d" /><label style={{ "backgroundColor": "#48426d", "color": "#48426d" }} htmlFor="wall_color_3">clr</label>
                    <input type="radio" id="wall_color_4" name="wall_color" value="#487e95" /><label style={{ "backgroundColor": "#487e95", "color": "#487e95" }} htmlFor="wall_color_4">clr</label>
                    <input type="radio" id="wall_color_5" name="wall_color" value="#e9b0df" /><label style={{ "backgroundColor": "#e9b0df", "color": "#e9b0df" }} htmlFor="wall_color_5">clr</label>
                </div>
                </td>
            </tr>
        </tbody>
    </table>  
    <Selectitem Lists={itemList_wall}/> {/*texture 부분에 추가하기*/}
</div>
   );
}
//아이템 : 사이즈 변경
const Item = (props) => {
    return (
        <div style={{fontFamily: "NanumSquare_acR"}}>
             <div>
                <div style={{fontSize: "14px", color: "#A4A4A4"}}> 
                가구 크기 조절하기<br/>
                ※ 원하시는 가구를 선택 후에 크기를 조절할 수 있습니다.
                </div>
                <br/>
                <table>
                    <tbody>
                        <tr>
                            <td><b>크기 </b> </td>
                            <td><input id="resize_item" style={{ width: "260px", height: "20px", marginLeft: "20px" }} 
                            type="range" step="0.1" min="3" max="20" defaultValue="11" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br/>
            <ItemList/>
        </div>
    );
}

//조명 설정 : 포지션별 조명 설정하기
const Light = (props) => {
    return (
        <div style={{display: props.visible}}>
                <h5>조명 설정하기</h5> <br/>
                <table>
                    <tbody>
                        <tr>
                            <td>조명 밝기 </td>
                            <td><input type="range" style={{ width: "260px", marginLeft: "20px", height:"20px" }} id="set_light_intensity" step="0.1" min="0" max="1.5" defaultValue="0.7"></input></td>
                        </tr>
                        <br/>
                        <tr>
                            <td>조명 좌표 (X) </td>
                            <td><input type="number" style={{ width: "150px", marginLeft: "20px", height:"20px", borderRadius: "5px", borderColor: "#F2F2F2", borderWidth: "2px"}} id="set_light_positionx" step="1" min="0" max="300" defaultValue="0"></input></td>
                        </tr>
                        <tr>
                            <td>조명 좌표 (Y) </td>
                            <td><input type="number" style={{ width: "150px", marginLeft: "20px", height:"20px", borderRadius: "5px", borderColor: "#F2F2F2", borderWidth: "2px"}} id="set_light_positiony" step="1" min="3" max="300" defaultValue="3"></input></td>
                        </tr>
                        <tr>
                            <td>조명 좌표 (Z) </td>
                            <td><input type="number" style={{ width: "150px", marginLeft: "20px", height:"20px", borderRadius: "5px", borderColor: "#F2F2F2", borderWidth: "2px"}} id="set_light_positionz" step="1" min="0" max="300" defaultValue="0"></input></td>
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