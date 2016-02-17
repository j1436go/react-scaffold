App.Components.ItemsIndex = React.createClass({
	getInitialState: function() {
		return {user: App.Stores.UserStore.getState()};
	},

	componentDidMount: function() {
		this.unsubscribe = App.Stores.UserStore.subscribe(function() {
			this.setState({user: UserStore.getState()});
		}.bind(this));
	},

	componentWillUnmount: function() {
		this.unsubscribe();
	},

	render: function() {
		return el(
			"h2", null, "Item index for user ", this.state.user.firstname, " ", this.state.user.lastname
		);
	}
});
