import React from 'react';
import ReactDOM from 'react-dom';

class Main extends React.Component {
    render () {
        return (
            <div id="main-div">
                <span className="main">Truth or Dare</span>
                <button className="main create-room">Create Room</button>
                <button className="main join-room">Join Room</button>
            </div>
        );
    }
}

export default Main;