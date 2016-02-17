App.Components.UserForm = React.createClass({
	getInitialState: App.Stores.UserStore.getState,

	componentDidMount: function() {
		this.unsubscribe = App.Stores.UserStore.subscribe(function() {
			this.setState(App.Stores.UserStore.getState());
		}.bind(this));
	},

	componentWillUnmount: function() {
		this.unsubscribe();
	},

	onInput: function(e) {
		App.Stores.UserStore.dispatch({
			type: "UPDATE",
			user: {
				firstname: this.refs.firstname.value,
				lastname: this.refs.lastname.value,
			},
		});
	},

	submitted: function(e) {
		e.preventDefault();
		console.log(App.Stores.UserStore.getState());
	},

	render: function() {
		return (
			el("form", {
			action: "handler",
			onSubmit: this.submitted},
				el("input", {
				value: this.state.firstname,
				type: "text",
				ref: "firstname",
				name: "firstname",
				onChange: this.onInput}),

				el("input", {
				value: this.state.lastname,
				type: "text",
				ref: "lastname",
				name: "lastname",
				onChange: this.onInput}),

				el("button", null, "Submit")
			)
		);
	},
});
