import { setMouse, setTarget } from "./_target"
import { setDragTarget, relocateDragTarget } from "./_drag";
import { set2DMODE, set3DMODE, setZoomMode, setDragMode, setPersonViewMode } from "./_mode";
import { changeFloorColor, changeWallColor, removeObject, resizeRoom, rotateObjectHorizon, rotateObjectVertical, hexToRgb, resizeItem, exportRoom } from "./_common";
import { addDoor, addLoadObj, addWindow } from "./_addObject"

// import * as THREE from "three";

export const setKeyboardEvent = (controls, camera, room) => {

    window.addEventListener("keydown", (event) => {
        var keycode = event.keyCode;

        if (keycode === 87) {
            const distance = 0.5;
            camera.translateZ(-distance);
            camera.position.setY(1.3);
        }
    });
    // const moveCamera = async (distance) => {
    //     for (let i = 0; i < 7; i++) {
    //         camera.translateX(distance);
    //         // camera.translateY(distance);
    //         await sleep(70);
    //     }
    // }

    // const sleep = (ms) => {
    //     return new Promise((resolve) => {
    //         setTimeout(resolve, ms);
    //     });
    // }   
    // function onDocumentKeyDown(event) {
    //     var delta = 0.2;
    //     event = event || window.event;
    //     var keycode = event.keyCode;
    //     switch (keycode) {
    //         case 87:
    //             console.log(camera.position)
    //             // camera.position.x = camera.position.x - delta;
    //             break;
    //         case 65:
    //             camera.position.z = camera.position.z - delta;
    //             break;
    //         case 83: 
    //             camera.position.x = camera.position.x + delta;
    //             break;
    //         case 68:
    //             camera.position.z = camera.position.z + delta;
    //             break;
    //         default:
    //             break;
    //     }
    //     document.addEventListener('keyup', onDocumentKeyUp, false);
    // }
    // function onDocumentKeyUp(event) {
    //     document.removeEventListener('keydown', onDocumentKeyDown, false);
    // }
}

export const setMouseEvent = (width, height,
    mouse, camera, scene, raycaster,
    target, drag_target, dragControls, room) => {

    // normal click event - set target 		
    window.addEventListener("mousedown", (event) => {
        if (event.target.tagName !== "CANVAS") return;
        setMouse(event, width, height, mouse);

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);
        setTarget(intersects, target, drag_target);
    }, false);

    // special click event - set drag target 		
    window.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        if (event.target.tagName !== "CANVAS") return;
        setMouse(event, width, height, mouse);

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);
        setDragTarget(intersects, target, drag_target);
    }, false);

    // let current_postion;
    dragControls.addEventListener("dragstart", (event) => {
        console.log("drag start");
        dragControls.enabled = true;
        // current_postion = event.object.position;
    });

    dragControls.addEventListener("drag", (event) => {
        if (drag_target.length === 0) {
            dragControls.enabled = false;
            return;
        }

        relocateDragTarget(event.object, room.view_mode);
    });

    dragControls.addEventListener("dragend", (event) => {
        console.log("drag end");
        dragControls.enabled = false;
    });

};

export const setButtonEvent = (camera, controls, scene, target, drag_target, room) => {
    document.getElementById("2D_MODE_btn").addEventListener("click", () => {
        room.view_mode = 2;
        room.is_person_view_mode = false;
        set2DMODE(camera, controls, room);
        document.getElementById("mode_name").innerHTML = "view";
    });

    document.getElementById("3D_MODE_btn").addEventListener("click", () => {
        room.view_mode = 3;
        room.is_person_view_mode = false;
        set3DMODE(camera, controls, room);
        document.getElementById("mode_name").innerHTML = "view";
    });

    document.getElementById("PersonView_btn").addEventListener("click", () => {
        room.view_mode = 3;
        room.is_person_view_mode = true;
        setPersonViewMode(camera, controls, room);
        document.getElementById("mode_name").innerHTML = "person view - use your keyboard(W, A, S, D)!!";
    })

    document.getElementById("EDIT_MODE_btn").addEventListener("click", () => {
        setDragMode(controls);
        document.getElementById("mode_name").innerHTML = "edit";
    });

    document.getElementById("ZOOM_MODE_btn").addEventListener("click", () => {
        setZoomMode(controls, room.view_mode);
        document.getElementById("mode_name").innerHTML = "view";
    });

    document.getElementById("REMOVE_btn").addEventListener("click", () => {
        if (target.length === 0) return;

        removeObject(scene, target, drag_target);
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

    // 나중에 분리 필요
    const item_size_info = {
        "sofa": { "x": 0.001, "y": 0.001, "z": 0.001 },
    };
    const elements = document.getElementsByClassName("Add_item_btn");
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", (e) => {
            const item_name = e.target.getAttribute("item_name");
            const item_path = e.target.getAttribute("item_path") + "/";
            const item_size = item_size_info["sofa"];
            const item_position = { "x": 0, "y": 0, "z": 0 };
            const item_id = "item";

            addLoadObj(room, item_name, item_path, item_size, item_position, item_id, room.view_mode);
        }, false);
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

        if (isNaN(width) || isNaN(height)) return;
        resizeRoom(room, width, height);
    });

    document.getElementById("resize_height").addEventListener("input", () => {
        const width = parseFloat(document.getElementById("resize_width").value);
        const height = parseFloat(document.getElementById("resize_height").value);

        if (isNaN(width) || isNaN(height)) return;
        resizeRoom(room, width, height);
    });

    document.getElementById("resize_item").addEventListener("input", () => {
        const size = parseFloat(document.getElementById("resize_item").value);

        if (isNaN(size) || target.length === 0) return;
        resizeItem(target[0].object, size);
    });
}