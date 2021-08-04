export const setDragTarget = (intersects, target, drag_target) => {
    if (intersects.length === 0 || target.length === 0) return;

    if (drag_target.length === 0 && target[0].object.uuid === intersects[0].object.uuid) {
        addDragTarget(drag_target, intersects[0].object);
    }
};

export const removeDragTarget = (target) => {
    target.pop();
};

const addDragTarget = (drag_target, object) => {
    switch (object.name.split("_")[0]) {
        case "window":
            drag_target.push(object);
            object.material.color.set("blue");
            break;
        case "door":
            drag_target.push(object);
            object.material.color.set("blue");
            break;
        case "load":
            drag_target.push(object.parent);
            object.material.color.set("blue");
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

const relocateWindow_2D = (target) => {
    target.parent.children.forEach(obj => {
        if (obj.name.split("_")[0] === "wall") {
            let min, max;
            switch (obj.wall_type) {
                case "horizon":
                    target.position.z = obj.position.z; // fixed z axis

                    // move x axis
                    min = -(obj.scale.x / 2 - target.window_size.x / 2);
                    max = (obj.scale.x / 2 - target.window_size.x / 2);
                    if (min < target.position.x && target.position.x < max)
                        target.window_position.x = target.position.x;
                    else
                        target.position.x = (target.position.x > 0) ? max : min;
                    break;
                case "vertical":
                    target.position.x = obj.position.x; // fixed x axis

                    // move z axis
                    min = -(obj.scale.z / 2 - target.window_size.x / 2);
                    max = (obj.scale.z / 2 - target.window_size.x / 2);
                    if (min < target.position.z && target.position.z < max)
                        target.window_position.z = target.position.z;
                    else
                        target.position.z = (target.position.z > 0) ? max : min;
                    break;
                default:
                    break;
            }
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
                    min = -(obj.scale.x / 2 - target.door_size.x / 2);
                    max = (obj.scale.x / 2 - target.door_size.x / 2);
                    if (min < target.position.x && target.position.x < max)
                        target.door_position.x = target.position.x;
                    else
                        target.position.x = (target.position.x > 0) ? max : min;
                    break;
                case "vertical":
                    target.position.x = obj.position.x; // fixed x axis

                    // move z axis
                    min = -(obj.scale.z / 2 - target.door_size.x / 2);
                    max = (obj.scale.z / 2 - target.door_size.x / 2);
                    if (min < target.position.z && target.position.z < max)
                        target.door_position.z = target.position.z;
                    else
                        target.position.z = (target.position.z > 0) ? max : min;
                    break;
                default:
                    break;
            }
        }
    });
}

const relocateWindow_3D = (target) => {
    target.parent.children.forEach(obj => {
        if (obj.name.split("_")[0] === "wall") {

            console.log("target name:", target.name);
            console.log("target parent name :", target.parent.name);
            console.log("obj name:", obj.name);
            console.log("obj parent name :", obj.parent.name);
            console.log("obj wall_type :", obj.wall_type);

            // fixed x, z axis
            switch (obj.wall_type) {
                case "horizon":
                    target.position.z = obj.position.z; //fixed Z axis

                    // move X axis
                    const minX = -((obj.scale.x/2) - (target.scale.x/2));
                    const maxX = ((obj.scale.x/2) - (target.scale.x/2));
                    if (minX < target.position.x && target.position.x < maxX)
                        target.window_position.x = target.position.x;
                    else 
                        target.position.x = (target.position.x > minX) ? maxX : minX;
                    break;
                case "vertical":
                    target.position.x = obj.position.x; //fixed X axis

                    // move Z axis
                    const minZ = -((obj.scale.z/2) - (target.scale.x/2));
                    const maxZ = ((obj.scale.z/2) - (target.scale.x/2));
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
                    const horizonMin = -1 * ((obj.scale.x / 2) - (target.scale.x / 2));
                    const horizonMax = ((obj.scale.x / 2) - (target.scale.x / 2));
                    if (target.position.x < horizonMin) target.position.x = horizonMin;                    
                    else if (target.position.x > horizonMax) target.position.x = horizonMax;
                    break;
                case "vertical" :
                    target.position.x = obj.position.x; // fix position
                    //target.door_position.z = obj.position.z;
                    const verticalMin = -1 * ((obj.scale.z / 2) - (target.scale.x / 2))
                    const verticalMax = ((obj.scale.z / 2) - (target.scale.x / 2));
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