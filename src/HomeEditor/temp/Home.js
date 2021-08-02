import React, { Component } from "react";

import Editor from './Editor/Editor'
import TopMenu from './Menu/TopMenu'

import './Home.css'

class Home extends Component {
	render() {
		return (
			<div className="Home">
                {/* <TopMenu /> */}
                <Editor />
			</div>
		);
	}
}

export default Home;
