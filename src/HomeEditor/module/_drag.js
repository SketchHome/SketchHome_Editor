import { relocateObject } from "./_common";

export const setDragTarget = (intersects, target, drag_target, edit_mode) => {
    if (intersects.length === 0 || target.length === 0) return;
    switch (edit_mode) {
        case 'room':
            if (intersects[0].object.name === 'floor') {
                const temp_target = intersects[0].object.parent.parent;
                if (drag_target.length === 0 && target[0].object.name === temp_target.name) {
                    addDragRoomTarget(drag_target, temp_target);
                }
            }
            else if (intersects[0].object.name.split("_")[0] === "wall") {
                addDragRoomTarget(drag_target, intersects[0].object);
            }
            break;
        case 'item':
            if (drag_target.length === 0 && target[0].object.uuid === intersects[0].object.uuid) {
                addDragItemTarget(drag_target, intersects[0].object);
            }
            break;
        default:
            break;
    }
};

export const resizeWallByDrag = () => {

}

export const removeDragTarget = (target) => {
    target.pop();
};

const addDragRoomTarget = (drag_target, object) => {
    drag_target.push(object);
    document.getElementById("target_name").innerHTML = object.name + " (drag)";
}

const addDragItemTarget = (drag_target, object) => {
    switch (object.name.split("_")[0]) {
        case "window":
            drag_target.push(object);
            break;
        case "door":
            drag_target.push(object);
            break;
        case "load":
            drag_target.push(object.parent);
            // object.material.color.set("blue");
            break;
        default:
            break;
    }

    document.getElementById("target_name").innerHTML = object.name + " (drag)";
};

export const relocateDragTarget = (target, view_mode) => {
    if (view_mode === 2) {
        if (target.name === "group_item") {
            target.obj_position.x = target.position.x;
            target.obj_position.z = target.position.z;
        }
        else if (target.name.split("_")[0] === "window") {
            relocateWindow_2D(target);
        }
        else if (target.name.split("_")[0] === "door") {
            relocateDoor_2D(target);
        }
        else if (target.name.split("_")[0] === "wall"){
            relocateWall_2D(target);
        }
        else if (target.name.split("_")[1] === "room") {
            relocateRoom_2D(target);
        }
    }
    else if (view_mode === 3) {
        if (target.name === "group_item") {
            console.log("target position :", target.position);
            target.position.y = 0;
            target.obj_position.y = target.position.y;
            // target.obj_position.x = target.position.x;
            // target.obj_position.z = target.position.z;
        }
        else if (target.name.split("_")[0] === "window") {
            relocateWindow_3D(target);
        }
        else if (target.name.split("_")[0] === "door") {
            relocateDoor_3D(target);
        }
    }
}

const relocateRoom_2D = (target) => {
    
}

const relocateWall_2D = (target) => {
    let oppositeWallDir;
    let newWidth;

    switch(target.wall_direction){
        case "right" :
            oppositeWallDir = "left";
            break;
        case "left" :
            oppositeWallDir = "right";
            break;
        case "top" :
            oppositeWallDir = "bottom";
            break;
        case "bottom" :
            oppositeWallDir = "top";
            break;
    }

    target.parent.parent.children.forEach(obj => {
        if(obj.name.split("_")[1] === "wall"){
            if(obj.children[0].wall_direction === oppositeWallDir){ //obj.children[0] = wall
                if(oppositeWallDir === "left" || oppositeWallDir === "right"){
                    newWidth = Math.abs(target.position.x - obj.children[0].position.x);
                    if(target.parent.children.length > 1){ //target.parent = wall_group
                        target.parent.children.forEach(mesh => {
                            mesh.position.x = target.position.x;
                            mesh.position.z = obj.children[0].position.z;
                        });
                    }
                    else target.position.z = obj.children[0].position.z;
                    
                    resizeWallNFloor_2D(target, target.wall_type, newWidth);
                }
                else if(oppositeWallDir === "top" || oppositeWallDir === "bottom"){
                    newWidth = Math.abs(target.position.z - obj.children[0].position.z);
                    if(target.parent.children.length > 1){
                        target.parent.children.forEach(mesh => {
                            mesh.position.x = obj.children[0].position.x;
                            mesh.position.z = target.position.z;
                        });
                    }
                    else target.position.x = obj.children[0].position.x;

                    resizeWallNFloor_2D(target, target.wall_type, newWidth);
                }
                target.position.y = obj.position.y;
            }
            else{
                if(obj.children.length > 1){
                    obj.children.forEach(mesh =>{
                        if(mesh.name.split("_")[0] === "door" || mesh.name.split("_")[0] === "window"){
                            relocateObject(mesh);
                        }
                    });
                }
            }
        }
    });
}


const resizeWallNFloor_2D = (target, wallType, newWidth, thick = 0.25) => {

    let oppositeWall;

    if(wallType === "horizon"){
        oppositeWall = "vertical";
    }
    else{
        oppositeWall = "horizon";
    }

    target.parent.parent.children.forEach(obj => {
        if(obj.name.split("_")[1] === "floor"){
            if(oppositeWall === "vertical"){
                obj.children[0].scale.z = newWidth;
                obj.children[0].position.z = obj.children[0].mesh_position.z + (target.position.z - target.mesh_position.z)/2;
                obj.children[0].mesh_position.z = obj.children[0].position.z;
                obj.parent.room_position.z = obj.children[0].position.z; //room_position
                obj.parent.room_size.z =  newWidth; // room size
            }
            else if(oppositeWall === "horizon"){
                obj.children[0].scale.x = newWidth;
                obj.children[0].position.x = obj.children[0].mesh_position.x + (target.position.x - target.mesh_position.x)/2;
                obj.children[0].mesh_position.x = obj.children[0].position.x;
                obj.parent.room_position.x = obj.children[0].position.x; //room_position
                obj.parent.room_size.x =  newWidth; // room size
            }
        }
        else{
            if(obj.name.split("_")[1] === "wall"){
                if(obj.children[0].wall_type === oppositeWall && oppositeWall === "vertical"){
                    obj.children[0].scale.z = newWidth;
                    obj.children[0].position.z = obj.children[0].mesh_position.z + (target.position.z - target.mesh_position.z)/2;
                    obj.children[0].mesh_position.z = obj.children[0].position.z;
                }
                
                if(obj.children[0].wall_type === oppositeWall && oppositeWall === "horizon"){
                    obj.children[0].scale.x = newWidth;
                    obj.children[0].position.x = obj.children[0].mesh_position.x + (target.position.x - target.mesh_position.x)/2;
                    obj.children[0].mesh_position.x = obj.children[0].position.x;
                }
            }
        }
    });

    if(oppositeWall === "vertical"){
        target.mesh_position.z = target.position.z;
    }
    if(oppositeWall === "horizon"){
        target.mesh_position.x = target.position.x;
    }


    
}

const relocateWindow_2D = (target) => {
    target.parent.children.forEach(obj => {
        if (obj.name.split("_")[0] === "wall") {

            let min, max;
            switch (obj.wall_type) {
                case "horizon":
                    target.position.z = obj.position.z; // fixed z axis

                    // move x axis
                    min = (obj.position.x) - (obj.scale.x / 2 - target.scale.x / 2);
                    max = (obj.position.x) + (obj.scale.x / 2 - target.scale.x / 2); 

                    if (min < target.position.x && target.position.x < max)
                        target.window_position.x = target.position.x;
                    else
                        target.position.x = (target.position.x > min) ? max : min;
                    break;
                case "vertical":
                    target.position.x = obj.position.x; // fixed x axis

                    // move z axis
                    min = (obj.position.z) - (obj.scale.z / 2 - target.scale.x / 2);
                    max = (obj.position.z) + (obj.scale.z / 2 - target.scale.x / 2); 
                    
                    if (min < target.position.z && target.position.z < max)
                        target.window_position.z = target.position.z;
                    else
                        target.position.z = (target.position.z > min) ? max : min;
                    break;
                default:
                    break;
            }
            target.position.y = 0.0002
        }
    });
}

const relocateDoor_2D = (target) => {
    target.parent.children.forEach(obj => {
        if (obj.name.split("_")[0] === "wall") {
            let min, max;
            switch (obj.wall_type) {
                case "horizon":
                    target.position.z = obj.position.z; // fixed z axis

                    // move x axis
                    min = (obj.position.x) - (obj.scale.x / 2 - target.scale.x / 2);
                    max = (obj.position.x) + (obj.scale.x / 2 - target.scale.x / 2);
                    
                    if (min < target.position.x && target.position.x < max)
                        target.door_position.x = target.position.x;
                    else
                        target.position.x = (target.position.x > min) ? max : min;
                    break;
                case "vertical":
                    target.position.x = obj.position.x; // fixed x axis

                    // move z axis
                    min = (obj.position.z) - (obj.scale.z / 2 - target.scale.x / 2);
                    max = (obj.position.z) + (obj.scale.z / 2 - target.scale.x / 2);
                    if (min < target.position.z && target.position.z < max)
                        target.door_position.z = target.position.z;
                    else
                        target.position.z = (target.position.z > min) ? max : min;
                    break;
                default:
                    break;
            }
        }
        target.position.y = 0.0002
        console.log(target.position);
        // console.log(target.scale);
    });
}

const relocateWindow_3D = (target) => {
    target.parent.children.forEach(obj => {
        if (obj.name.split("_")[0] === "wall") {

            // fixed x, z axis
            switch (obj.wall_type) {
                case "horizon":
                    target.position.z = obj.position.z; //fixed Z axis

                    // move X axis
                    const minX = (obj.position.x) -((obj.scale.x/2) - (target.scale.x/2));
                    const maxX = (obj.position.x) + ((obj.scale.x/2) - (target.scale.x/2));
                    if (minX < target.position.x && target.position.x < maxX)
                        target.window_position.x = target.position.x;
                    else 
                        target.position.x = (target.position.x > minX) ? maxX : minX;
                    break;
                case "vertical":
                    target.position.x = obj.position.x; //fixed X axis

                    // move Z axis
                    const minZ = (obj.position.z) - ((obj.scale.z/2) - (target.scale.x/2));
                    const maxZ = (obj.position.z) + ((obj.scale.z/2) - (target.scale.x/2));
                    if (minZ < target.position.z && target.position.z < maxZ)
                        target.window_position.z = target.position.z;
                    else 
                        target.position.z = (target.position.z > minZ) ? maxZ : minZ;
                    break;
                default:
                    break;
            }

            // move Y axis
            const minY = target.window_size.y/2;
            const maxY = (obj.scale.y - target.window_size.y/2);
            if (minY < target.position.y && target.position.y < maxY)
                target.window_position.y = target.position.y;
            else 
                target.position.y = (target.position.y > minY) ? maxY : minY;
        }
    });
}

const relocateDoor_3D = (target) => {
    target.parent.children.forEach((obj) => { // target : door, obj : wall
        if (obj.name.split("_")[0] === "wall") {
            switch (obj.wall_type) {
                case "horizon" :
                    target.position.z = obj.position.z; // fix position
                    //target.door_position.x = obj.position.x;
                    const horizonMin = (obj.position.x) -1 * ((obj.scale.x / 2) - (target.scale.x / 2));
                    const horizonMax = (obj.position.x) + ((obj.scale.x / 2) - (target.scale.x / 2));
                    if (target.position.x < horizonMin) target.position.x = horizonMin;                    
                    else if (target.position.x > horizonMax) target.position.x = horizonMax;
                    break;
                case "vertical" :
                    target.position.x = obj.position.x; // fix position
                    //target.door_position.z = obj.position.z;
                    const verticalMin = (obj.position.z) -1 * ((obj.scale.z / 2) - (target.scale.x / 2))
                    const verticalMax = (obj.position.z) + ((obj.scale.z / 2) - (target.scale.x / 2));
                    if (target.position.z < verticalMin) target.position.z = verticalMin;                    
                    else if (target.position.z > verticalMax) target.position.z = verticalMax;
                    break;
                default :
                    break;
            }
            target.position.y = target.scale.y / 2;


        }
    })
}