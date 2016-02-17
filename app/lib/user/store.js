App.Stores.UserStore = Redux.createStore(function(state, action) {
	switch (action.type) {
	case "UPDATE_USER":
		// State should be cloned, updated and
		// returned instead of mutated.
		return _.assign({}, state, action.user);
	}

	return state ? state : {};
});
