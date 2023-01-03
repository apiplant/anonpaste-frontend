import type { RouteDataFunc } from "solid-app-router";
import { createResource, Resource } from "solid-js";
import * as Paste from "../lib/paste";

const PasteData: RouteDataFunc = (id): Resource<Paste.PasteDoc> => {
	const [data] = createResource(id, ({ params: { id } }) => Paste.view(id));
	return data;
};

export default PasteData;
