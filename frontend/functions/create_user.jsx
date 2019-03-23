function create_user() {
	fetch("http://35.247.5.111/users/create.php").then(
		(response) => {
			return (response.text());
		}).then(
			(text) => {
				state.user = text;
			}
		);
}

export default create_user;