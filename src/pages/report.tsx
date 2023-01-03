import { createSignal } from "solid-js";
import * as Paste from "../lib/paste";
import Logo from "../components/Logo";
import Spinner from "../components/Spinner";
import {
	locale,
	ERROR_EMAIL,
	ERROR_INSERT_MIN_ONE_LINK,
	ERROR_INVALID_LINK,
	ERROR_SHORT_NOTIFICATION,
	EXAMPLE,
	PLEASE_EMAIL,
	PLEASE_INSERT_LINKS,
	PLEASE_OFFICIAL_NOTIFICATION,
	REPORT_COPYRIGHT,
	REQUEST_FAILED,
	REQUEST_SUBMITTED,
	STATUS_FAILED,
	STATUS_SUBMITTING,
	STATUS_SUCCESS,
	SUBMIT,
	EMAIL,
	tr,
} from "../translation";
import InputSubmit from "../components/InputSubmit";

export default function View() {
	const [linksValue, setLinksValue] = createSignal("");
	const [emailValue, setEmailValue] = createSignal("");
	const [linksError, setLinksError] = createSignal("");
	const [messageValue, setMessageValue] = createSignal("");
	const [savingStatus, setSavingStatus] = createSignal("");

	const onSubmit = async (event) => {
		event.preventDefault();
		const links = linksValue()
			.split("\n")
			.filter(String)
			.map((link) => link.trim());
		if (links.length === 0) {
			setLinksError(tr(locale(), ERROR_INSERT_MIN_ONE_LINK));
			return;
		}
		const linksError = links
			.map((link) => {
				if (
					!link.match(
						new RegExp(`^${window.location.origin}/v/([^\/#]+)\/?#(.*)$`),
					)
				) {
					return tr(locale(), ERROR_INVALID_LINK)(link);
				}
			})
			.filter(Boolean);
		if (linksError.length) {
			setLinksError(linksError.join("\n"));
			return;
		}
		const message = messageValue();
		if (message.length < 100) {
			setLinksError(tr(locale(), ERROR_SHORT_NOTIFICATION)(100));
			return;
		}

		const email = emailValue();
		if (!email.match(/@/)) {
			setLinksError(tr(locale(), ERROR_EMAIL));
			return;
		}

		setLinksError("");
		setSavingStatus(STATUS_SUBMITTING);
		try {
			const res = await Paste.report({
				links,
				email,
				message,
			});
			setSavingStatus(res.ok ? STATUS_SUCCESS : STATUS_FAILED);
		} catch (err: any) {
			setSavingStatus(STATUS_FAILED);
		}
	};

	return (
		<>
			<nav class="<lg:flex-wrap relative flex p-4 px-6">
				<div class="bg-dark-800 absolute top-0 left-0 h-full w-full opacity-80" />
				<Logo />
			</nav>
			<section class="relative flex flex-grow justify-center ">
				<div class="lg:max-w-1/2 max-w-10/12 lg:min-w-128 my-8">
					<div class="bg-dark-800 left-0 w-full rounded-lg rounded-b-none p-4 opacity-90">
						<span class="text-light-100">{tr(locale(), REPORT_COPYRIGHT)}</span>
					</div>
					<div class="relative flex flex-col">
						<section class="bg-dark-300 text-light-100 w-full px-4 pt-4 opacity-80">
							{tr(locale(), PLEASE_INSERT_LINKS)}
						</section>
						<section class="bg-dark-300 text-light-100 w-full whitespace-pre-wrap break-all px-4 pt-2 pb-4 text-xs opacity-80">
							{tr(locale(), EXAMPLE)(`${window.location.origin}/v/ID#KEY`)}
						</section>
						<textarea
							class="bg-dark-400 min-h-96 text-light-100 caret-light-100 w-full resize-none p-4 opacity-80 outline-none outline-none"
							onInput={(event) =>
								setLinksValue((event.target as HTMLTextAreaElement).value)
							}
							value={linksValue()}
						/>
						<section class="bg-dark-300 text-light-100 w-full p-4 opacity-80 ">
							{tr(locale(), PLEASE_OFFICIAL_NOTIFICATION)}
						</section>
						<textarea
							class="bg-dark-400 min-h-96 text-light-100 caret-light-100 w-full resize-none p-4 opacity-80 outline-none outline-none "
							onInput={(event) =>
								setMessageValue((event.target as HTMLTextAreaElement).value)
							}
							value={messageValue()}
						/>
						<section class="bg-dark-300 text-light-100 w-full p-4 opacity-80 ">
							{tr(locale(), PLEASE_EMAIL)}
						</section>
						<section
							class={`bg-dark-300 text-light-100 w-full p-4 opacity-80 ${
								!linksError() ? "rounded-lg rounded-t-none" : ""
							}`}
						>
							<form
								onSubmit={onSubmit}
								class="flex items-center justify-between"
							>
								<span class="min-w-16 inline-block flex-grow">
									[
									<input
										type="text"
										value={emailValue()}
										placeholder={tr(locale(), EMAIL)}
										onInput={(event) =>
											setEmailValue((event.target as HTMLInputElement).value)
										}
										class="mx-1 w-9/12 bg-transparent outline-none"
									/>
									]
								</span>
								<InputSubmit
									condition={savingStatus() === STATUS_SUBMITTING}
									colors={["green", "blue"]}
									labels={[
										<Spinner class="inline-block w-8" />,
										tr(locale(), SUBMIT),
									]}
								/>
							</form>
						</section>
						<section
							class={`${
								!linksError() ? "hidden" : ""
							} text-dark-900 w-full rounded-lg rounded-t-none bg-red-400 p-4 opacity-80`}
						>
							<pre class="whitespace-pre-wrap break-all">{linksError()}</pre>
						</section>
						<section
							class={`${
								savingStatus() !== STATUS_FAILED ? "hidden" : ""
							} text-dark-900 w-full rounded-lg rounded-t-none bg-red-400 p-4 opacity-80`}
						>
							<pre class="whitespace-pre-wrap break-all">
								{tr(locale(), REQUEST_FAILED)}
							</pre>
						</section>
						<section
							class={`${
								savingStatus() !== STATUS_SUCCESS ? "hidden" : ""
							} text-dark-900 w-full rounded-lg rounded-t-none bg-green-400 p-4 opacity-80`}
						>
							<pre>{tr(locale(), REQUEST_SUBMITTED)}</pre>
						</section>
					</div>
				</div>
			</section>
		</>
	);
}
