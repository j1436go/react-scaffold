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
	Config: {},
};
