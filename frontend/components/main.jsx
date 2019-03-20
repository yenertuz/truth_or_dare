import React from 'react';
import ReactDOM from 'react-dom';

class MainOptions extends React.Component {
    render () {
        let create_room_onclick = () => {  ; };
        let join_room_onclick = () => {   ; };

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
        <div id="main-create-div" className="container">
        <span>Main Create</span>
        <button onClick={() => {state.action = "";}}>Go back</button>
        </div>
    }
}

class MainJoin extends React.Component {
    render() {
        <div id="main-join-div" className="container">
        <span>Main Join</span>
        <button onClick={() => {state.action = "";}}>Go back</button>
        </div>
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