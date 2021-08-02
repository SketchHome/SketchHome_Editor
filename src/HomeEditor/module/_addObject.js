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

//Error: issue 물체 추가가 되지 않음.
export const addLoadObj = (room, obj_name, obj_path, size, position, id, dim) => {
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
                room.add(object);
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

export const addRoom = (room_group, room, dim) => {
    room.wall.forEach(wall => {
        const wall_group = new THREE.Group();
        wall_group.name = `group_${wall.id}`;

        const wall_mesh = createWallMesh(wall.id, wall.type, wall.direction, room.size, dim);
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

    const floor_mesh = createFloorMesh(room.size);
    const floor_group = new THREE.Group();
    floor_group.name = "group_floor";
    floor_group.add(floor_mesh);
    
    room_group.add(floor_group);
};

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
    const ceiling = createCeilingMesh(room.size);

    const group_ceiling = new THREE.Group();
    group_ceiling.name = "group_ceiling";
    group_ceiling.add(ceiling);
    room.add(group_ceiling);
}

export const addLight = (light_group, position) => {
   const light = createLightObject(position);
   light_group.add(light);
}

export const removeLight = (light) => {
    light.dispose();
}