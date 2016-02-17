App.Components.UserDisplay = React.createClass({
	getInitialState: function() {
		return App.Stores.UserStore.getState();
	},

	componentDidMount: function() {
		this.unsubscribe = App.Stores.UserStore.subscribe(function() {
			this.setState(App.Stores.UserStore.getState())
		}.bind(this));
	},

	componentWillUnmount: function() {
		this.unsubscribe();
	},

	render: function() {
		return el(
			"table", null,
				el("thead", null,
					el("tr", null,
						el("td", null, "First name"),
						el("td", null, "Last name")
					  )
				),
				el("tbody", null,
					el("tr", null,
						el("td", null,this.state.firstname),
						el("td", null, this.state.lastname)
					  )
				)
			);
	},
});
