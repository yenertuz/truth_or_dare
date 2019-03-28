import React from "react";

class Updates extends React.Component {
  render () {
    let updates = "";

    if (state.room_status == "waiting_to_start") {
      updates = state.room_description;
    }
    else if (  state.room_status == "waiting_for_spin"    ) {
      updates = state.room_description;
    } else if (state.asker_user_name == state.user_name) {
      updates = "YOU are asking " + state.replier_user_name;
    } else if (state.replier_user_name == state.user_name) {
      updates = state.asker_user_name + " is asking YOU";
    } else {
      updates = state.room_description;
    }

    return (
      <span id="updates-span">{updates}</span>
    );
  }

}

export default Updates;