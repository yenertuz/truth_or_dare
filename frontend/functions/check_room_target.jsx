function check_room_target() {
    let without_question_mark = location.search.substring(1);
    let key_values_together = without_question_mark.split("&");
    let get_object = {};
    key_values_together.forEach(
        (element) => {
            let key_value_split = element.split("=");
            let key = key_value_split[0];
            let value = key_value_split[1];
            get_object[key] = value;
        }
    );
    if ("room" in get_object) {
        return get_object.room;
    } else {
        return "";
    }
}

export default check_room_target;