import { lazy } from "solid-js";
import type { RouteDefinition } from "solid-app-router";

import Create from "./pages/create";
import Report from "./pages/report";
import ViewData from "./pages/view.data";

export const routes: RouteDefinition[] = [
	{
		path: "/",
		component: Create,
	},
	{
		path: "/v/:id",
		component: lazy(() => import("./pages/view")),
		data: ViewData,
	},
	{
		path: "/report",
		component: Report,
	},
	{
		path: "**",
		component: lazy(() => import("./errors/404")),
	},
];
