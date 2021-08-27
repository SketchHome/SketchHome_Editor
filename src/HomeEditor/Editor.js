import React, { Component, useState } from "react";

import * as THREE from "three";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { MapControls, OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PointerLockControls} from "three/examples/jsm/controls/PointerLockControls";

import { setMouseEvent, setButtonEvent, setInputEvent, setKeyboardEvent } from "./module/_event";
import { addGrid, addLight, addRoom } from "./module/_addObject";

import {ViewMode, EditMode, GetInfo, ShowInfo, MoveThings, FWColor, WallColor, AddWF, Room, Light, Item, Ceiling} from "./Detailer/Detailer";
import ItemList from "./Detailer/ItemList";
import FloorList from "./Detailer/FloorList";
import WallList from "./Detailer/WallList";

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

		let target = [];
		let drag_target = [];
		let context_target = [];
		const controls = new OrbitControls(camera, renderer.domElement);
		const dragControls = new DragControls(drag_target, camera, renderer.domElement);
		const viewControls = new PointerLockControls(camera, renderer.domElement);
		const mapControls = new MapControls (camera, renderer.domElement);
		const mouse = new THREE.Vector2();
		const raycaster = new THREE.Raycaster();

		controls.enabled = false;
		dragControls.transformGroup = true;
		dragControls.enabled = false;
		mapControls.enabled = false;

		const light = new THREE.Group();
		var ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
		light.add(ambientLight);
		addLight(light, {x : 0, y : 3, z : 0}, 0.3);
		light.name = 'light_group';
		scene.add(light);

		// add something
		const room = new THREE.Group();
		room.view_mode = 2;
		room.is_zoom_mode = true;
		room.is_edit_mode = false;
		room.edit_mode = 'None';
		room.is_person_view_mode = false;
		room.name = "room";
		room.size = room_data.room.size;

		//유사 배열의 경우 배열 메서드를 쓸 수 없다.
		//배열 메서드를 사용할 경우 에러가 난다.
	
		[].forEach.call(room_data.room, function(room_info) {
			addRoom(room, room_info, 2);
		});

		scene.add(room);

		// add grid
		const grid = new THREE.Group();
		grid.name = "group_grid";
		addGrid(grid, 100, 100);
		scene.add(grid);
		
		// set event
		setKeyboardEvent(viewControls, controls, raycaster, camera, scene, room);
		setMouseEvent(width, height, mouse, viewControls, camera, scene, raycaster, target, drag_target, dragControls, room, context_target);
		setButtonEvent(camera, viewControls, controls, mapControls, scene, target, drag_target, room, light, context_target);
		setInputEvent(room, target);

		const animate = function () {
			requestAnimationFrame(animate);
			renderer.render(scene, camera);
		};
		animate();
	}

	render() {
		return (
			<div className="Editor-fix">
				<div
					className="Scene"
					style={{ width: "95%", height: "90%" }}
					ref={(mount) => { this.mount = mount }} />
				{/*<ViewMode/><GetInfo/>*/}
				<EditMode visible="none"/>
				<ShowInfo visible="none"/>
				<MoveThings visible="none"/>
				<FWColor visible="none"/>
				<WallColor visible="none"/>
				<Room visible="none"/>
				<Light visible="none"/>
				<Item visible="none"/> {/*아이템 사이즈 조절은 아직 안 넣음*/}
				<Ceiling visible="none"/>
				<AddWF visible="none"/>
			</div>
		)
	}
}

export default Editor