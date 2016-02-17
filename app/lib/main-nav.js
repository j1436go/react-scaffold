App.Components.MainNav = React.createClass({
	getInitialState: function() {
		return {open: false, baseClass: "main"};
	},

	toggle: function() {
		this.setState({open: !this.state.open});
	},

	createItem: function(route, name) {
		return el("li", {onClick: this.toggle},
			el("a", {href: route}, name)
		);
	},

	render: function() {
		var className = this.state.open ?
			[this.state.baseClass, "open"].join(" ") :
			this.state.baseClass;

		return el(
			"nav", {className: className},
				el("ul", null,
					this.createItem("/", "Home"),
					this.createItem("/user", "User"),
					this.createItem("/items", "Items"),
					this.createItem("/items/42", "Item 42"),
					this.createItem("/items/fetch", "Fetch items")
				),

				el("div", {
				onClick: this.toggle,
				className: "icon icon-bars",
				id: "menu-toggle"}),

				el("div", {
				onClick: this.toggle,
				className: "closer"})
		);
	},
});
