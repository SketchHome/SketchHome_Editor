import { OBJExporter } from "three/examples/jsm/exporters/OBJExporter";
import * as THREE from "three"

export const removeItem = (target, drag_target) => {
    let temp = target.pop().object;

    if (temp.name === "load_object_part") {
        temp = temp.parent;
        temp.parent.remove(temp);
        temp.traverse(child => {
            if (child.type === "Mesh") {
                child.geometry.dispose();
                // child.material.dispose();
            }
        })
    }
    else {
        temp.parent.remove(temp);
        temp.geometry.dispose();
        // temp.material.dispose();
    }

    temp = undefined;

    if (drag_target.length !== 0) drag_target.pop();
}

export const removeRoom = (target, drag_target) => {
    let room = target.pop().object;
    room.parent.remove(room);

    if (drag_target.length !== 0) drag_target.pop();
}

export const rotateObjectHorizon = (target) => {
    let temp = target[0].object;

    if (temp.name === "load_object_part") {
        temp = temp.parent;
    }

    let r_value = temp.rotation.y + (Math.PI / 2);
    if (r_value > 6) r_value = 0;
    temp.rotation.set(0, r_value, 0);
}

export const rotateObjectVertical = (target) => {
    let temp = target[0].object;

    if (temp.name === "load_object_part") {
        temp = temp.parent;
    }

    let r_value = temp.rotation.x + (Math.PI / 2);
    if (r_value > 6) r_value = 0;
    temp.rotation.set(r_value, 0, 0);
}

const getItemPosition = (mesh, direction) => {
    let min = 0;
    switch (direction) {
        case 'vertical' :
            if (mesh.position.z <= 0) {
                min = mesh.position.z - (mesh.scale.x / 2);
                min *= (-2);
            }
            else {
                min = mesh.position.z + (mesh.scale.x / 2);
                min *= 2;
            }
            break;
        case 'horizon' :
            if (mesh.position.x <= 0) {
                min = mesh.position.x - (mesh.scale.x / 2);
                min *= (-2);
            }
            else {
                min = mesh.position.x + (mesh.scale.x / 2);
                min *= 2;
            }
            break;
        default :
            break;
    }
    return min;
}

export const resizeRoom = (room, width, height) => {

    switch (room.parent.edit_mode) {
        case "room" :
            break;
        case "item" :
        default :
            return;
    }

    room.children.forEach(group => {
        switch (group.name.split("_")[1]) {
            case "wall":
                group.children.forEach(mesh => {
                    switch (mesh.name.split("_")[0]) {
                        case "wall":
                            resizeWall(mesh, width, height);
                            relocateWall(mesh, width, height, room.room_position);
                            break;
                        case "window":
                        case "door":
                            relocateObject(mesh);
                            break;
                        default:
                            break;
                    }
                });
                break;
            case "floor":
                const floor = group.children[0];

                floor.scale.setX(width);
                floor.scale.setZ(height);

                resizeFloorTexture(floor);
                break;
            case "ceiling":
                group.children[0].scale.setX(width);
                group.children[0].scale.setZ(height);
                break;
            default:
                break;
        }
    });

    room.room_size.x = width;
    room.room_size.z = height;
}

export const resizeItem = (item, size) => {
    if (item.name !== "load_object_part") return;
    const real_size = size / 10000;
    item.parent.scale.setX(real_size);
    item.parent.scale.setZ(real_size);
    item.parent.obj_size = {
        x: real_size,
        y: real_size,
        z: real_size
    }

    if (item.parent.scale.y !== 0.0001) item.parent.scale.setY(real_size);
}

const limitWallSize = (wall, room_position) => {
    let minValue = [];
    if(wall.parent.children.length < 2) return;

    wall.parent.children.forEach((mesh) => {
        switch (mesh.name.split("_")[0]) {
            case "door":
                let minDoor = getItemPosition(mesh, wall.wall_type);
                minValue.push(minDoor);
                break;
            case "window":
                let minWindow = getItemPosition(mesh, wall.wall_type);
                minValue.push(minWindow);
                break;
            default:
                break;
        }
    });

    if (minValue.length === 0) return;

    minValue.sort().reverse();
    console.log(minValue);

    switch (wall.wall_type) {
        case "horizon":
            document.getElementById('resize_width').setAttribute('min', minValue[0] - room_position.x);
            break;
        case "vertical":
            document.getElementById('resize_height').setAttribute('min', minValue[0] - room_position.z);
            break;
        default :
            break;
    }

    return minValue[0];
}

const resizeWall = (wall, width, height) => {
    
    //limitWallSize(wall, wall.parent.parent.room_position);

    switch (wall.wall_type) {
        case "horizon":
            wall.scale.setX(width);
            resizeWallTexture(wall, wall.wall_type);
            break;
        case "vertical":
            wall.scale.setZ(height);
            resizeWallTexture(wall, wall.wall_type);
            break;
        default:
            break;
    }
}

const relocateWall = (wall, width, height, position) => {

    switch (wall.wall_direction) {
        case "top":
            wall.position.setZ(position.z + height / 2);
            break;
        case "bottom":
            wall.position.setZ(position.z - height / 2);
            break;
        case "right":
            wall.position.setX(position.z + width / 2);
            break;
        case "left":
            wall.position.setX(position.z - width / 2);
            break;
        default:
            break;
    }
}


export const relocateObject = (object) => {
    object.parent.children.forEach(child => { // child : wall, object : door, window
        if (child.name.split("_")[0] === "wall") {
            switch (child.wall_direction) {
                case "top":
                case "bottom":
                    const wallPositionRight = child.position.x + (child.scale.x / 2);
                    const wallPositionLeft = child.position.x - (child.scale.x / 2);
                    const itemPositionRight = object.position.x + (object.scale.x / 2);
                    const itemPositionLeft = object.position.x - (object.scale.x / 2);

                    if (child.scale.x <= object.scale.x) object.position.setX(child.position.x); // wall is smaller than window or door
                    else {
                        if (wallPositionRight < itemPositionRight) object.position.setX(wallPositionRight - (object.scale.x / 2));
                        else if (wallPositionLeft > itemPositionLeft) object.position.setX(wallPositionLeft + (object.scale.x / 2));

                    }
                    object.position.setZ(child.position.z); // fix position to wall
                    break;
                case "right":
                case "left":
                    const wallPositionTop = child.position.z + (child.scale.z / 2);
                    const wallPositionBottom = child.position.z - (child.scale.z / 2);
                    const itemPositionTop = object.position.z + (object.scale.x / 2);
                    const itemPositionBottom = object.position.z - (object.scale.x / 2);

                    if (child.scale.z <= object.scale.x) object.position.setZ(child.position.z);
                    else {
                        if (wallPositionTop < itemPositionTop) object.position.setZ(wallPositionTop - (object.scale.x / 2));
                        else if (wallPositionBottom > itemPositionBottom) object.position.setZ(wallPositionBottom + (object.scale.x / 2));
                    }
                    object.position.setX(child.position.x); // fix position to wall
                    break;
                default:
                    break;
            }
        }
    });
}


export const changeFloorTexture = (floor, item_path) => {
    const texture = new THREE.TextureLoader().load(item_path);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(floor.scale.x/0.125, floor.scale.z/0.9);
    floor.material = new THREE.MeshLambertMaterial({
        map: texture
    });
}

export const resizeFloorTexture = (floor) => {
    const floorTexture = floor.material.map;
    if(floorTexture === null) return;
    floorTexture.repeat.set(floor.scale.x/0.125, floor.scale.z/0.9);
}

export const changeFloorColor = (room, color) => {
    room.children.forEach(child => {
        if (child.name.split("_")[1] === 'floor') {
            const floor_mesh = child.children[0];
            floor_mesh.material.color.set(color);
        }
    });
}

export const changeWallColor = (wall, color) => {
    if (wall.material.map !== null) {
        wall.material.dispose();
        wall.material = new THREE.MeshLambertMaterial({
            color : color,
        })
    }
    else {
        wall.material.color.set(color);
    }
    
}

export const hexToRgb = (hex) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255
    } : null;
}

export const exportRoom = (room) => {
    const exporter = new OBJExporter();

    const objects = findAllObject(room);
    
    for (const obj of objects) {
        console.log(obj);
        console.log(exporter.parse(obj));
    }
    
}

const findAllObject = (obj) => {
    if (obj.name === 'group_item') return obj;
    else if (obj.children.length === 0 && obj.type === 'Mesh') return obj;
    else {
        let temp = [];
        for (const child of obj.children) {
            temp = temp.concat(findAllObject(child));
        }

        return temp;
    }
}

export const changeLightIntensity = (lightGroup, intensity) => {
    lightGroup.children.forEach((light) => {
        console.log(light);
        light.intensity = intensity;
    })
}

export const setLightPositionX = (lightGroup, positionX) => {
    console.log(lightGroup.children[0]);
    lightGroup.children.forEach((light) => {
        light.position.x = positionX;
    })
}

export const setLightPositionY = (lightGroup, positionY) => {
    console.log(lightGroup.children[0]);
    lightGroup.children.forEach((light) => {
        light.position.y = positionY;
    })
}

export const setLightPositionZ = (lightGroup, positionZ) => {
    console.log(lightGroup.children[0]);
    lightGroup.children.forEach((light) => {
        light.position.z = positionZ;
    })
}

export const removeCeiling = (room) => {
    room.children.forEach((group) => {
        if (group.name.split("_")[1] === "ceiling") {
            if(group.children.length === 0) return;
            group.children.forEach((mesh) => {
                mesh.parent.remove(mesh);
                mesh.geometry.dispose();
            });
            group.parent.remove(group);
        }
    });
}

export const changeWallTexture = (mesh, path) => {
    if (mesh.name.split("_")[0] !== "wall") return;
    mesh.material.dispose();
    const texture = new THREE.TextureLoader().load(path);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    
    if (mesh.wall_type === "horizon") {
        texture.repeat.set(mesh.scale.x / 0.39, mesh.scale.y / 0.79);
    }
    else {
        texture.repeat.set(mesh.scale.z / 0.39, mesh.scale.y / 0.79);
    }
    mesh.material = new THREE.MeshLambertMaterial({
        map : texture
    });
}

export const resizeWallTexture = (wall, wall_type) => {
    const texture = wall.material.map;
    if (texture === null) return;
    switch (wall_type) {
        case "horizon" :
            texture.repeat.set(wall.scale.x / 0.39, wall.scale.y / 0.79);
            break;
        case "vertical" :
            texture.repeat.set(wall.scale.z / 0.39, wall.scale.y / 0.79);
            break;
        default :
            break;
    }
}

export const resizeWallTextureModeChange = (room) => {
    room.children.forEach((group) => {
        if(group.name.split("_")[1] === "wall") {
            group.children.forEach((wall) => {
                resizeWallTexture(wall, wall.wall_type);
            });
        }
    });
}

export const showRoomInfo = (room) => {
    room.children.forEach((group) => {
        if (group.name.split("_")[1] === 'wall') {
            group.children.forEach((mesh) =>{
                if (mesh.name.split("_")[0] === 'wall') {
                    switch (mesh.wall_type) {
                        case "horizon" :          
                            document.getElementById("room_width").innerHTML = mesh.scale.x;
                            document.getElementById("resize_width").setAttribute.value = mesh.scale.x;
                            break;
                        case "vertical" :
                            document.getElementById("room_height").innerHTML = mesh.scale.z;
                            document.getElementById("resize_height").setAttribute.value = mesh.scale.z;
                            break;
                        default :
                            break;
                    }
                }
            });
        }
    });
}

export const changeItemRoomGroup = (group_item, room) => {
    console.log(room);
    let positions = []
    room.children.forEach((group) => {
        positions.push(getRoomPositions(group));
    });

    const itemPositionX = group_item.position.x + group_item.parent.position.x; // absolute position
    const itemPositionZ = group_item.position.z + group_item.parent.position.z; // absolute position
    console.log(positions);

    positions.forEach((position) => {
        console.log("item", itemPositionX, itemPositionZ);
        console.log("topRight", position.topRight.x, position.topRight.z);
        console.log("bottonLeft", position.bottomLeft.x, position.bottomLeft.z);
        if ((itemPositionX < position.topRight.x) && (itemPositionX > position.bottomLeft.x)) { // check item is inside of room
            if ((itemPositionZ < position.topRight.z) && (itemPositionZ > position.bottomLeft.z)) {
                group_item.parent.parent.children.forEach((group_room) => {
                    if (group_room.name === position.name) {
                        group_room.add(group_item);
                        getNewPositionOfItemGroup(itemPositionX, itemPositionZ, group_room, group_item);
                        console.log(group_room.name);
                    }
                });
            }
        }
    })
}

const getRoomPositions = (room) => {
    let topRight, bottomLeft;
    let roomPositions;
    let roomName = room.name;

    room.children.forEach((group) => {
        if (group.name.split("_")[1] === "wall") {
            group.children.forEach((mesh) => {
                if (mesh.name.split("_")[0] === "wall") {
                    switch (mesh.wall_direction) {
                        case "top" :
                            topRight = {x: room.position.x + mesh.position.x + (mesh.scale.x / 2) , z: room.position.z + mesh.position.z};
                            break;
                        case "bottom" :
                            bottomLeft = {x: room.position.x + mesh.position.x - (mesh.scale.x / 2) , z: room.position.z +mesh.position.z};
                            break;
                        default:
                            break;
                    }
                }
            });
        }

        roomPositions = {name: roomName, topRight: topRight, bottomLeft: bottomLeft};
    });
    return roomPositions;
}

const getNewPositionOfItemGroup = (itemPositionX, itemPositionZ, room, group_item) => {
    const realPositionX = itemPositionX - room.position.x;
    const realPositionZ = itemPositionZ - room.position.z;

    group_item.position.set(realPositionX, 0.001, realPositionZ);
}

