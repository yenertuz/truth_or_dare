import React from "react";

class SpinningAnimation extends React.Component {
  render () {
    return (
      <div className="container" id="spinning-div">
      <span id="spinning-span">Spinning...</span>
      <img src="assets/spinning_bottle.gif" id="img-spinning-bottle"/>
      </div>
    );
  }

}

export default SpinningAnimation;