export const setObjectDim = (room, dim) => {
    room.children.forEach(group => {
        switch (group.name.split("_")[1]) {
            case "wall":
                setWallGroupDim(group, dim);
                break;
            case "item":
                setItemGroupDim(group, dim);
                break;
            default:
                break;
        }
    });
};

const setWallGroupDim = (wall_group, dim) => {
    wall_group.children.forEach(mesh => {
        switch (mesh.name.split("_")[0]) {
            case "wall":
                setWallDim(mesh, dim);
                break;
            case "door":
                setDoorDim(mesh, dim);
                break;
            case "window":
                setWindowDim(mesh, dim);
                break;
            default:
                break;
        }
    });
}

const setWallDim = (wall, dim) => {
    switch (dim) {
        case 2:
            wall.scale.setY(0.001);
            wall.position.setY(0);
            break;
        case 3:
            wall.scale.setY(wall.wall_size.y);
            wall.position.setY(wall.scale.y/2);
            break;
        default:
            break;
    }
}

const setDoorDim = (door, dim) => {
    switch (dim) {
        case 2:
            door.scale.setY(0.001);
            door.position.setY(0.001);
            break;
        case 3:
            door.scale.setY(door.door_size.y);
            door.position.setY(door.scale.y/2);
            break;
        default:
            break;
    }
}

const setWindowDim = (window, dim) => {
    switch (dim) {
        case 2:
            window.scale.setY(0.001);
            window.position.setY(0.001);
            break;
        case 3:
            window.scale.setY(window.window_size.y);
            window.position.setY(window.window_position.y);
            break;
        default:
            break;
    }
}

const setItemGroupDim = (item, dim) => {
    switch (dim) {
        case 2:
            item.scale.setY(0.0001);
            item.position.setY(0.001);
            break;
        case 3:
            item.scale.setY(item.obj_size.y);
            item.position.setY(item.obj_position.y);
            break;
        default:
            break;
    }
}