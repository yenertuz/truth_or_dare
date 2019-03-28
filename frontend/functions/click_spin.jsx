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
      if (data.error == undefined)
      );
    }
  });

  state.rerender();
}


export default click_spin;