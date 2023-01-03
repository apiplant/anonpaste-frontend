import { BACKEND_ORIGIN } from "../config";
import { fromB64 } from "./crypto";

export const create = (body) =>
	fetch(`${BACKEND_ORIGIN}/api/report`, {
		method: "post",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});
