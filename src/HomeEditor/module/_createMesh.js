import * as THREE from "three";

export const createWallMesh = (id, type, direction, room_size, dim, room_position) => {
    // set size
    const material = new THREE.MeshLambertMaterial({ color: "#c5a880" });
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const wall_mesh = new THREE.Mesh(geometry, material);
    const size = new THREE.Vector3();
    const thick = 0.25;
    switch (type) {
        case "horizon":
            size.set(room_size.x + thick, room_size.y, thick);
            break;
        case "vertical":
            size.set(thick, room_size.y, room_size.z + thick);
            break;
        default:
            break;
    }
    wall_mesh.scale.set(size.x, size.y, size.z);
    wall_mesh.wall_type = type;
    wall_mesh.wall_size = { "y": size.y };

    // shadow
    wall_mesh.castShadow = true;
    wall_mesh.receiveShadow = true;

    // set position
    const position = new THREE.Vector3();
    switch (direction) {
        case "top":
            position.set(room_position.x, 0, room_position.z + room_size.z / 2);
            break;
        case "bottom":
            position.set(room_position.x, 0, room_position.z - room_size.z / 2);
            break;
        case "right":
            position.set(room_position.x + room_size.x / 2, 0, room_position.z);
            break;
        case "left":
            position.set(room_position.x - room_size.x / 2, 0, room_position.z);
            break;
        default:
            break;
    }
    wall_mesh.position.set(position.x, position.y, position.z);
    wall_mesh.mesh_position = { "x" : position.x, "y" : position.y, "z" : position.z };
    wall_mesh.name = id;
    wall_mesh.wall_direction = direction;

    // set dimension
    switch (dim) {
        case 2:
            wall_mesh.scale.setY(0.001);
            wall_mesh.position.setY(0);
            break;
        case 3:
            wall_mesh.scale.setY(1);
            wall_mesh.position.setY(size.y / 2);
            break;
        default:
            break;
    }

    return wall_mesh;
};

export const createWindowMesh = (id, size, position, type, wall_position, dim) => {
    const material = new THREE.MeshBasicMaterial({ color: "#0a043c" });
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const window_mesh = new THREE.Mesh(geometry, material);

    window_mesh.scale.set(size.x, size.y, size.z);
    window_mesh.window_size = { "x": size.x, "y": size.y, "z": size.z };
    window_mesh.window_position = { "x": position.x, "y": position.y };
    //window_mesh.castShadow = true
    switch (type) {
        case "horizon":
            window_mesh.position.setX(wall_position.x + position.x);
            window_mesh.position.setZ(wall_position.z);
            break;
        case "vertical":
            window_mesh.position.setX(wall_position.x);
            window_mesh.position.setZ(wall_position.z + position.x);
            window_mesh.rotation.y = Math.PI / 2;
            break;
        default:
            break;
    }

    switch (dim) {
        case 2:
            window_mesh.scale.setY(0.001);
            window_mesh.position.setY(0.001);
            break;
        case 3:
            window_mesh.scale.setY(size.y);
            window_mesh.position.setY(position.y);
            break;
        default:
            break;
    }
    
    window_mesh.name = id;

    return window_mesh;
}

export const createDoorMesh = (id, size, position, type, wall_position, dim) => {
    const material = new THREE.MeshBasicMaterial({ color: "#0a043c" });
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const door_mesh = new THREE.Mesh(geometry, material);

    door_mesh.scale.set(size.x, size.y, size.z);
    door_mesh.door_size = { "x": size.x, "y": size.y, "z": size.z };
    door_mesh.door_position = { "x": position.x };
    door_mesh.castShadow = false;
    switch (type) {
        case "horizon":
            door_mesh.position.setX(wall_position.x + position.x);
            door_mesh.position.setZ(wall_position.z);
            break;
        case "vertical":
            door_mesh.position.setX(wall_position.x);
            door_mesh.position.setZ(wall_position.z + position.x);
            door_mesh.rotation.y = Math.PI / 2;
            break;
        default:
            break;
    }

    switch (dim) {
        case 2:
            door_mesh.scale.setY(0.001);
            door_mesh.position.setY(0.001);
            break;
        case 3:
            door_mesh.scale.setY(size.y);
            door_mesh.position.setY(size.y / 2);
            break;
        default:
            break;
    }

    door_mesh.name = id;

    return door_mesh;
}

export const createFloorMesh = (size, position) => {
    const material = new THREE.MeshLambertMaterial({ color: "#e6e6e6" });
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const floor_mesh = new THREE.Mesh(geometry, material);
    
    floor_mesh.scale.set(size.x, 0.1, size.z);
    floor_mesh.position.set(position.x, -0.05, position.z);
    floor_mesh.mesh_position = { "x" : position.x, "y" : -0.05, "z" : position.z};
    floor_mesh.name = "floor";

    floor_mesh.receiveShadow = true;
    
    return floor_mesh;
}

export const createCeilingMesh = (size, position) => {
    const material = new THREE.MeshLambertMaterial({ color: "#e6e6e6" });
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const ceiling_mesh = new THREE.Mesh(geometry, material);

    console.log(size);
    
    ceiling_mesh.scale.set(size.x, 0.1, size.z);
    ceiling_mesh.position.set(position.x ,-0.05 + 3, position.z);
    ceiling_mesh.name = "ceiling";
    
    return ceiling_mesh;
}

export const createLightObject = (position, intensity) => {
    const light = new THREE.DirectionalLight(0xffffff, intensity);
    light.castShadow = true;
    light.position.set(position.x, position.y, position.z);

    return light;
}