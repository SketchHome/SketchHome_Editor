import { OBJExporter } from "three/examples/jsm/exporters/OBJExporter";


export const removeObject = (scene, target, drag_target) => {
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
    room.children.forEach(group => {
        switch (group.name.split("_")[1]) {
            case "wall":
                group.children.forEach(mesh => {
                    switch (mesh.name.split("_")[0]) {
                        case "wall":
                            resizeWall(mesh, width, height);
                            relocateWall(mesh, width, height);
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
                group.children[0].scale.setX(width);
                group.children[0].scale.setZ(height);
                break;
            case "ceiling":
                group.children[0].scale.setX(width);
                group.children[0].scale.setZ(height);
            default:
                break;
        }
    });

    room.size.x = width;
    room.size.z = height;
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

const limitWallSize = (wall) => {
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

    minValue.sort().reverse();

    switch (wall.wall_type) {
        case "horizon":
            document.getElementById('resize_width').setAttribute('min', minValue[0]);
            break;
        case "vertical":
            document.getElementById('resize_height').setAttribute('min', minValue[0]);
            break;
        default :
            break;
    }

    return minValue[0];
}

const resizeWall = (wall, width, height) => {
    
    limitWallSize(wall);

    switch (wall.wall_type) {
        case "horizon":
            wall.scale.setX(width);
            break;
        case "vertical":
            wall.scale.setZ(height);
            break;
        default:
            break;
    }
}

const relocateWall = (wall, width, height) => {
    switch (wall.wall_direction) {
        case "top":
            wall.position.setZ(height / 2);
            break;
        case "bottom":
            wall.position.setZ(-height / 2);
            break;
        case "right":
            wall.position.setX(width / 2);
            break;
        case "left":
            wall.position.setX(-width / 2);
            break;
        default:
            break;
    }
}


const relocateObject = (object) => {
    object.parent.children.forEach(child => {
        if (child.name.split("_")[0] === "wall") {
            switch (child.wall_direction) {
                case "top":
                case "bottom":
                    object.position.setZ(child.position.z);
                    break;
                case "right":
                case "left":
                    object.position.setX(child.position.x);
                    break;
                default:
                    break;
            }
        }
    });
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
    wall.material.color.set(color);
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