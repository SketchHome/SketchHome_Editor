import React, { Component } from "react";

//Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//three.js controller
import * as THREE from "three";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { setMouseEvent, setButtonEvent, setInputEvent, setKeyboardEvent } from "./module/_event";
import { addLoadObj, addRoom } from "./module/_addObject";

//경로 확인 완료
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
		camera.position.y = 10;
		this.mount.appendChild(renderer.domElement);

		var ambientLight = new THREE.AmbientLight(0xffffff, 1); // soft white light
		scene.add( ambientLight );
		let target = [];
		let drag_target = [];
		const controls = new OrbitControls(camera, renderer.domElement);
		const dragControls = new DragControls(drag_target, camera, renderer.domElement);
		const mouse = new THREE.Vector2();
		const raycaster = new THREE.Raycaster();

		controls.enabled = false;
		dragControls.transformGroup = true;
		dragControls.enabled = false;

		// add something
		const room = new THREE.Group();
		room.view_mode = 2;
		room.is_person_view_mode = false;
		room.name = "room";
		addRoom(room, room_data.room, 2);
		room_data.room.item.forEach(item => {
			addLoadObj(room, item.name, item.size, item.position, item.id, 2);
		});
		scene.add(room);

		// set event
		setKeyboardEvent(controls, camera, room);
		setMouseEvent(width, height, mouse, camera, scene, raycaster, target, drag_target, dragControls, room);
		setButtonEvent(camera, controls, scene, target, drag_target, room);
		setInputEvent(room, target);

		const animate = function () {
			requestAnimationFrame(animate);
			renderer.render(scene, camera);
		};
		animate();
	}

	render() {
		return (
			<Container fluid>
				<div>
					<Row>
						<Col>	
							<Detailer />
						</Col>	
						<Col>
							<div
							className="Scene"
							style={{ width: "1000px", height: "90vh" }}
							ref={(mount) => { this.mount = mount }} />
						</Col>
					</Row>
			</div>
			</Container>
		)
	}
}

export default Editor