import $ from "jquery";

function click_truth_or_dare(choice) {
  let url = state.url + "/game/answer.php";
  let data = {
    room_name: state.room_name, 
    replier_user_name: state.user_name, 
    choice: choice
  };
  let success = () => {
    state.rerender();
  };
  state.room_status = "waiting_for_spin";
  state.room_desciption = choice;
  state.rerender();
  $.post({
    url: url,
    dataType: "json",
    data: data,
    success: success
  });
}

export default click_truth_or_dare;