import { createSignal, Signal } from "solid-js";

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
const signalMap: { [key: string]: Signal<any> } = {};

export function createStoredSignal<T>(
	key: string,
	defaultValue: T,
	storage = window.localStorage,
): Signal<T> {
	const initialValue = storage.getItem(key)
		? (JSON.parse(storage.getItem(key) || "null") as T)
		: defaultValue;

	if (!signalMap[key]) {
		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		signalMap[key] = createSignal<T>(initialValue) as Signal<any>;
	}
	const [value, setValue] = signalMap[key];

	const setValueAndStore = ((arg) => {
		const v = setValue(arg);
		storage.setItem(key, JSON.stringify(v));
		return v;
	}) as typeof setValue;

	return [value, setValueAndStore] as Signal<T>;
}
