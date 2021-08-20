export const saveStatus = (show_room) => {
    let show_room_info = {
        'room': []
    }

    show_room.children.forEach((room) => {
        const room_info = getRoomInfo(room);
        show_room_info['room'].push(room_info);
    });

    console.log(show_room_info);
}

const getRoomInfo = (room) => {
    const room_info = {
        "id": room.name.split('group_')[1],
        "type": "square",
        "position": room.room_position,
        "size": room.room_size,
        "wall": [],
        "item": []
    }
    room.children.forEach(component_group => {
        switch (component_group.name.split('_')[1]) {
            case 'wall':
                const wall_info = getWallInfo(component_group);
                room_info['wall'].push(wall_info);
                break;
            case 'floor':
                // console.log('floor');
                break;
            case 'item':
                // console.log('item');
                break;
            default:
                break;
        }
    });

    return room_info;
}

const getWallInfo = (wall_group) => {
    let wall_info = {
        'id': '',
        'wall_type': '',
        'wall_direction': '',
        'door': [],
        'window': []
    };

    wall_group.children.forEach(component => {
        switch (component.name.split('_')[0]) {
            case 'wall':
                wall_info['id'] = component.name;
                wall_info['wall_direction'] = component.wall_direction;
                wall_info['wall_type'] = component.wall_type;
                break;
            case 'door':
                let door = {
                    'id': component.name,
                    'size': component.door_size,
                    'position': component.door_position
                };
                wall_info['door'].push(door);
                break;
            case 'window':
                let window = {
                    'id': component.name,
                    'size': component.window_size,
                    'position': component.window_position
                };
                wall_info['window'].push(window);
                break;
            default:
                break;
        }
    })
    return wall_info;
}