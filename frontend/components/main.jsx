import React from 'react';
import ReactDOM from 'react-dom';
import { stringify } from 'querystring';

var is_room_name_okay = (room_name) => {
	let allowed = "abcdefghijklmnopqrstuvwxyz0123456789";
	let return_value = "";

	if (room_name.length > 20) {
		return "error";
	}
	room_name.split("").forEach(
		(element) => {
			if (allowed.includes(element) == false) {
				return_value = "error";
			}
		}
	);
	return return_value;
}

class MainOptions extends React.Component {
    render () {
        let create_room_onclick = () => {  
            state.action = "create";
            state.rerender();
        };
        let join_room_onclick = () => {
            state.action = "join";
            state.rerender();
        };

        return (
            <div id="main-options-div" className="container">
                <span className="main">Truth or Dare</span>
                <button className="main create-room clickable" onClick={create_room_onclick}>Create Room</button>
                <button className="main join-room clickable" onClick={join_room_onclick}>Join Room</button>
            </div>
        );
    }
}

class MainCreate extends React.Component {
    render() {
		if (state.span_class == undefined) {
			state.span_class = "";
		}

		let room_name_taken = "";
		if (state.room_name_taken == 1) {
			room_name_taken = <span className="error" id="main-create-error-span">
			Room name already exists. Please choose another room name</span>;
		} else {
			room_name_taken = "";
		}

		let create_button_onclick = "";
		if (state.span_class != "error") {
			create_button_onclick = () => {
				alert("CREATING");
			}
		}

        let go_back = () => {
            state.action = "";
            state.rerender();
		}
		
		let room_name_onchange = (e) => {
			e.preventDefault();
			let room_name = e.target.value.toLowerCase();
			e.target.value = room_name;
			state.span_class = is_room_name_okay(room_name);
			state.rerender();
		}

        return (
            <div id="main-create-div" className="container">
            <button onClick={go_back}><i className="fas fa-arrow-left"></i></button>
			<span id="main-create-span">Enter a room name. <span className={state.span_class}>Alphanumeric characters only, 20 character max</span><br />Case insensitive. Max 20 people per room</span>
			<input type="text" placeholder="Example: cool42" id="main-create-input" onChange={(e) => {room_name_onchange(e);}}/>
			<button id="main-create-button" className={state.span_class} onClick={create_button_onclick}>Create Room</button>
            {room_name_taken}
			</div>
        );
    }
}

class MainJoin extends React.Component {
    render() {
        let go_back = () => {
            state.action = "";
            state.rerender();
		}

		if (state.span_class == undefined) {
			state.span_class = "";
		}
		let join_button_onclick = "";
		if (state.span_class != "error") {
			join_button_onclick = () => {
				state.target_room = state.temp;
				state.temp = "";
				state.rerender();
			};
		} else {
			join_button_onclick = () => {};
		}
		
		let room_name_onchange = (e) => {
			e.preventDefault();
			state.temp = e.target.value.toLowerCase();
			e.target.value = state.temp;
			state.span_class = is_room_name_okay(state.temp);
			state.rerender();
		}

        return (
            <div id="main-join-div" className="container">
            <button id="main-join-button" onClick={go_back}><i className="fas fa-arrow-left"></i></button>
			<span id="main-join-span">Enter a room name to join. <br />
			<span className={state.span_class}>Room names are alphanumeric, lowercase, max 20 characters.</span></span>
			<input id="main-join-input" placeholder="Example: fun42" onChange={(e) => {room_name_onchange(e);}} />
			<button className={state.span_class} id="main-join-button-2"
			onClick={join_button_onclick} >Join</button>
            </div>
        );
    }
}

class Main extends React.Component {
    render () {
        if (state.action == "create") {
            return (<MainCreate />);
        } else if (state.action == "join") {
            return (<MainJoin />);
        } else {
            return (<MainOptions />);
        }
    }
}

export default Main;