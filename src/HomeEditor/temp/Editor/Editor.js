import React, { Component } from "react";

import Scene from './Scene'

import './Editor.css';

import room_data from '../../data/room_1_data.json';

class Editor extends Component {
	constructor(props) {
		super(props)

		this.state = {
			wall: room_data.showroom.wall,
			window: room_data.showroom.window,
			door: room_data.showroom.door,
			item: room_data.showroom.item
		}
	}

	render() {
		return (
			<div className="Editor">
				<Scene
					window={this.state.window}
					wall={this.state.wall}
					door={this.state.door}
					item={this.state.item} />
			</div>
		);
	}
}

export default Editor;
