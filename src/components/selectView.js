import React, {useState} from 'react';

//components - pages
import SetRoom from './clickBtn'; 
import SetCategory from './SideBarSelect/Category';
//import SetFurniture -Detailer에서 아이템 추가하는 거 가져와야 함 

function selectView(props){

    const [room, setRoom] = useState("");
    const [category, setCate] = useState("none");
    const [furniture, setFur] = useState("none");

    //check mode => prevent callback error
    var isChange = 0;

    const changePage = (id) => {

        if(isChange != id) {
            isChange = id;
            
            setTimeout(() => {
                if(id == 1) {
                    //room view
                    setRoom("");
                    setCate("none");
                    setFur("none");
                }
                else if(id == 2) {
                    //category view
                    setRoom("none");
                    setCate("");
                    setFur("none");
                }
                else if(id == 3) {
                    //funriture view
                    setRoom("none");
                    setCate("none");
                    setFur("");
                }
            }, 100);
        }
    }

    return(
        <div style={{width: "100%", height: "100%"}}>
            {changePage(props.pageId)}
            <div style={{display : room}}>
                {props.roomComponent}
            </div>
            <div style={{display : category}}>
                {props.categoryComponent}
            </div>
            <div className="scroll" style={{display : furniture, margin: "40px 0px 20px 40px", height: "1000px"}}>
                {props.furnitureComponent}
            </div>
        </div>
    );
}

export default selectView;