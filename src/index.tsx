/* @refresh reload */
import "windi.css";

import { For, render } from "solid-js/web";
import { Router } from "solid-app-router";
import App from "./app";
import { routes } from "./routes";
import Link from "./components/Link";
import {
	locale as selectedLocale,
	setLocale,
	locales,
	BUILT_BY,
	DMCA_REPORT,
	tr,
} from "./translation";
import InputSelect from "./components/InputSelect";

render(() => {
	return (
		<Router>
			<div class="flex min-h-screen flex-col">
				<App />
				<footer class="text-light-100 relative flex justify-between p-2 py-4">
					<span class="<lg:flex-wrap flex">
						<InputSelect
							id="select-locale"
							width={16}
							onChange={setLocale}
							value={selectedLocale()}
							options={Object.keys(locales)}
							selected={selectedLocale()}
						/>
						<Link href={routes[2]?.path} class="px-4">
							{tr(selectedLocale(), DMCA_REPORT)}
						</Link>
					</span>
					<span class="px-4">
						AnonPaste © {new Date().getFullYear()},{" "}
						{tr(selectedLocale(), BUILT_BY)}{" "}
						<Link href="https://www.apiplant.com" target="_blank">
							API PLANT
						</Link>
					</span>
				</footer>
			</div>
		</Router>
	);
}, document.getElementById("root") as HTMLElement);
