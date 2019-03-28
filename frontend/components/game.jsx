import React from "react";
import SpinningAnimation from "./game/spinning_animation";
import Updates from "./game/updates";
import Options from "./game/options";
import start_sse from "../functions/start_sse";

class Game extends React.Component {
  constructor(props) {
    super(props);
    start_sse();
  }  
  
  render () {
            if (state.is_spinning == 1) {
              return (<SpinningAnimation />);
            } else {
              return (
                <div className="container" id="game-container">
                  <Updates />
                  <Options />
                </div>
              );
            }
    }
}

export default Game;