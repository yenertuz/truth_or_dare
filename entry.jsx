import React from 'react';
import ReactDOM from 'react-dom';
import RoomConnector from './frontend/components/room_connector';
import Main from './frontend/components/main';
import Game from "./frontend/components/game";
import check_room_target from './frontend/functions/check_room_target';
// import $ from 'jquery';
// import environment from "./environment";

var state = {};
state.target_room = check_room_target();
state.room = "";
window.state = state; // Delete this line after development

class Root extends React.Component {
	constructor(props) {
		super(props);
		state.rerender = () => {
			this.setState({});
		};
	}
	
	render() {
		if (state.target_room != "") {
			return (<RoomConnector />);
		} 
		else if (state.room != "") {
			return (<Game />);
		}
		else {
			return (<Main />);
		}
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const root = document.getElementById("root");
	ReactDOM.render(<Root/>, root);
  });
