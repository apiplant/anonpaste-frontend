import type { Component } from "solid-js";
import { Link, useRoutes, useLocation } from "solid-app-router";

import { routes } from "./routes";

const App: Component = (props) => {
	const location = useLocation();
	const Route = useRoutes(routes);

	return <Route />;
};

export default App;
