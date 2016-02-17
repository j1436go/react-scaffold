App.Components.UserIndex = React.createClass({
	render: function() {
		return el(
			"div", null,
				el(App.Components.UserForm),
				el(App.Components.UserDisplay)
		);
	},
});
