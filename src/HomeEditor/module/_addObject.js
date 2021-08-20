import * as THREE from "three"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { createWallMesh, createWindowMesh, createDoorMesh, createFloorMesh, createLightObject, createCeilingMesh} from "./_createMesh"

export const addSquare = (scene) => {
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    cube.name = "square";

    // const group1 = new THREE.Group();
    // const group2 = new THREE.Group();
    // group1.name = "parent_group";
    // group2.name = "child_group";

    // group2.add(cube);
    // group1.add(group2);
    // scene.add(group1);

    scene.add(cube);
};

export const addLoadObj = (room_group, obj_name, obj_path, size, position, id, dim) => {
    const mtl_loader = new MTLLoader();
    const obj_loader = new OBJLoader();

    mtl_loader.setPath(obj_path);
    obj_loader.setPath(obj_path);

    mtl_loader.load(
        `${obj_name.split("-")[0]}.mtl`,
        (materials) => {
        materials.preload();
        mtl_loader.setMaterialOptions( { invertTrProperty: true } )
        obj_loader.setMaterials(materials);
        obj_loader.load(
            `${obj_name.split("-")[0]}.obj`,
            (object) => {
                if (dim === 3) {
                    object.scale.set(size.x, size.y, size.z);
                    object.position.set(position.x, position.y, position.z);
                }
                else if (dim === 2) {
                    object.scale.set(size.x, 0.0001, size.z);
                    object.position.set(position.x, 0.001, position.z);
                }
                object.name = `group_${id}`;
                object.obj_size = { "x": size.x, "y": size.y, "z": size.z };
                object.obj_position = { "x": position.x, "y": position.y, "z": position.z };
                object.children.forEach(child => { 
                    child.name = "load_object_part";
                    child.castShadow = true;
                    child.receiveShadow = true;
                 });
                object.room_name = room_group.name;
                room_group.add(object);
                
            },
            (xhr) => {
                console.log("OBJLoader: " + (xhr.loaded / xhr.total * 100) + "% loaded");
            },
            (error) => {
                console.log("An error happened (OBJLoader)");
                console.log(error);
            }
        );
    }, (xhr) => {
            console.log("MTLLoader: " + (xhr.loaded / xhr.total * 100) + "% loaded");
    }, (error) => {
        console.log("An error happened (MTLLoader)");
        console.log(error);
    });    
};

export const addRoom = (show_room, room_info, dim) => {
    const room_group = new THREE.Group();
	room_group.name = `group_${room_info.id}`;
	room_group.room_size = room_info.size;
	room_group.room_position = room_info.position;

    // add walls (window, door)
    room_info.wall.forEach(wall => {
        const wall_group = new THREE.Group();
        wall_group.name = `group_${wall.id}`;
        wall_group.room_name = room_group.name;

        const wall_mesh = createWallMesh(wall.id, wall.type, wall.direction, room_info.size, dim, room_info.position);
        wall_group.add(wall_mesh);
        wall_group.castShadow = true;

        if (wall.door.length !== 0) {
            wall.door.forEach(_door => {
                const door_mesh = createDoorMesh(_door.id, _door.size, _door.position, 
                                                 wall.type, wall_mesh.position, 
                                                 dim);
                wall_group.add(door_mesh);
            })
        }

        if (wall.window.length !== 0) {
            wall.window.forEach(_window => {
                const window_mesh = createWindowMesh(_window.id, _window.size, _window.position, 
                                                     wall.type, wall_mesh.position, 
                                                     dim);
                wall_group.add(window_mesh);
            })
        }

        room_group.add(wall_group);
    });

    // add items
    room_info.item.forEach(item => {
        addLoadObj(room_group, item.name, item.size, item.position, item.id, 2);
    });

    addFloor(room_group, room_info.size, room_info.position);

    show_room.add(room_group)
};

export const addFloor = (room_group, room_size, room_position) => {
    const floor_mesh = createFloorMesh(room_size, room_position);
    const floor_group = new THREE.Group();
    floor_group.name = "group_floor";
    floor_group.room_name = room_group.name;
    floor_group.add(floor_mesh);
    
    room_group.add(floor_group);
}

export const addWindow = (wall_group, id, size, position, wall_type, wall_position, dim) => {
    const window_mesh = createWindowMesh(id ,size, position, wall_type, wall_position, dim);

    wall_group.add(window_mesh);
}

export const addDoor = (wall_group, id, size, position, wall_type, wall_position, dim) => {
    const door_mesh = createDoorMesh(id ,size, position, wall_type, wall_position, dim);

    wall_group.add(door_mesh);
}

export const addCeiling = (room) => {
    let ceilingExist = false;
    room.children.forEach((group) => {
        if (group.name.split("_")[1] === "ceiling") ceilingExist = true;
    });

    if(ceilingExist) return;
    const ceiling = createCeilingMesh(room.room_size, room.room_position);

    const group_ceiling = new THREE.Group();
    group_ceiling.name = "group_ceiling";
    group_ceiling.add(ceiling);
    room.add(group_ceiling);
}

export const addLight = (light_group, position, intensity) => {
   const light = createLightObject(position, intensity);
   light.shadow.camera = new THREE.OrthographicCamera(-80, 80, 80, -80, 0.5, 500);
   light.shadow.mapSize.width = 1024 * 4;
   light.shadow.mapSize.height = 1024 * 4;
   light_group.add(light);
}

export const addGrid = (group, size, division) => {
    const grid = new THREE.GridHelper(size, division, 0xFF0000, 0x808080);
    grid.position.setY(-0.11);
    grid.name = 'grid'
    grid.visible = true;
    group.add(grid);
}