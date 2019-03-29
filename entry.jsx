import React from 'react';
import ReactDOM from 'react-dom';
import Main from './frontend/components/main';
import Game from "./frontend/components/game";
import check_room_target from './frontend/functions/check_room_target';
import create_user from "./frontend/functions/create_user";
import $ from "jquery";
import { userInfo } from 'os';
import { strictEqual } from 'assert';

var state = {};
state.room_id = "";
state.room_name = "";
state.is_game = 0;
state.url = "https://server.yenertuz.com/";

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