function create_user() {
	fetch("http://35.247.5.11/users/create.php").then(
		(response) => {
			return (response.text());
		}.then(
			(text) => {
				state.user = text;
				console.log(state.user);
			}
		)
	);
}

export default create_user;