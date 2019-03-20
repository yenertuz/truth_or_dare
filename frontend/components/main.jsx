import React from 'react';
import ReactDOM from 'react-dom';

class Main extends React.Component {
    render () {
        let create_room_onclick = () => {  ; };
        let join_room_onclick = () => {   ; };

        return (
            <div id="main-div" className="container">
                <span className="main">Truth or Dare</span>
                <button className="main create-room clickable" onClick={create_room_onclick}>Create Room</button>
                <button className="main join-room clickable" onClick={join_room_onclick}>Join Room</button>
            </div>
        );
    }
}

export default Main;