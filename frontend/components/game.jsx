import React from "react";
import SpinningAnimation from "./game/spinning_animation";
import Updates from "./game/updates";
import Options from "./game/options";

class Game extends React.Component {
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