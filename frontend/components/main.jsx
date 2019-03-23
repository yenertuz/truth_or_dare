import React from 'react';
import ReactDOM from 'react-dom';
import { stringify } from 'querystring';

var is_room_name_okay = (room_name) => {
	let allowed = "abcdefghijklmnopqrstuvwxyz0123456789";
	let return_value = "";

	if (room_name.length > 20 || room_name.length == 0) {
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
		if (state.room_name_class == undefined) {
			state.room_name_class = "";
		}
		if (state.name_class == undefined) {
			state.name_class = "";
		}

		let room_name_taken = "";
		if (state.room_name_taken == 1) {
			room_name_taken = <span className="error" id="main-create-error-span">
			Room name already exists. Please choose another room name</span>;
		} else {
			room_name_taken = "";
		}
		let span_class = "";
		let create_button_onclick = "";
		if (state.room_name_class == "error" || 
			state.name_class == "error" || 
			state.user_name == "" || state.user_name == undefined 
			|| state.room_name == "" || state.room_name == undefined
			) {
				span_class = "error";
		} else {
			create_button_onclick = () => {
				alert("CREATING");
			}
		}

        let go_back = () => {
			state.action = "";
			delete state.span_class; delete state.room_name; delete state.user_name;
			delete state.name_class;
			delete state.room_name_class;
            state.rerender();
		}
		
		let room_name_onchange = (e, key) => {
			e.preventDefault();
			let room_name = e.target.value.toLowerCase();
			e.target.value = room_name;
			state[key] = is_room_name_okay(room_name);
			key == "name_class" ? state.user_name = room_name : state.room_name = room_name;
			state.rerender();
		}

        return (
            <div id="main-create-div" className="container">
            <button onClick={go_back}><i className="fas fa-arrow-left"></i></button>
			<span id="main-create-span">Enter a room name. <span className={state.room_name_class}>Alphanumeric characters only, 20 character max</span><br />Case insensitive. Max 20 people per room</span>
			<input type="text" placeholder="Example: cool42" id="main-create-input" 
			onChange={(e) => {room_name_onchange(e, "room_name_class");}}/>
			<span id="main-create-name-span">Enter a nick name. 
			<span className={state.name_class}> Alphanumeric characters only, 20 character max.</span>
			<br />Case insensitive. Max 20 people per room</span>
			<input type="text" placeholder="Example: coolperson12" id="main-create-name-input"
			onChange={(e) => {room_name_onchange(e, "name_class");}}/>
			<button id="main-create-button" className={span_class} onClick={create_button_onclick}>Create Room</button>
            {room_name_taken}
			</div>
        );
    }
}

class MainJoin extends React.Component {
    render() {
        let go_back = () => {
			state.action = "";
			state.target_room = "";
			delete state.span_class; delete state.room_name; delete state.user_name;
			delete state.name_class;
			delete state.room_name_class;
			state.rerender();
		}

		if (state.span_class == undefined) {
			state.span_class = "";
		}
		if (state.name_class == undefined) {
			state.name_class = "";
		}

		let button_class = "";
		if (state.span_class == "error" || state.name_class == "error"
			 || state.user_name == undefined || state.user_name == "" 
			 || state.target_room == undefined || state.target_room == ""
			 ) {
			button_class = "error";
		}
		let join_button_onclick = "";
		if (state.span_class != "error" && state.name_class != "error") {
			join_button_onclick = () => {
				alert("JOINING");
			};
		} else {
			join_button_onclick = () => {};
		}

		
		let room_name_onchange = (e, key) => {
			e.preventDefault();
			let tmp = "";
			tmp = e.target.value.toLowerCase();
			e.target.value = tmp;
			state[key] = is_room_name_okay(tmp);
			if (key == "span_class") { state.target_room = tmp; }
			if (key == "name_class") { state.user_name = tmp; }
			state.rerender();
		}

        return (
            <div id="main-join-div" className="container">
            <button id="main-join-button" onClick={go_back}><i className="fas fa-arrow-left"></i></button>
			<span id="main-join-span">Enter a room name to join. <br />
			<span className={state.span_class}>Room names are alphanumeric, lowercase, max 20 characters, can't be blank.</span></span>
			<input id="main-join-input" placeholder="Example: fun42" 
			onChange={(e) => {room_name_onchange(e, "span_class");}} value={state.target_room}/>
			<span id="main-join-name-span">Enter a nick name. 
			<span className={state.name_class}> Alphanumeric characters only, 20 character max, can't be blank.</span>
			<br />Case insensitive. Max 20 people per room</span>
			<input type="text" placeholder="Example: coolperson12" id="main-join-name-input"
			onChange={(e) => {room_name_onchange(e, "name_class");}}/>
			<button className={button_class} id="main-join-button-2"
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