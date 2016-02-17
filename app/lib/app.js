App.Components.App = React.createClass({
	getInitialState: function() {
		return {comp: "div", ctx: null};
	},

	// Routing
	//
	componentDidMount: function() {
		page("/", this.homeController);
		page("/user", this.userController);
		page("/items", this.itemsController);
		page("/items/:id", this.itemController);

		page({hashbang: true});
	},

	homeController: function(ctx) {
		this.setState({comp: App.Components.Home, ctx: ctx});
	},

	userController: function(ctx) {
		this.setState({comp: App.Components.UserIndex, ctx: ctx});
	},

	itemsController: function(ctx) {
		this.setState({comp: App.Components.ItemsIndex, ctx: ctx});
	},

	itemController: function(ctx) {
		this.setState({comp: App.Components.Item, ctx: ctx});
	},

	render: function() {
		return el(
			"main", null,
				el(App.Components.MainNav),
				el("div", {className: "content"},
					el(this.state.comp, {ctx: this.state.ctx})
				)
		);
	},
});
