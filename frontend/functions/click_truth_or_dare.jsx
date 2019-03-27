function click_truth_or_dare(choice) {
  if (choice == "truth") {
    state.room_description = "Yener picked TRUTH";
  } else {
    state.room_description = "Yener picked DARE";
  }
  state.room_status = "waiting_for_spin";
  state.asker_user_name = "Yener";
  state.replier_user_name = "Aniqa";
  state.rerender();
}

export default click_truth_or_dare;