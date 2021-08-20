import { setObjectDim } from "./_dim";

export const set2DMODE = (mapControls, controls, room) => {
    setZoomMode(controls, mapControls, 2);
    setObjectDim(room, 2);

    mapControls.object.position.set(0, 10, 0); //camera
    mapControls.object.lookAt(0,0,0);
    mapControls.target.set(0, 0, 0);
    // controls.target.lookAt(0, 10, 0);
    
    // controls.update();
    mapControls.update();
};

export const set3DMODE = (mapControls, controls, room) => {
    controls.object.position.set(5, 10, 5);
    controls.object.lookAt(0, 0, 0);
    controls.target.set(0, 0, 0);
    controls.update();
    setZoomMode(controls, mapControls, 3);
    setObjectDim(room, 3);
    controls.update();
};

export const setPersonViewMode = (viewControls, mapControls, controls, room) => {
    setZoomMode(controls, mapControls, 3);
    controls.enableRotate = false;
    controls.enableZoom = false;

    setObjectDim(room, 3);
    viewControls.getObject().position.set(0, 1.3, 0); //camera
    viewControls.getObject().lookAt(0, 1.3, 0.001);
    
    viewControls.lock();
}

export const setZoomMode = (controls, mapControls, mode) => {
    switch (mode) {
        case 2:
            controls.enabled = false;
            mapControls.enabled = true;
            mapControls.enableDamping = false;
            mapControls.enableKeys = false;
            mapControls.enablePan = true; //left
            mapControls.enableRotate = false; //right
            mapControls.enableZoom = true;
            break;
        case 3:
            mapControls.enabled = false;
            controls.enabled = true;
            controls.enableDamping = true;
            controls.enableKeys = true;
            controls.enablePan = false;
            controls.enableRotate = true;
            controls.enableZoom = true;
            break;
        default:
            break;
    }
};

export const setDragMode = (controls, mapControls) => {
    controls.enabled = false;
    mapControls.enabled = false;
};