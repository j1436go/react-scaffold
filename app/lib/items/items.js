App.Components.Items = React.createClass({
	getInitialState: function() {
		return { items: [{name: "Foo"}, {name: "Bar"}] };
	},

	componentDidMount: function() {
		this.fetchData();
	},

	fetchData: function() {
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

	tapped: function(item, i) {
		console.log(item);
		console.log(i);
	},

	render: function() {
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
