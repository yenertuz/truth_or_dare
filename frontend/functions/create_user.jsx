function create_user() {
	fetch(state.url + "/users/create.php").then(
		(response) => {
			return (response.text());
		}).then(
			(text) => {
				state.user = text;
			}
		);
}

export default create_user;