// The namespace will be created first.
// All other .js files instead of main.js will be
// executed in any order.
// The main.js script will fire last.

// Global React factory function.
window.el = React.createElement;

// Namespaces
window.App = {
	Components: {},
	Stores: {},
	Actions: {},
	Config: {},
};
App.Components.Home = React.createClass({
	render: function() {
		return el("h2", null, "こんばんは。");
	},
});
App.Components.Item = React.createClass({
	render: function() {
		return el(
			"h2", null, "Item #", this.props.ctx.params.id
		);
	},
});
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

	render() {
		return el(
			"h2", null, "Item index for user ", this.state.user.firstname, " ", this.state.user.lastname
		);
	}
});
App.Components.Items = React.createClass({
	getInitialState: function() {
		return { items: [{name: "Foo"}, {name: "Bar"}] };
	},

	componentDidMount() {
		this.fetchData();
	},

	fetchData() {
		"https://example.com/api",
		// Cookies can be set and will be handled natively
		// by the browser. The Set-Cookie header is not readable.
		// See https://github.com/github/fetch
		window.fetch(
				{credentials: "same-origin"}
				//{credentials: "include"} // send cookies to any domain
			)
			.then(function(r) { return r.json(); })
			.then(function(fc) { return this.setState({forecast: fc}); })
			.catch(function(err) { console.log(err); });
	},

	tapped(item, i) {
		console.log(item);
		console.log(i);
	},

	render() {
		var items = this.state.items.map(function(item, i) {
			return el(
				"p", {
				key: i,
				onClick: function() { this.tapped(item, i);}},
					el("a", {href: "/items/"+i}, item.name)
			);
		});

		return el(
			"div", null,
				"<h2>Results</h2>",
				this.props.children,
				"resp" in this.state ? this.state.resp.name : null,
				items
		);
	}
});
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
App.Stores.UserStore = Redux.createStore(function(state, action) {
	switch (action.type) {
	case "UPDATE_USER":
		// State should be cloned, updated and
		// returned instead of mutated.
		return _.assign({}, state, action.user);
	}

	return state ? state : {};
});
App.Actions.User = {
	UPDATE: "UPDATE_USER",
};
App.Components.UserIndex = React.createClass({
	render: function() {
		return el(
			"div", null,
				el(App.Components.UserForm),
				el(App.Components.UserDisplay)
		);
	},
});
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

	render() {
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

	onInput(e) {
		App.Stores.UserStore.dispatch({
			type: App.Actions.User.UPDATE,
			user: {
				firstname: this.refs.firstname.value,
				lastname: this.refs.lastname.value,
			},
		});
	},

	submitted(e) {
		e.preventDefault();
		console.log(App.Stores.UserStore.getState());
	},

	render() {
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
// Executed after all other modules have been created.

ReactDOM.render(
	el(App.Components.App),
	document.getElementById("app")
);
