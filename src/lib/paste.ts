import { BACKEND_ORIGIN } from "../config";

export type PasteDoc = {
	premium: boolean;
	content: string;
	id: string;
	expiryTime: number | null;
	expiryViews: number | null;
};

export type ReportBody = {
	links: string[];
	email: string;
	message: string;
};

export const create = (body: PasteDoc) =>
	fetch(`${BACKEND_ORIGIN}/api/paste`, {
		method: "post",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

export const view = async (id): Promise<PasteDoc> => {
	const res = await fetch(`${BACKEND_ORIGIN}/api/paste/${id}`);
	return res.json();
};

export const report = (body) =>
	fetch(`${BACKEND_ORIGIN}/api/report`, {
		method: "post",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});
