import $ from "jquery";

function click_spin() {
  state.rerender();
  $.post({
    url: state.url + "/game/spin.php",
    dataType: "json",
    data: {
      room_id: state.room_id, 
      room_name: state.room_name
    },
    success: (data) => {
      if (data.error != undefined) {
        if (data.error == "too_few_people") {
          state.last_error = "Fewer than 2 people in the room. Please wait until more poeple join!";
        }
      }
      else {
        delete state.last_error;
      }
      state.rerender();
    }
  });

  state.rerender();
}


export default click_spin;