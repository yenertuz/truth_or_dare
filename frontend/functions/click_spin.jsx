function click_spin() {
  state.is_spinning = 1;
  state.rerender();
  $.post({
    url: state.url + "/game/spin.php",
    dataType: "json",
    data: {
      room_id: state.room_id, 
      room_name: state.room_name
    },
    success: () => {
      setTimeout( () => {
          state.is_spinning = 0;
          state.rerender();
        }, 1000
      );
    }
  });

  state.rerender();
}


export default click_spin;