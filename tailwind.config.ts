import { defineConfig } from "vite-plugin-windicss";

export default defineConfig({
	darkMode: false,
	safelist:
		"bg-blue-400 hover:bg-blue-300 bg-red-400 hover:bg-red-300 bg-green-400 hover:bg-green-300",
	theme: {
		extend: {},
	},
});
