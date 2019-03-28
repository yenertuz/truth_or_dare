import React from 'react';
import ReactDOM from 'react-dom';
import { stringify } from 'querystring';
import $ from "jquery";

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

		let span_class = "";
		let create_button_onclick = () => { console.log("FAKE NEWS") };
		if (state.room_name_class == "error" || 
			state.name_class == "error" || 
			state.user_name == "" || state.user_name == undefined 
			|| state.room_name == "" || state.room_name == undefined
			) {
				span_class = "error";
		} else {
			create_button_onclick = () => {
				$.post({
					url: state.url + "/rooms/create.php",
					dataType: "json",
					data: {
            creator_id: state.user, 
            name: state.room_name,
            nickname: state.user_name
					},
					success: (data) => {
						if (data.error == "room_full") {
							state.last_error = "Room name taken. Please choose another room name."
						} else if (data.error != "bad_post") {
              state.is_game = 1;
              state.room_status = "waiting_to_start";
              state.room_id = data; delete state.room_name_class; delete state.name_class; delete state.target_room;
						}
						console.log(data);
            state.target_room = "";
						state.rerender();
					}
				});
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
            <span className="error" id="main-create-error-span">
			{state.last_error}</span>
			</div>
        );
    }
}

class MainJoin extends React.Component {
    render() {
        let go_back = () => {
			state.action = "";
			state.target_room = "";
			delete state.room_name_class; delete state.room_name; delete state.user_name;
			delete state.name_class;
			state.rerender();
		}

		if (state.room_name_class == undefined) {
			state.room_name_class = "";
		}
		if (state.name_class == undefined) {
			state.name_class = "";
		}

		let button_class = "";
		if (state.room_name_class == "error" || state.name_class == "error"
			 || state.user_name == undefined || state.user_name == "" 
			 || state.target_room == undefined || state.target_room == ""
			 ) {
			button_class = "error";
		}
		let join_button_onclick = "";
		if (button_class != "error") {
			join_button_onclick = () => {
				$.post({
					url: state.url + "/users/join.php",
					dataType: "json",
					data: {
            id: state.user, 
            room_name: state.target_room,
            user_name: state.user_name
					},
					success: (data) => {
						if (data.error == "room_full") {
              state.last_error = "The requested room is full";    
            } else if (data.error == "no_room") {
              state.last_error = "The room with the given name does not exist";
            } else if (data.error == "user_name_taken") {
              state.last_error = "Nickname taken. Please choose another nickname";
            } else if (data.error != "incorrect_post") {
              state.room_name = state.target_room ; 
              state.room_id = data; delete state.target_room; state.is_game = 1;
            }
            state.rerender();
          },
          error: (error) => {
            console.log(error);
          }
				});
			}; } else {
			join_button_onclick = () => {};
		}

		
		let room_name_onchange = (e, key) => {
			e.preventDefault();
			let tmp = "";
			tmp = e.target.value.toLowerCase();
			e.target.value = tmp;
			state[key] = is_room_name_okay(tmp);
			if (key == "room_name_class") { state.target_room = tmp; }
			else { state.user_name = tmp; }
			state.rerender();
		}

        return (
            <div id="main-join-div" className="container">
            <button id="main-join-button" onClick={go_back}><i className="fas fa-arrow-left"></i></button>
			<span id="main-join-span">Enter a room name to join. <br />
			<span className={state.room_name_class}>Room names are alphanumeric, lowercase, max 20 characters, can't be blank.</span></span>
			<input id="main-join-input" placeholder="Example: fun42" 
			onChange={(e) => {room_name_onchange(e, "room_name_class");}} value={state.target_room}/>
			<span id="main-join-name-span">Enter a nick name. 
			<span className={state.name_class}> Alphanumeric characters only, 20 character max, can't be blank.</span>
			<br />Case insensitive. Max 20 people per room</span>
			<input type="text" placeholder="Example: coolperson12" id="main-join-name-input"
			onChange={(e) => {room_name_onchange(e, "name_class");}}/>
			<button className={button_class} id="main-join-button-2"
			onClick={join_button_onclick} >Join</button>
      <span className="error" id="main-join-error-span">
			{state.last_error}</span>
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