import { setMouse, setTarget } from "./_target"
import { setDragTarget, relocateDragTarget } from "./_drag";
import { set2DMODE, set3DMODE, setZoomMode, setDragMode, setPersonViewMode } from "./_mode";
import { changeFloorColor, changeWallColor, changeFloorTexture, removeItem, resizeRoom, rotateObjectHorizon, rotateObjectVertical, hexToRgb, resizeItem, exportRoom, changeLightIntensity, setLightPositionX, setLightPositionY, setLightPositionZ, removeCeiling, changeWallTexture, resizeWallTextureModeChange, removeRoom, changeItemRoomGroup } from "./_common";
import { addCeiling, addDoor, addLoadObj, addWindow, addRoom } from "./_addObject"
import { saveStatus } from "./_save"
import { contextMenu, removeContextMenu } from "./_contextMenu";

export const setKeyboardEvent = (viewControls, controls, raycaster, camera, scene, room) => {

    window.addEventListener("keydown", (event) => {
        const distance = 0.075;

        let eventCode = event.code;

        if(viewControls.isLocked === true){
            switch (eventCode){
                case "KeyW" :
                    viewControls.moveForward(distance);
                    break;
                case "KeyS" :
                    viewControls.moveForward(-distance);
                    break;
                case "KeyA" :
                    viewControls.moveRight(-distance);
                    break;
                case "KeyD" :
                    viewControls.moveRight(distance);
                    break;
                case "Escape" :
                    viewControls.isLocked = false;
                    break;
                default :
                    break;
            }
        }

        if(viewControls.isLocked === false && eventCode === "KeyR"){ //restart
            viewControls.lock();
        }
    });
}

export const setMouseEvent = (width, height,
    mouse, viewControls, camera, scene, raycaster,
    target, drag_target, dragControls, room, context_target) => {

    // normal click event - set target 		
    // window.addEventListener("mousedown", (event) => {
    //     if (viewControls.isLocked === true) return;
    //     if (event.target.tagName !== "CANVAS") return;
    //     if (room.is_edit_mode !== true) return;
    //     setMouse(event, width, height, mouse);

    //     raycaster.setFromCamera(mouse, camera);
    //     let intersects = raycaster.intersectObjects(scene.children, true);
    //     intersects = intersects.filter(value => {
    //         return value.object.name !== "grid"
    //     })

    //     setTarget(intersects, target, drag_target, room.edit_mode, room.view_mode);
    // }, false);

    // click event
    window.addEventListener("click", (event) => {
        if (viewControls.isLocked === true) return;
        if (event.target.tagName !== "CANVAS") return;
        if (room.is_edit_mode !== true) return;
        setMouse(event, width, height, mouse);

        raycaster.setFromCamera(mouse, camera);
        let intersects = raycaster.intersectObjects(scene.children, true);
        intersects = intersects.filter(value => {
            return value.object.name !== "grid"
        })

        setTarget(intersects, target, drag_target, room.edit_mode, room);
        contextMenu(target, context_target, room.edit_mode, room.view_mode, event, drag_target);
    }, false);

    // special click event - set drag target 		
    window.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        if (event.target.tagName !== "CANVAS") return;
        if (room.is_edit_mode !== true) return;
        setMouse(event, width, height, mouse);

        raycaster.setFromCamera(mouse, camera);
        let intersects = raycaster.intersectObjects(scene.children, true);
        intersects = intersects.filter(value => {
            return value.object.name !== "grid"
        })
        setDragTarget(intersects, target, drag_target, room.edit_mode, room.view_mode);
        removeContextMenu(context_target);
    }, false);

    // let current_postion;
    dragControls.addEventListener("dragstart", () => {
        console.log("drag start");
        dragControls.enabled = true;
        // current_postion = event.object.position;
    });

    dragControls.addEventListener("drag", (event) => {
        relocateDragTarget(event.object, room.view_mode);
    });

    dragControls.addEventListener("dragend", () => {
        if (room.edit_mode === 'item') {
            changeItemRoomGroup(target[0].object.parent, room);
        }
        console.log("drag end");
        dragControls.enabled = false;
    });

};

export const setButtonEvent = (camera, viewControls, controls, mapControls, scene, target, drag_target, room, light, context_target) => {

    document.getElementById("2D_MODE_btn").addEventListener("click", () => {
        document.getElementById("ceiling_visibility").innerHTML = "Invisible";
        room.view_mode = 2;
        room.is_person_view_mode = false;
        room.is_edit_mode = false;
        room.is_zoom_mode = true;
        if (room.children.length > 0)
            room.children.forEach(_room => {
                set2DMODE(mapControls, controls, _room);
                removeCeiling(_room);
            });
        document.getElementById("mode_name").innerHTML = "view";
        scene.children.forEach((group) => {
            if (group.name.split("_")[1] === "grid") group.children[0].visible = true;
        });
    });

    document.getElementById("3D_MODE_btn").addEventListener("click", () => {        
        document.getElementById("ceiling_visibility").innerHTML = "Invisible";

        room.view_mode = 3;
        room.is_person_view_mode = false;
        room.is_edit_mode = false;
        room.is_zoom_mode = true;
        if (room.children.length > 0)
            room.children.forEach(_room => {
                set3DMODE(mapControls, controls, _room);
                removeCeiling(_room);
                resizeWallTextureModeChange(_room);
            });
        document.getElementById("mode_name").innerHTML = "view";
        scene.children.forEach((group) => {
            if (group.name.split("_")[1] === "grid") group.children[0].visible = false;
        });
        removeContextMenu(context_target);
    });

    document.getElementById("PersonView_btn").addEventListener("click", () => {
        document.getElementById("ceiling_visibility").innerHTML = "Visible";
        
        room.view_mode = 3;
        room.is_person_view_mode = true;
        room.is_edit_mode = false;
        room.is_zoom_mode = false;

        if (room.children.length > 0)
            room.children.forEach(_room => {
                setPersonViewMode(viewControls, mapControls, controls, _room);
                addCeiling(_room);
                resizeWallTextureModeChange(_room);
            });
      
        document.getElementById("mode_name").innerHTML = "person view - use your keyboard(W, A, S, D)!!";
        scene.children.forEach((group) => {
            if (group.name.split("_")[1] === "grid") group.children[0].visible = false;
        });
        removeContextMenu(context_target);
    })

    document.getElementById("ROOM_EDIT_MODE_btn").addEventListener("click", () => {
        room.is_person_view_mode = false;
        room.edit_mode = 'room';
        room.is_edit_mode = true;
        room.is_zoom_mode = false;
        setDragMode(controls, mapControls);
        document.getElementById("mode_name").innerHTML = "room edit";
    });

    document.getElementById("ITEM_EDIT_MODE_btn").addEventListener("click", () => {
        room.is_person_view_mode = false;
        room.edit_mode = 'item';
        room.is_edit_mode = true;
        room.is_zoom_mode = false;
        setDragMode(controls, mapControls);
        document.getElementById("mode_name").innerHTML = "item edit";
    });


    document.getElementById("ZOOM_MODE_btn").addEventListener("click", () => {
        room.is_person_view_mode = false;
        setZoomMode(controls, mapControls, room.view_mode);
        document.getElementById("mode_name").innerHTML = "view";
    });

    document.getElementById("REMOVE_btn").addEventListener("click", () => {
        if (target.length === 0) return;
        if (room.is_edit_mode === false) return;

        if (room.edit_mode === 'room') removeRoom(target, drag_target);
        if (room.edit_mode === 'item') removeItem(target, drag_target);
        document.getElementById("target_name").innerHTML = "";
    }, false);

    document.getElementById("ROTATE_H_btn").addEventListener("click", () => {
        if (target.length === 0) return;

        rotateObjectHorizon(target);
    });

    document.getElementById("ROTATE_V_btn").addEventListener("click", () => {
        if (target.length === 0) return;

        rotateObjectVertical(target);
    });

    document.getElementById("Add_Room_btn").addEventListener("click", () => {
        if (room.is_edit_mode) {
            const default_wall = [['top', 'horizon'], ['bottom', 'horizon'], ["right", 'vertical'], ["left", 'vertical']];
            const default_room = {
                    "id": "room_3312",
                    "type": "square",
                    "position": {"x": 8, "y": 0, "z": 2},
                    "size": {"x": 5, "y": 3, "z": 5},
                    "wall": default_wall.map((info, i) => {return {"id": `wall_${i}`, "type": info[1], "direction": info[0], "door":[], "window": []}}),
                    "item": []
                }

			addRoom(room, default_room, room.view_mode);
        }
    });

    document.getElementById("Add_door_btn").addEventListener("click", () => {
        if (target.length === 0) return;
        if (target[0].object.name.split("_")[0] !== "wall") return;

        const wall = target[0].object;
        const door_id = "door_3021";
        const door_size = { "x": 1.5, "y": 2, "z": 0.3 };
        const door_position = { "x": 0 };
        addDoor(wall.parent, door_id, door_size, door_position, wall.wall_type, wall.position, room.view_mode);
    });

    document.getElementById("Add_window_btn").addEventListener("click", () => {
        if (target.length === 0) return;
        if (target[0].object.name.split("_")[0] !== "wall") return;

        const wall = target[0].object;
        const window_id = "window_3021";
        const window_size = { "x": 2, "y": 2, "z": 0.3 };
        const window_position = { "x": 0, "y": 1.7 };
        addWindow(wall.parent, window_id, window_size, window_position, wall.wall_type, wall.position, room.view_mode);
    });

    document.getElementById("SAVE_btn").addEventListener("click", () => {
        saveStatus(room);
    });

    document.getElementById("Show_room_info").addEventListener("click", () => {
        console.log(room);
        room.children.forEach((room_group) => {
            console.log(room_group);
        })
    });

    document.getElementById("Show_light_info").addEventListener("click", () => {
        console.log(light);
    });
    document.getElementById("show_grid").addEventListener("click", () => {
        scene.children.forEach((group) => {
            if (group.name.split("_")[1] === "grid") {
                group.children[0].visible = !group.children[0].visible;
            }
        });
    })

    document.getElementById("show_ceiling").addEventListener("click", () => {
        room.children.forEach((room_group) => {
            addCeiling(room_group);
        });
        document.getElementById("ceiling_visibility").innerHTML = "Visible";
    });

    document.getElementById("hide_ceiling").addEventListener("click", () => {
        room.children.forEach((room_group) => {
            removeCeiling(room_group);
        })
        document.getElementById("ceiling_visibility").innerHTML = "Invisible";
    });

    // 나중에 분리 필요
    const item_size_info = {
        "sofa": { "x": 0.001, "y": 0.001, "z": 0.001 },
    };
    const elements = document.getElementsByClassName("Add_item_btn");
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", (e) => {
            if (room.edit_mode === 'room' && target.length !== 0) {
                
                const item_name = e.target.getAttribute("item_name");
                const item_path = e.target.getAttribute("item_path") + "/";
                const item_size = item_size_info["sofa"];
                const item_position = target[0].object.room_position;
                const item_id = "item";

                addLoadObj(target[0].object, item_name, item_path, item_size, item_position, item_id, room.view_mode);
            }
            
        }, false);
    }
  
    const floorElements = document.getElementsByClassName("Add_floor_btn");
    for(let i = 0; i < floorElements.length; i++){
        floorElements[i].addEventListener("click", (e) => {
            const item_path = e.target.getAttribute("item_path") + ".jpg";

            if(target.length === 0) return;
            
            changeFloorTexture(target[0].object, item_path);
        })
    }

    // change wall texture
    const wallTextures = document.getElementsByClassName("Add_wall_texture_btn");
    for (var i = 0; i < wallTextures.length; i++) {
        wallTextures[i].addEventListener("click", (e) => {
            const texture_path = e.target.getAttribute("texture_path");
            if (target.length !== 0) {
                changeWallTexture(target[0].object, texture_path);
            }
        });
    }

    // change floor color
    const floor_color_radios = document.getElementsByName("floor_color");
    for (let i = 0, length = floor_color_radios.length; i < length; i++) {
        floor_color_radios[i].onclick = () => {
            if (floor_color_radios[i].checked) {
                const color = floor_color_radios[i].value;
                changeFloorColor(room, color);
                if (target.length !== 0 && target[0].object.name.split("_")[0] === "floor") {
                    target[0].color = hexToRgb(color);
                }
            }
        }
    }

    // change wall color
    const wall_color_radios = document.getElementsByName("wall_color");
    for (let i = 0, length = wall_color_radios.length; i < length; i++) {
        wall_color_radios[i].onclick = () => {
            if (target.length !== 0 && wall_color_radios[i].checked) {
                if (target[0].object.name.split("_")[0] === "wall") {
                    const wall = target[0].object;
                    const color = wall_color_radios[i].value;
                    changeWallColor(wall, color);
                    target[0].color = hexToRgb(color);
                }
            }
        }
    }

    // get camera info
    document.getElementById("Camera_Info_btn").addEventListener("click", () => {
        const data = {
            'camera_position': {
                'x': camera.position.x,
                'y': camera.position.y,
                'z': camera.position.z,
            },
            'camera_rotation': {
                'x': camera.rotation.x,
                'y': camera.rotation.y,
                'z': camera.rotation.z,
            },
            'camera': camera
        }

        fetch('http://localhost:4000/get_camera_info', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'data': data })
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
            })
    });

    // get file
    document.getElementById("Export_btn").addEventListener("click", () => {
        console.log("export")
        exportRoom(room)
    });
}

export const setInputEvent = (room, target) => {
    document.getElementById("resize_width").addEventListener("input", () => {
        const width = parseFloat(document.getElementById("resize_width").value);
        const height = parseFloat(document.getElementById("resize_height").value);

        document.getElementById("room_width").innerHTML = width;

        if (isNaN(width) || isNaN(height)) return;
        if (target.length === 0) return;
        resizeRoom(target[0].object, width, height);
    });

    document.getElementById("resize_height").addEventListener("input", () => {
        const width = parseFloat(document.getElementById("resize_width").value);
        const height = parseFloat(document.getElementById("resize_height").value);

        document.getElementById("room_height").innerHTML = height;

        if (isNaN(width) || isNaN(height)) return;
        if (target.length === 0) return;
        resizeRoom(target[0].object, width, height);
    });

    document.getElementById("resize_item").addEventListener("input", () => {
        const size = parseFloat(document.getElementById("resize_item").value);

        if (isNaN(size) || target.length === 0) return;
        resizeItem(target[0].object, size);
    });
    document.getElementById("set_light_intensity").addEventListener("input", () => {
        const intensity = parseFloat(document.getElementById("set_light_intensity").value);

        if (isNaN(intensity)) return;
        changeLightIntensity(room.parent.children[0], intensity);
    });
    document.getElementById("set_light_positionx").addEventListener("input", () => {
        const positionX = parseInt(document.getElementById("set_light_positionx").value);

        if (isNaN(positionX)) return;
        setLightPositionX(room.parent.children[0], positionX);
    });
    document.getElementById("set_light_positiony").addEventListener("input", () => {
        const positionY = parseInt(document.getElementById("set_light_positiony").value);

        if (isNaN(positionY)) return;
        setLightPositionY(room.parent.children[0], positionY);
    });
    document.getElementById("set_light_positionz").addEventListener("input", () => {
        const positionZ = parseInt(document.getElementById("set_light_positionz").value);

        if (isNaN(positionZ)) return;
        setLightPositionZ(room.parent.children[0], positionZ);
    });

}