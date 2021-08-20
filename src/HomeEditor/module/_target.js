import { showRoomInfo } from "./_common";
import { removeDragTarget } from "./_drag"

export const setMouse = (event, width, height, mouse) => {
    const canvas_position = event.target.getBoundingClientRect()
    mouse.x = ((event.clientX - canvas_position.left)/ width) * 2 - 1;
    mouse.y = - ((event.clientY - canvas_position.top) / height) * 2 + 1;
};

export const setTarget = (intersects, target, drag_target, edit_mode, rooms) => {
    if (intersects.length > 0) {
        if (target.length === 0) {
            addTarget(target, intersects[0].object, edit_mode, rooms);
        }
        else {
            const temp_target = intersects[0].object;
            switch (edit_mode) {
                case 'room':
                    if ((target[0].object.name !== temp_target.name) || (target[0].object.name !== temp_target.parent.room_name)) {
                    // if (target[0].object.name !== temp_target.parent.room_name) {
                        removeTarget(target);
                        removeDragTarget(drag_target);
                        addTarget(target, intersects[0].object, edit_mode, rooms);
                        showRoomInfo(target[0].object);
                    }
                    break
                case 'item':
                    if (target[0].object.uuid !== temp_target.uuid) {
                        removeTarget(target);
                        removeDragTarget(drag_target);
                        addTarget(target, intersects[0].object, edit_mode, rooms);
                    }
                    break
                default:
                    break
            }
        }
    }
    else if (intersects.length === 0) {
        removeTarget(target);
        removeDragTarget(drag_target);
        document.getElementById("target_name").innerHTML = '';
    }
};

const addTarget = (target, object, edit_mode, rooms) => {
    switch (edit_mode) {
        case 'room':
            addTargetRoom(target, object, rooms);
            break
        case 'item':
            addTargetItem(target, object);
            break
        default:
            break
    }
}

const addTargetRoom = (target, object, rooms) => {
    if(object.name === "floor"){
        rooms.children.forEach(room => {
            if (room.name === object.parent.room_name) {
                target.push({ object: room })
                document.getElementById("target_name").innerHTML = room.name;
                showRoomInfo(room);
            }
        });
    }
    else{
        target.push({ object: object })
        document.getElementById("target_name").innerHTML = object.name;
        showRoomInfo(object.parent);
    }
}

const addTargetItem = (target, object) => {
    target.push({ object: object });
    document.getElementById("target_name").innerHTML = object.name;
}

const removeTarget = (target) => {
    // const temp_target = target.pop();
    target.pop();
}