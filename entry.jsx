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
if (location.hostname != "localhost")
  location.assign("http://localhost:8080?room=test"); // Just for when working on Main Create

class Root extends React.Component {
	constructor(props) {
		super(props);

		// let create_user = () => {
		// 	fetch("http://URL/create_user.php")
		// };
		// state.user = create_user();
		state.rerender = () => {
			this.setState({});
		};
	}
	
	render() {
		if (state.target_room != "") {
			state.action = "join";
			return (<Main />);
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
