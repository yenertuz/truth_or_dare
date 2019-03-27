import React from "react";
import click_spin from "../../functions/click_spin";
import click_truth_or_dare from "../../functions/click_truth_or_dare";

class Options extends React.Component {
  render () {
    let click_truth = () => { click_truth_or_dare("truth"); }
    let click_dare = () => { click_truth_or_dare("dare"); }
    let spin = <button className="truth-or-dare-button" onClick={click_spin}>Spin</button>;
    let truth_or_dare = (
      <span id="truth-or-dare-buttons-span">
      <button className="truth-or-dare-button" onClick={click_truth}>Truth</button>
      <button className="truth-or-dare-button" onClick={click_dare}>Dare</button>
      </span>
    )

    let options = "";
    if (state.room_status == "waiting_for_spin" && state.user_name == state.asker_user_name ) {
      options = spin;
    } else if (state.room_status == "waiting_for_choice" && state.user_name == state.replier_user_name) {
      options = truth_or_dare;
    }

    return (
      <p>{options}</p>
    );
  }

}

export default Options;