import React, { Component } from "react";

import * as THREE from "three";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PointerLockControls} from "three/examples/jsm/controls/PointerLockControls";

import { setMouseEvent, setButtonEvent, setInputEvent, setKeyboardEvent } from "./module/_event";
import { addLight, addLoadObj, addRoom } from "./module/_addObject";

import Detailer from "./Detailer/Detailer"

import room_data from "./data/room_1_data.json";

class Editor extends Component {
	componentDidMount() {
		// === THREE.JS CODE START ===

		// scene setting
		const width = this.mount.clientWidth
		const height = this.mount.clientHeight
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
		const renderer = new THREE.WebGLRenderer();

		renderer.setClearColor("#ffffff")
		renderer.setSize(width, height);
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		renderer.shadowMap.renderReverseSided = false;
		camera.position.y = 10;
		this.mount.appendChild(renderer.domElement);

		//var ambientLight = new THREE.AmbientLight(0xffffff, 1); // soft white light
		//scene.add( ambientLight );

		let target = [];
		let drag_target = [];
		const controls = new OrbitControls(camera, renderer.domElement);
		const dragControls = new DragControls(drag_target, camera, renderer.domElement);
		const viewControls = new PointerLockControls(camera, renderer.domElement);
		const mouse = new THREE.Vector2();
		const raycaster = new THREE.Raycaster();

		controls.enabled = false;
		dragControls.transformGroup = true;
		dragControls.enabled = false;

		const light = new THREE.Group();
		var ambiendLight = new THREE.AmbientLight(0xffffff, 0.55);
		light.add(ambiendLight);
		addLight(light, {x : 0, y : 30, z : 0}, 0);
		light.name = 'light_group';
		console.log(light);
		scene.add(light);

		// add something
		const room = new THREE.Group();
		room.view_mode = 2;
		room.is_person_view_mode = false;
		room.name = "room";
		room.size = room_data.room.size;
		addRoom(room, room_data.room, 2);
		room_data.room.item.forEach(item => {
			addLoadObj(room, item.name, item.size, item.position, item.id, 2);
		});
		scene.add(room);

		// set event
		setKeyboardEvent(viewControls, controls, raycaster, camera, scene, room);
		setMouseEvent(width, height, mouse, viewControls, camera, scene, raycaster, target, drag_target, dragControls, room);
		setButtonEvent(camera, viewControls, controls, scene, target, drag_target, room);
		setInputEvent(room, target);

		const animate = function () {
			requestAnimationFrame(animate);
			renderer.render(scene, camera);
		};
		animate();
	}

	render() {
		return (
			<div>
				<div
					className="Scene"
					style={{ width: "900px", height: "400px" }}
					ref={(mount) => { this.mount = mount }} />
				<Detailer />
			</div>
		)
	}
}

export default Editor