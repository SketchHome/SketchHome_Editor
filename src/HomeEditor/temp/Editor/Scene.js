import React, { Component } from 'react'
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

import ItemList from './ItemList/ItemList'

import './Scene.css'

/*
 * 위 컴포넌트는 3d 모델링 대용 컴포넌트입니다. 
 * 추후에 분리 작업을 할 예정입니다.
 * 현재는 분리없이 한 파일 내에서 작업을 진행했습니다.
 */
class Scene extends Component {
	constructor(props) {
		super(props)

		this.animate = this.animate.bind(this)
		this.changeZoomMode = this.changeZoomMode.bind(this)
		this.changeDragMode = this.changeDragMode.bind(this)
		this.change3DMode = this.change3DMode.bind(this)
		this.change2DMode = this.change2DMode.bind(this)
	}

	componentDidMount() {
		this.sceneInit()
		this.animate()
	}

	/**
	 * 3d 모델링 화면 초기 설정을 위한 함수입니다.
	 * 초기 카메라, 여러 Object 등 설정을 합니다.
	 * 설정 후 화면에 뿌려줍니다.
	 */
	sceneInit() {
		const width = this.mount.clientWidth
		const height = this.mount.clientHeight

		const scene = new THREE.Scene()
		const camera = new THREE.PerspectiveCamera(
			75,
			width / height,
			0.1,
			1000
		)
		camera.position.set(0, 10, 0)

		const renderer = new THREE.WebGLRenderer({ antialias: true })
		this.mount.appendChild(renderer.domElement)

		const controls = new OrbitControls(camera, renderer.domElement)
		controls.enabled = false

		let activateObjects = []
		let activateItems = []
		let objects = {
			wall: [],
			window: [],
			door: [],
			item: []
		}
		let dragObject = []
		const dragControls = new DragControls(dragObject, camera, renderer.domElement)
		dragControls.transformGroup = true

		const grid = new THREE.GridHelper(15, 15)
		// scene.add(grid)
		renderer.setClearColor('#ffffff')
		renderer.setSize(width, height)

		this.scene = scene
		this.controls = controls
		this.camera = camera
		this.activateObjects = activateObjects
		this.activateItems = activateItems
		this.objects = objects
		this.renderer = renderer
		this.dragObject = []
		
		// this.addObjects(2)

		// this.test_load()
		var geometry = new THREE.BoxGeometry();
		var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
		var cube = new THREE.Mesh(geometry, material);
		scene.add(cube);

		const raycaster = new THREE.Raycaster()
		const mouse = new THREE.Vector2()
		this.raycaster = raycaster
		this.mouse = mouse

		// window.addEventListener('mousemove', this.onMouseMove, false)

		window.addEventListener('mouseup', this.onMouseMove, false)
		// window.addEventListener('mousedown', this.onMouseMove, false)
	}

	onMouseMove = (event) => {
		event.preventDefault()
		this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

		this.raycaster.setFromCamera(this.mouse, this.camera);
		const intersects = this.raycaster.intersectObjects(this.scene.children, true);
		console.log(this.mouse.x, this.mouse.y, this.scene.children)
		console.log(this.dragObject)
		if (intersects.length > 0) {
			if (this.dragObject.length == 0) {
				if (intersects[0].object.parent.type === "Scene") {
					this.dragObject.push(intersects[0].object);
					intersects[0].object.material.color.set(Math.random() * 0xff0000);
					console.log("capture objects: ", intersects[0].object);
					console.log("capture target: ", this.dragObject)
				}
				else if (intersects[0].object.parent.type === "Group") {
					console.log(intersects[0].object)
					this.dragObject.push(intersects[0].object.parent);
					console.log("capture objects: ", intersects[0].object.parent);
				}
			}
		}
		else {
			const obj = this.dragObject.pop()
			console.log("drag out obj: ", obj);
		}
	}

	test_load = () => {
		// loader test
		const loader = new OBJLoader();
		loader.load(
			// resource URL
			'Zuccarello.obj',
			// called when resource is loaded
			(object) => {
				object.scale.set(0.007, 0.007, 0.007);
				this.scene.add(object);
				this.activateItems.push(object);
			},
			// called when loading is in progresses
			(xhr) => {
				console.log((xhr.loaded / xhr.total * 100) + '% loaded');
			},
			// called when loading has errors
			(error) => {
				console.log('An error happened');
				console.log(error);
			}
		);
	}

	animate() {
		requestAnimationFrame(this.animate)

		this.renderer.render(this.scene, this.camera)
	}

	/**
	 * 여러 Object들을 Scene에 추가하는 함수입니다.
	 * 벽, 창문, 문, 소품들을 Mesh로 생성하여 Scene에 추가합니다.
	 * @param {int} dimension 
	 */
	addObjects(dimension) {
		const wall = this.props.wall.map(wall => this.wallMesh(dimension, wall.type, wall.length, wall.position))
		const window = this.props.window.map(window => this.windowMesh(dimension, window.type, window.length, window.position))
		const door = this.props.door.map(door => this.doorMesh(dimension, door.type, door.length, door.position))
		// const item = this.props.item.map(item => this.itemMesh(dimension, item.size, item.position))

		wall.forEach((wall) => {
			this.scene.add(wall)
			this.objects.wall.push(wall)
		})

		window.forEach((window) => {
			this.scene.add(window)
			this.activateObjects.push(window)
			this.objects.window.push(window)
		})

		door.forEach((door) => {
			this.scene.add(door)
			this.activateObjects.push(door)
			this.objects.door.push(door)
		})

		// item.forEach((item) => {
		// 	this.scene.add(item)
		// 	this.activateObjects.push(item)
		// 	this.objects.item.push(item)
		// })
	}

	/**
	 * 벽을 Mesh로 생성하여 반환하는 함수입니다.
	 * @param {int} dimension 
	 * @param {String} type 
	 * @param {float} length 
	 * @param {float} position 
	 */
	wallMesh(dimension, type, length, position) {
		const material = new THREE.MeshBasicMaterial({ color: 'orange' })
		const geometry = new THREE.BoxGeometry(1, 1, 1)
		const wall_mesh = new THREE.Mesh(geometry, material)

		const height = (dimension === 2) ? 0.0001 : 2
		const y_position = (dimension === 2) ? 0 : height / 2

		switch (type) {
			case 'horizon':
			default:
				wall_mesh.scale.set(length, height, 0.1)
				wall_mesh.position.set(0, y_position, position)
				break;
			case 'vertical':
				wall_mesh.scale.set(0.1, height, length)
				wall_mesh.position.set(position, y_position, 0)
				break;
		}

		return wall_mesh
	}

	/**
	 * 창문을 Mesh로 생성하여 반환하는 함수입니다.
	 * @param {int} dimension 
	 * @param {String} type 
	 * @param {float} length 
	 * @param {float} position 
	 */
	windowMesh(dimension, type, length, position) {
		const material = new THREE.MeshBasicMaterial({ color: 'blue' })
		const geometry = new THREE.BoxGeometry(1, 1, 1)
		const window_mesh = new THREE.Mesh(geometry, material)

		const height = (dimension === 2) ? 0.0001 : 1
		const y_position = (dimension === 2) ? 0 : 1

		switch (type) {
			case 'horizon':
			default:
				window_mesh.scale.set(length, height, 0.3)
				window_mesh.position.set(0, y_position, position)
				break;
			case 'vertical':
				window_mesh.scale.set(0.3, height, length)
				window_mesh.position.set(position, y_position, 0)
				break;
		}

		return window_mesh
	}

	/**
	 * 문을 Mesh로 생성하여 반환하는 함수입니다.
	 * @param {int} dimension 
	 * @param {String} type 
	 * @param {float} length 
	 * @param {float} position 
	 */
	doorMesh(dimension, type, length, position) {
		const material = new THREE.MeshBasicMaterial({ color: 'red' })
		const geometry = new THREE.BoxGeometry(1, 1, 1)
		const door_mesh = new THREE.Mesh(geometry, material)

		const height = (dimension === 2) ? 0.0001 : 2
		const y_position = (dimension === 2) ? 0 : height / 2

		switch (type) {
			case 'horizon':
			default:
				door_mesh.scale.set(length, height, 0.3)
				door_mesh.position.set(0, y_position, position)
				break;
			case 'vertical':
				door_mesh.scale.set(0.3, height, length)
				door_mesh.position.set(position, y_position, 0)
				break;
		}

		return door_mesh
	}

	/**
	 * 소품을 Mesh로 생성하여 반환하는 함수입니다.
	 * @param {int} dimension 
	 * @param {String} type 
	 * @param {float} length 
	 * @param {float} position 
	 */
	itemMesh(dimension, size, position) {
		const material = new THREE.MeshBasicMaterial({ color: 'green' })
		const geometry = new THREE.BoxGeometry(1, 1, 1)
		const item_mesh = new THREE.Mesh(geometry, material)

		const height = (dimension === 2) ? 0.0001 : 1
		const y_position = (dimension === 2) ? 0 : height / 2

		item_mesh.scale.set(size.x, height, size.z)
		item_mesh.position.set(position.x, y_position, position.z)
		return item_mesh
	}

	/**
	 * Zoom 기능 활성화하는 함수입니다.
	 * 현재 버튼 클릭 이벤트로 사용되고 있습니다.
	 * Zoom 기능을 활성화하면 Drag 기능은 사용하지 못합니다.
	 */
	changeZoomMode() {
		this.controls.enabled = true
		this.controls.enableDamping = false
		this.controls.enableKeys = false
		this.controls.enablePan = false
		this.controls.enableRotate = false
		this.controls.enableZoom = true
	}

	/**
	 * Drag 기능 활성화하는 함수입니다.
	 * 현재 버튼 클릭 이벤트로 사용되고 있습니다.
	 * Drag 기능을 활성화하면 Zoom 기능은 사용하지 못합니다.
	 */
	changeDragMode() {
		this.controls.enabled = false
	}

	/**
	 * 3D 모드로 변환하는 함수입니다.
	 * 현재 버튼 클릭 이벤트로 사용되고 있습니다.
	 * 카메라 세팅이 변경되고, Object들의 높이가 적용됩니다.
	 */
	change3DMode() {
		this.camera.position.set(5, 10, 5)
		this.camera.lookAt(0, 0, 0)
		this.controls.enabled = true
		this.controls.enableDamping = true
		this.controls.enableKeys = true
		this.controls.enablePan = true
		this.controls.enableRotate = true
		this.controls.enableZoom = true

		this.changeObjectDimension(3)
	}

	/**
	 * 2D 모드로 변환하는 함수입니다.
	 * 현재 버튼 클릭 이벤트로 사용되고 있습니다.
	 * 카메라 세팅이 변경되고, Object들의 높이가 적용되지않습니다.
	 */
	change2DMode() {
		this.controls.enabled = false
		this.camera.position.set(0, 10, 0)
		this.camera.lookAt(0, 0, 0)

		this.changeObjectDimension(2)
	}

	/**
	 * Object들의 차원을 변경해주는 함수입니다.
	 * Object들의 높이가 차원에 맞추어서 변경됩니다.
	 * 2D --> 0.0001
	 * 3D --> Object 실제 높이 (현재는 임의의 value로 설정되어있습니다.)
	 */
	changeObjectDimension(dimension) {
		this.objects.wall.forEach((obj) => {
			obj.scale.y = (dimension === 2) ? 0.0001 : 2
			obj.position.y = (dimension === 2) ? 0 : obj.scale.y / 2
		})
		this.objects.window.forEach((obj) => {
			obj.scale.y = (dimension === 2) ? 0.0001 : 1
			obj.position.y = (dimension === 2) ? 0 : 1
		})
		this.objects.door.forEach((obj) => {
			obj.scale.y = (dimension === 2) ? 0.0001 : 2
			obj.position.y = (dimension === 2) ? 0 : obj.scale.y / 2
		})
		this.objects.item.forEach((obj) => {
			obj.scale.y = (dimension === 2) ? 0.0001 : 2
			obj.position.y = (dimension === 2) ? 0 : obj.scale.y / 2
		})
	}


	render() {
		return (
			<div>
				{/* <ItemList /> */}
				<div
					className="Scene"
					ref={(mount) => { this.mount = mount }}
				/>
				{/* <div>
					<div>
						<button onClick={this.change2DMode} style={{ width: '100px' }}>2D Mode</button>
						<button onClick={this.change3DMode} style={{ width: '100px' }}>3D Mode</button>
					</div>
					<div>
						<button onClick={this.changeZoomMode} style={{ width: '100px' }}>Zoom Mode</button>
						<button onClick={this.changeDragMode} style={{ width: '100px' }}>Drag Mode</button>
					</div>
				</div> */}
			</div>
		)
	}
}

export default Scene