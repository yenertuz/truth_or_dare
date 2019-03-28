function start_sse () {
  let source_url = state.url + "/game/sse.php?room_id=" + state.room_id;

  let source = new EventSource(source_url);
  source.onmessage = (event) => {
    let response_object = JSON.parse(event.data);
    if (state.room_status != "waiting_for_choice") {
      state.is_spinning = 1;
    }
    state.room_description = response_object.description;
    state.room_status = response_object.status;
    state.asker_user_name = response_object.asker_user_name;
    state.replier_user_name = response_object.replier_user_name;
    setTimeout(
      () => {
        state.is_spinning = 0;
        state.rerender();
      }, 1000
    );
    state.rerender();
  };

}

export default start_sse;