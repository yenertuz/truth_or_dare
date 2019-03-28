import React from 'react';
import ReactDOM from 'react-dom';
import Main from './frontend/components/main';
import Game from "./frontend/components/game";
import check_room_target from './frontend/functions/check_room_target';
import create_user from "./frontend/functions/create_user";
import $ from "jquery";
import { userInfo } from 'os';
import { strictEqual } from 'assert';

// import $ from 'jquery';
// import environment from "./environment";

var state = {};
// state.target_room = check_room_target();
state.room_id = "";
state.room_name = "";
state.is_game = 0;
state.url = "http://localhost:9090";
window.state = state; // Delete this line after development

class Root extends React.Component {
	constructor(props) {
		super(props);

		create_user();
		state.rerender = () => {
			this.setState({});
    };
	}
	
	render() {
		if (state.is_game == 1) {
      return (<Game />);
    } else {
      return (<Main />);
    }
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const root = document.getElementById("root");
	ReactDOM.render(<Root/>, root);
  });

$(window).on("unload",
  () => {
	  $.post({
		  url: state.url + "/users/delete.php",
		  data: {id: state.user},
		  dataType: "json",
		  async: false
	  });
  }
);