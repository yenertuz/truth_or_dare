import React from 'react';
import ReactDOM from 'react-dom';
import RoomConnector from './frontend/components/room_connector';
import Main from './frontend/components/main';
import check_room_target from './frontend/functions/check_room_target';
// import $ from 'jquery';
// import environment from "./environment";

var state = {};
state.target_room = check_room_target();
window.state = state;

class Root extends React.Component {
	render() {
		if (state.target_room != "") {
			return (<RoomConnector />);
		} else {
			return (<Main />);
		}
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const root = document.getElementById("root");
	ReactDOM.render(<Root/>, root);
  });
