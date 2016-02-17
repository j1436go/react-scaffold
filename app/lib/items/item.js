App.Components.Item = React.createClass({
	render: function() {
		return el(
			"h2", null, "Item #", this.props.ctx.params.id
		);
	},
});
