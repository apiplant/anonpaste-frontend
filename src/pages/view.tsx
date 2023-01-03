import { createEffect, createSignal, onCleanup, Suspense } from "solid-js";
import { useRouteData } from "solid-app-router";
import { decrypt } from "../lib/crypto";
import Preview from "../components/Preview";
import Logo from "../components/Logo";
import {
	locale,
	INCORRECT,
	SUBMIT,
	PASSWORD_REQUIRED,
	PASTE_NOT_FOUND,
	tr,
} from "../translation";
import { DEFAULT_LANGUAGE } from "../config";
import { PasteDoc } from "../lib/paste";
import InputPassword from "../components/InputPassword";
import InputSubmit from "../components/InputSubmit";

let errorMessageFadingHandler;

const codeWrap = (message) => `
\`\`\`
${message}
\`\`\`
`;

export default function View() {
	const [content, setContent] = createSignal("");
	const [language, setLanguage] = createSignal(DEFAULT_LANGUAGE);
	const [password, setPassword] = createSignal(null);
	const [passwordErrorMessage, setPasswordErrorMessage] = createSignal(false);
	const [isRaw, setIsRaw] = createSignal(true);
	const paste = useRouteData<() => () => PasteDoc>();

	createEffect(async () => {
		if (!paste()?.content) return;
		const key = location.hash.slice(1);
		setIsRaw(location.hash.indexOf("|") === -1);
		if (isRaw()) {
			const result = await decrypt(paste()?.content, key);
			const [language, ...content] = result.split(":");
			setContent(content.join(":"));
			setLanguage(language);
		}
	});

	const onSubmitPassword = async (event) => {
		event.preventDefault();
		try {
			if (passwordErrorMessage()) {
				return;
			}
			const key = location.hash.slice(1);
			const result = await decrypt(paste().content, key, password());
			const [language, ...content] = result.split(":");
			setContent(content.join(":"));
			setLanguage(language);
		} catch (err) {
			console.error(err);
			if (errorMessageFadingHandler) {
				clearTimeout(errorMessageFadingHandler);
			}
			setPasswordErrorMessage(true);
			errorMessageFadingHandler = setTimeout(
				() => setPasswordErrorMessage(false),
				2000,
			);
		}
	};

	return (
		<>
			<nav class="<lg:flex-wrap relative flex p-4 px-6">
				<div class="bg-dark-800 absolute top-0 left-0 h-full w-full opacity-80" />
				<Logo />
				<div class="flex flex-1" />

				{!(isRaw() || content()) && (
					<div class="relative my-4 ml-4 flex items-center text-blue-300">
						<form onSubmit={onSubmitPassword}>
							<InputPassword value={password()} onChange={setPassword} />
							<InputSubmit
								condition={passwordErrorMessage()}
								colors={["red", "blue"]}
								labels={[tr(locale(), INCORRECT), tr(locale(), SUBMIT)]}
							/>
						</form>
					</div>
				)}
			</nav>
			<section class="relative flex-grow">
				{isRaw() || content() ? (
					<Suspense fallback={<span>...</span>}>
						<Preview
							fullHeight
							value={
								paste() && !content()
									? codeWrap(tr(locale(), PASTE_NOT_FOUND))
									: content()
							}
							language={language()}
							label={(_language) => ""}
						/>
					</Suspense>
				) : (
					<Preview
						fullHeight
						value={codeWrap(tr(locale(), PASSWORD_REQUIRED))}
						language={language()}
						label={(_language) => ""}
					/>
				)}
			</section>
		</>
	);
}
