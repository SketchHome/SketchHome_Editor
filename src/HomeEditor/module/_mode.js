import { setObjectDim } from "./_dim";

export const set2DMODE = (camera, controls, room) => {
    camera.position.set(0, 10, 0);
    camera.lookAt(0, 0, 0);
    controls.target.set(0, 0, 0);
    setZoomMode(controls, 2);
    setObjectDim(room, 2)
    controls.update();

    camera.position.set(0, 10, 0);
    camera.lookAt(0, 0, 0);
    controls.update();
};

export const set3DMODE = (camera, controls, room) => {
    camera.position.set(5, 10, 5);
    camera.lookAt(0, 0, 0);
    controls.target.set(0, 0, 0);
    controls.update();
    setZoomMode(controls, 3);
    setObjectDim(room, 3);
    controls.update();
};

export const setPersonViewMode = (viewControls, controls, room) => {
    setZoomMode(controls, 3);
    controls.enableRotate = false;
    controls.enableZoom = false;

    setObjectDim(room, 3);
    viewControls.getObject().position.set(0, 1.3, 0); //camera
    viewControls.getObject().lookAt(0, 1.3, 0.001);
    
    viewControls.lock();
}

export const setZoomMode = (controls, mode) => {
    switch (mode) {
        case 2:
            controls.enabled = true;
            controls.enableDamping = false;
            controls.enableKeys = false;
            controls.enablePan = false;
            controls.enableRotate = false;
            controls.enableZoom = true;
            break;
        case 3:
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

export const setDragMode = (controls) => {
    controls.enabled = false;
};