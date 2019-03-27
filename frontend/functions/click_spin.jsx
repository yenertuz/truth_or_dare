function click_spin() {
  state.is_spinning = 1;
  setTimeout(
    () => {
      state.is_spinning = 0;
      state.rerender();
    }, 1000
  );
  state.asker_user_name = "Aniqa";
  state.replier_user_name = "Yener";
  state.room_status = "waiting_for_choice";
  state.rerender();
}


export default click_spin;